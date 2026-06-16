import {
  Scissors, Sparkles, Crown, Star, Heart, Flame, Gem, Zap,
  Award, type LucideIcon,
} from "lucide-react";

/* ============================================================
   SEEDED RANDOM (deterministic demo data)
============================================================ */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const rnd = seededRandom(42);
export const pick = <T,>(arr: T[]): T => arr[Math.floor(rnd() * arr.length)];
export const randInt = (min: number, max: number) =>
  Math.floor(rnd() * (max - min + 1)) + min;

const FIRST_NAMES = [
  "Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Krishna","Ishaan","Rohan",
  "Ananya","Diya","Aadhya","Saanvi","Myra","Priya","Riya","Kavya","Ishita","Meera",
  "Karan","Rahul","Amit","Vikram","Sanjay","Neha","Pooja","Anjali","Shreya","Tanya",
  "Rohit","Nikhil","Manish","Suresh","Deepak","Ritu","Sneha","Pallavi","Nisha","Kiran",
  "Arnav","Devansh","Yash","Aryan","Kabir","Zoya","Aisha","Fatima","Sara","Maya",
];
const LAST_NAMES = [
  "Sharma","Verma","Gupta","Kumar","Singh","Patel","Reddy","Nair","Iyer","Mehta",
  "Joshi","Chopra","Malhotra","Kapoor","Bose","Banerjee","Mukherjee","Das","Ghosh","Roy",
  "Agarwal","Bansal","Saxena","Tiwari","Rathi","Shah","Desai","Pillai","Menon","Rao",
];

/* ============================================================
   SERVICES
============================================================ */

export interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
  icon: string;
  benefits: string[];
  popularity: number;
}

export const SERVICES: Service[] = [
  { id: 1, name: "Signature Haircut", category: "Hair", price: 899, duration: 45, icon: "Scissors", benefits: ["Precision styling by senior stylist", "Includes wash & blow-dry", "Personalized consultation"], popularity: 92 },
  { id: 2, name: "Luxury Hair Spa", category: "Hair", price: 1599, duration: 75, icon: "Sparkles", benefits: ["Deep nourishing treatment", "Scalp massage therapy", "Repairs damaged hair"], popularity: 81 },
  { id: 3, name: "Global Hair Coloring", category: "Hair", price: 3499, duration: 120, icon: "Gem", benefits: ["Premium ammonia-free color", "Long-lasting shine", "Customized shade matching"], popularity: 76 },
  { id: 4, name: "Rejuvenating Facial", category: "Skin", price: 2199, duration: 60, icon: "Heart", benefits: ["Deep cleansing & exfoliation", "Anti-aging formulation", "Instant glow boost"], popularity: 88 },
  { id: 5, name: "Beard Styling & Sculpt", category: "Grooming", price: 499, duration: 30, icon: "Flame", benefits: ["Sharp, defined contours", "Hot towel finish", "Beard oil application"], popularity: 70 },
  { id: 6, name: "Nail Care & Art", category: "Nails", price: 999, duration: 50, icon: "Star", benefits: ["Manicure & pedicure", "Gel polish options", "Custom nail art"], popularity: 65 },
  { id: 7, name: "Bridal Makeup Package", category: "Bridal", price: 24999, duration: 180, icon: "Crown", benefits: ["HD airbrush makeup", "Trial session included", "Dedicated bridal artist"], popularity: 95 },
  { id: 8, name: "Keratin Smoothing Treatment", category: "Hair", price: 5999, duration: 150, icon:" Zap", benefits: ["Frizz-free for up to 4 months", "Adds natural shine", "Strengthens hair fiber"], popularity: 84 },
];

/* ============================================================
   MEMBERSHIP PLANS
============================================================ */

