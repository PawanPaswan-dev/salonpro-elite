# PROJECT_GUIDE.md — Production Architecture Reference

This document describes how to evolve the SalonPro Elite demo (static,
seeded demo data in `data/demoData.ts`) into a production system backed by a
real database and authentication provider.

---

## 1. Database Schema (Prisma)

Add Prisma and a Postgres database (Neon, Supabase, Railway, or Vercel
Postgres all work well with Vercel deployments).

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

`prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  OWNER
  EMPLOYEE
  RECEPTION
  CUSTOMER
}

enum MembershipTier {
  SILVER
  GOLD
  PLATINUM
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  NO_SHOW
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  phone        String?
  passwordHash String
  role         Role
  createdAt    DateTime @default(now())

  customer     Customer?
  employee     Employee?
}

model Customer {
  id            String                   @id @default(cuid())
  user          User                     @relation(fields: [userId], references: [id])
  userId        String                   @unique
  tier          MembershipTier           @default(SILVER)
  loyaltyPoints Int                      @default(0)
  walletBalance Decimal                  @default(0)
  memberSince   DateTime                 @default(now())

  appointments  Appointment[]
  reviews       Review[]
  memberships   MembershipSubscription[]
}

model Employee {
  id            String   @id @default(cuid())
  user          User     @relation(fields: [userId], references: [id])
  userId        String   @unique
  role          String
  attendancePct Int      @default(100)
  monthlyTarget Decimal
  rating        Decimal  @default(5.0)

  appointments  Appointment[]
  tasks         Task[]
  commissions   Commission[]
}

model Service {
  id          String   @id @default(cuid())
  name        String
  category    String
  price       Decimal
  durationMin Int
  benefits    String[]
  popularity  Int      @default(0)

  appointments Appointment[]
}

model Appointment {
  id         String            @id @default(cuid())
  customer   Customer          @relation(fields: [customerId], references: [id])
  customerId String
  employee   Employee?         @relation(fields: [employeeId], references: [id])
  employeeId String?
  service    Service           @relation(fields: [serviceId], references: [id])
  serviceId  String
  date       DateTime
  time       String
  status     AppointmentStatus @default(PENDING)
  price      Decimal
  createdAt  DateTime          @default(now())
}

model MembershipPlan {
  id       String         @id @default(cuid())
  tier     MembershipTier @unique
  price    Decimal
  discount Int
  points   Int
  benefits String[]

  subscriptions MembershipSubscription[]
}

model MembershipSubscription {
  id         String         @id @default(cuid())
  customer   Customer       @relation(fields: [customerId], references: [id])
  customerId String
  plan       MembershipPlan @relation(fields: [planId], references: [id])
  planId     String
  startDate  DateTime       @default(now())
  endDate    DateTime
  active     Boolean        @default(true)
}

model InventoryItem {
  id        String   @id @default(cuid())
  name      String
  category  String
  stock     Int
  reorderAt Int
  unit      String
  unitPrice Decimal

  usageLogs InventoryUsage[]
  purchases PurchaseHistory[]
}

model InventoryUsage {
  id       String        @id @default(cuid())
  item     InventoryItem @relation(fields: [itemId], references: [id])
  itemId   String
  quantity Int
  date     DateTime      @default(now())
}

model PurchaseHistory {
  id       String        @id @default(cuid())
  item     InventoryItem @relation(fields: [itemId], references: [id])
  itemId   String
  quantity Int
  cost     Decimal
  date     DateTime      @default(now())
  supplier String?
}

model Task {
  id         String   @id @default(cuid())
  employee   Employee @relation(fields: [employeeId], references: [id])
  employeeId String
  title      String
  completed  Boolean  @default(false)
  date       DateTime @default(now())
}

model Commission {
  id         String   @id @default(cuid())
  employee   Employee @relation(fields: [employeeId], references: [id])
  employeeId String
  amount     Decimal
  month      Int
  year       Int
}

model Review {
  id          String   @id @default(cuid())
  customer    Customer @relation(fields: [customerId], references: [id])
  customerId  String
  serviceName String
  rating      Int
  text        String
  approved    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model RevenueSnapshot {
  id        String   @id @default(cuid())
  date      DateTime
  revenue   Decimal
  expenses  Decimal
  customers Int
}
```

