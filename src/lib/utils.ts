import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Auto import by shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