export interface MembershipPlan {
  name: string;
  price: number;
  color: string;
  icon: LucideIcon;
  benefits: string[];
  discount: string;
  points: number;
  featured?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    name: "Silver", price: 4999, color: "#C0C0C0", icon: Award,
    benefits: ["10% off all services", "1 free haircut/month", "Priority booking", "500 welcome reward points"],
    discount: "10%", points: 500,
  },
  {
    name: "Gold", price: 9999, color: "#D4AF37", icon: Crown,
    benefits: ["20% off all services", "2 free treatments/month", "Free birthday spa session", "1,200 welcome reward points", "Dedicated stylist"],
    discount: "20%", points: 1200, featured: true,
  },
  {
    name: "Platinum", price: 19999, color: "#E5C158", icon: Gem,
    benefits: ["30% off all services", "Unlimited grooming sessions", "Quarterly bridal/event styling credit", "3,000 welcome reward points", "Dedicated concierge & VIP lounge access"],
    discount: "30%", points: 3000,
  },
];

/* ============================================================
   EMPLOYEES (20)
============================================================ */

export interface Employee {
  id: number;
  name: string;
  role: string;
  attendance: number;
  target: number;
  achieved: number;
  commission: number;
  rating: string;
  customers: number;
  tasksToday: number;
  tasksDone: number;
}

const ROLES = ["Senior Stylist","Hair Colorist","Makeup Artist","Spa Therapist","Nail Technician","Beard Specialist","Junior Stylist","Receptionist"];

export const EMPLOYEES: Employee[] = Array.from({ length: 20 }, (_, i) => {
  const role = i < 6 ? "Senior Stylist" : pick(ROLES);
  const target = randInt(70000, 150000);
  const achieved = Math.round(target * (0.6 + rnd() * 0.5));
  const tasksToday = randInt(3, 9);
  return {
    id: i + 1,
    name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    role,
    attendance: randInt(88, 100),
    target,
    achieved,
    commission: Math.round(achieved * 0.08),
    rating: (4 + rnd()).toFixed(1),
    customers: randInt(15, 60),
    tasksToday,
    tasksDone: Math.min(tasksToday, randInt(1, tasksToday)),
  };
});

/* ============================================================
   CUSTOMERS (100)
============================================================ */

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  tier: "Silver" | "Gold" | "Platinum";
  visits: number;
  totalSpent: number;
  loyaltyPoints: number;
  lastVisit: string;
  memberSince: string;
}

export const CUSTOMERS: Customer[] = Array.from({ length: 100 }, (_, i) => {
  const tierRoll = rnd();
  const tier: Customer["tier"] = tierRoll < 0.5 ? "Silver" : tierRoll < 0.85 ? "Gold" : "Platinum";
  const visits = randInt(1, 48);
  return {
    id: 1000 + i,
    name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    phone: `+91 ${randInt(70000, 99999)}${randInt(10000, 99999)}`,
    email: `customer${i + 1}@mail.com`,
    tier,
    visits,
    totalSpent: visits * randInt(800, 4500),
    loyaltyPoints: randInt(50, 5200),
    lastVisit: `2026-${String(randInt(1, 6)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`,
    memberSince: `202${randInt(1, 5)}-${String(randInt(1, 12)).padStart(2, "0")}-01`,
  };
});

/* ============================================================
   APPOINTMENTS (500)
============================================================ */

export interface Appointment {
  id: number;
  customer: string;
  customerId: number;
  service: string;
  price: number;
  employee: string;
  date: string;
  time: string;
  status: "Completed" | "Cancelled" | "No-show";
  month: number;
}

const STATUS_POOL: Appointment["status"][] = ["Completed","Completed","Completed","Completed","Completed","Cancelled","No-show"];

export const APPOINTMENTS: Appointment[] = Array.from({ length: 500 }, (_, i) => {
  const cust = pick(CUSTOMERS);
  const svc = pick(SERVICES);
  const emp = pick(EMPLOYEES.slice(0, 14));
  const month = randInt(1, 6);
  const day = randInt(1, 28);
  return {
    id: 5000 + i,
    customer: cust.name,
    customerId: cust.id,
    service: svc.name,
    price: svc.price,
    employee: emp.name,
    date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    time: `${randInt(9, 19)}:${pick(["00","15","30","45"])}`,
    status: pick(STATUS_POOL),
    month,
  };
});

