import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * This utility function allows you to conditionally join classNames together
 * and properly handles Tailwind's utility class merging
 * 
 * @param inputs Class values that need to be combined
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Delays execution for a specified amount of time
 * 
 * @param ms Number of milliseconds to delay
 * @returns A promise that resolves after the specified delay
 */
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Generate a random number between min and max (inclusive)
 * 
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random number in range [min, max]
 */
export function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Truncates a string to a maximum length with an ellipsis
 * 
 * @param str String to truncate
 * @param n Maximum length
 * @returns Truncated string
 */
export function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}