Push the schema and generate the client:

```bash
npx prisma db push
npx prisma generate
```

---

## 2. Replacing Demo Data with Live Queries

`data/demoData.ts` currently exports static arrays (`CUSTOMERS`,
`EMPLOYEES`, `APPOINTMENTS`, etc.) with the exact shapes consumed by every
page component. To migrate to the database:

1. Create `lib/db.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

2. Convert dashboard pages from static imports to async server components,
   e.g. `app/owner/customers/page.tsx`:

```tsx
import { prisma } from "@/lib/db";
import CustomerTable from "@/components/owner/CustomerTable";

export default async function OwnerCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: { user: true },
    take: 100,
  });

  // map to the same shape CustomerTable already expects
  const mapped = customers.map((c) => ({
    id: c.id,
    name: c.user.name,
    phone: c.user.phone ?? "",
    tier: c.tier,
    visits: 0, // compute via aggregate query
    totalSpent: Number(c.walletBalance),
    loyaltyPoints: c.loyaltyPoints,
    lastVisit: "",
    memberSince: c.memberSince.toISOString(),
  }));

  return <CustomerTable customers={mapped} />;
}
```

3. Update `CustomerTable` (and similar components) to accept data via props
   instead of importing directly from `demoData.ts`. This keeps the UI
   layer unchanged while swapping the data source.

---

## 3. Authentication (NextAuth)

```bash
npm install next-auth @auth/prisma-adapter
```

`app/api/auth/[...nextauth]/route.ts`:

```ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) return null;
        const valid = await bcrypt.compare(credentials!.password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
```

Replace `components/nav/LoginModal.tsx`'s client-side credential check with
a call to `signIn("credentials", { email, password, redirect: false })`,
then redirect based on `session.user.role`.

Protect dashboard routes with middleware (`middleware.ts`):

```ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: ["/owner/:path*", "/employee/:path*", "/reception/:path*", "/customer/:path*"],
};
```

---

## 4. QR Membership Card System

The demo's `components/customer/QRCodeBlock.tsx` already generates a QR
code client-side via the `qrcode` package, encoding a string like
`SALONPROELITE-MEMBER-SP-1007`.

For production:

1. **Encode a signed token** instead of a plain ID, e.g. a short-lived JWT
   containing `{ customerId, tier, iat, exp }`, signed with a server secret.
2. **Reception scanning**: use `html5-qrcode` (`npm install html5-qrcode`)
   in the Reception dashboard to scan a customer's QR via webcam/phone
   camera, verify the JWT server-side via an API route
   (`app/api/checkin/route.ts`), and display the customer's profile +
   loyalty balance for instant check-in.
3. **Rotation**: regenerate the QR token periodically (e.g. daily) by
   refetching from `/api/membership/qr` so static screenshots can't be
   reused indefinitely.

---

## 5. Seeding Demo Data into the Database

Create `prisma/seed.ts` that imports the generation logic from
`data/demoData.ts` (the seeded-random generators for customers, employees,
appointments, reviews, and inventory) and writes the results via
`prisma.customer.createMany()`, `prisma.appointment.createMany()`, etc.
Register it in `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Then run:

```bash
npx prisma db seed
```

---

## 6. Environment Variables (Production)

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres connection string |
| `NEXTAUTH_SECRET` | Random secret for JWT signing |
| `NEXTAUTH_URL` | Production URL (e.g. `https://app.salonproelite.in`) |
| `NEXT_PUBLIC_APP_NAME` | Display name used in metadata |
| `NEXT_PUBLIC_APP_URL` | Public base URL |

Set these under **Vercel → Project Settings → Environment Variables** for
each environment (Development, Preview, Production).