/* ============================================================
   INVENTORY
============================================================ */

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  reorder: number;
  used: number;
  unit: string;
  price: number;
}

export const INVENTORY: InventoryItem[] = [
  { id: 1, name: "Premium Shampoo (1L)", category: "Hair Care", stock: 42, reorder: 15, used: 8, unit: "bottles", price: 850 },
  { id: 2, name: "Keratin Treatment Kit", category: "Treatments", stock: 6, reorder: 10, used: 3, unit: "kits", price: 4200 },
  { id: 3, name: "Hair Color - Ammonia Free (Assorted)", category: "Coloring", stock: 28, reorder: 20, used: 12, unit: "tubes", price: 620 },
  { id: 4, name: "Facial Cream - Anti Aging", category: "Skin Care", stock: 3, reorder: 12, used: 4, unit: "jars", price: 1450 },
  { id: 5, name: "Nail Polish Set (Gel)", category: "Nails", stock: 55, reorder: 20, used: 6, unit: "sets", price: 380 },
  { id: 6, name: "Beard Oil - Premium", category: "Grooming", stock: 0, reorder: 10, used: 5, unit: "bottles", price: 540 },
  { id: 7, name: "Hair Spa Mask", category: "Treatments", stock: 19, reorder: 15, used: 7, unit: "jars", price: 990 },
  { id: 8, name: "Disposable Towels (Pack of 50)", category: "Consumables", stock: 8, reorder: 10, used: 2, unit: "packs", price: 650 },
  { id: 9, name: "Bridal Makeup Kit - HD", category: "Makeup", stock: 4, reorder: 5, used: 1, unit: "kits", price: 8500 },
  { id: 10, name: "Hair Serum - Argan Oil", category: "Hair Care", stock: 33, reorder: 15, used: 5, unit: "bottles", price: 720 },
];

/* ============================================================
   REVIEWS (100)
============================================================ */

export interface Review {
  id: number;
  name: string;
  rating: number;
  service: string;
  text: string;
  date: string;
}

const REVIEW_TEMPLATES = [
  "Absolutely loved my experience here! {emp} did an amazing job with my {svc}. The ambience is so luxurious and relaxing.",
  "Best salon in the city, hands down. The {svc} exceeded my expectations. Will definitely be coming back!",
  "{emp} is incredibly talented. My {svc} turned out exactly how I imagined. Highly recommend SalonPro Elite!",
  "The staff here is so professional and welcoming. The {svc} was worth every rupee. Five stars!",
  "I've been a member for over a year now and the quality never disappoints. {emp} always takes great care.",
  "Premium experience from start to finish. The {svc} was relaxing and the results are stunning.",
  "Booked the {svc} for a special occasion and it was perfect. {emp} truly understands what clients want.",
  "Clean, elegant, and professional. The {svc} service was top notch. Already booked my next appointment!",
  "My go-to salon for everything. The loyalty program is a great bonus too. {emp} is fantastic.",
  "Could not be happier with the {svc}. The attention to detail here is unmatched. Thank you SalonPro Elite!",
];

export const REVIEWS: Review[] = Array.from({ length: 100 }, (_, i) => {
  const cust = pick(CUSTOMERS);
  const svc = pick(SERVICES);
  const emp = pick(EMPLOYEES);
  const rating = pick([5,5,5,5,4,4,5,5,4,5]);
  const text = pick(REVIEW_TEMPLATES)
    .replace("{emp}", emp.name.split(" ")[0])
    .replace(/{svc}/g, svc.name);
  return {
    id: i + 1,
    name: cust.name,
    rating,
    service: svc.name,
    text,
    date: `2026-${String(randInt(1, 6)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`,
  };
});

