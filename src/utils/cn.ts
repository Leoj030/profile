import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export default function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs))
}
