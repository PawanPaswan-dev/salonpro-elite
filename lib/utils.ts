import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function fmtINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}