export const AVG_RATING = (
  REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length
).toFixed(1);

/* ============================================================
   REVENUE / ANALYTICS DATA
============================================================ */

export const REVENUE_MONTHLY = [
  { month: "Jan", revenue: 1842000, expenses: 1120000, customers: 312 },
  { month: "Feb", revenue: 1965000, expenses: 1148000, customers: 334 },
  { month: "Mar", revenue: 2134000, expenses: 1205000, customers: 358 },
  { month: "Apr", revenue: 2298000, expenses: 1260000, customers: 379 },
  { month: "May", revenue: 2456000, expenses: 1310000, customers: 401 },
  { month: "Jun", revenue: 2612000, expenses: 1342000, customers: 428 },
];

export const REVENUE_DAILY = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  revenue: 65000 + Math.round(rnd() * 35000),
}));

export const REVENUE_WEEKLY = [
  { week: "Week 1", revenue: 512000 },
  { week: "Week 2", revenue: 548000 },
  { week: "Week 3", revenue: 601000 },
  { week: "Week 4", revenue: 632000 },
];

export const SERVICE_POPULARITY = SERVICES
  .map((s) => ({ name: s.name.split(" ")[0] + " " + (s.name.split(" ")[1] || ""), value: s.popularity }))
  .sort((a, b) => b.value - a.value);

export const STAFF_PERFORMANCE = EMPLOYEES.slice(0, 8).map((e) => ({
  name: e.name.split(" ")[0],
  revenue: e.achieved,
  rating: parseFloat(e.rating),
}));

export const RETENTION = [
  { month: "Jan", retention: 78 },
  { month: "Feb", retention: 80 },
  { month: "Mar", retention: 82 },
  { month: "Apr", retention: 85 },
  { month: "May", retention: 87 },
  { month: "Jun", retention: 89 },
];

export const TOTAL_REVENUE = REVENUE_MONTHLY.reduce((a, m) => a + m.revenue, 0);
export const TOTAL_EXPENSES = REVENUE_MONTHLY.reduce((a, m) => a + m.expenses, 0);
export const TOTAL_PROFIT = TOTAL_REVENUE - TOTAL_EXPENSES;
export const ACTIVE_CUSTOMERS = CUSTOMERS.filter(
  (c) => new Date(c.lastVisit) > new Date("2026-04-01")
).length;

export const MEMBERSHIP_SALES = {
  Silver: CUSTOMERS.filter((c) => c.tier === "Silver").length,
  Gold: CUSTOMERS.filter((c) => c.tier === "Gold").length,
  Platinum: CUSTOMERS.filter((c) => c.tier === "Platinum").length,
};

export const PIE_COLORS = ["#D4AF37", "#B8941F", "#8C6D0F", "#5C480A", "#3A2E06"];

/* ============================================================
   GALLERY
============================================================ */

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  "https://images.unsplash.com/photo-1519415510236-718bdfcd89c1?w=600&q=80",
  "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=600&q=80",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
];

/* ============================================================
   CURRENT SESSION DEMO ENTITIES
============================================================ */

export const CURRENT_EMPLOYEE = EMPLOYEES[2];
export const CURRENT_CUSTOMER = CUSTOMERS[7];

/* ============================================================
   DEMO LOGIN CREDENTIALS
============================================================ */

export interface DemoCredential {
  role: "owner" | "employee" | "reception" | "customer";
  label: string;
  email: string;
  pass: string;
}

export const DEMO_CREDENTIALS: DemoCredential[] = [
  { role: "owner", label: "Owner / Admin", email: "owner@salonproelite.in", pass: "admin123" },
  { role: "employee", label: "Employee / Staff", email: "staff@salonproelite.in", pass: "staff123" },
  { role: "reception", label: "Reception", email: "reception@salonproelite.in", pass: "reception123" },
  { role: "customer", label: "Customer Portal", email: "customer@salonproelite.in", pass: "customer123" },
];
