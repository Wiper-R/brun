import { clsx, type ClassValue } from "clsx";
import { isToday, isYesterday, format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toAbbr(text: string) {
  return text
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}`)
    .slice(0, 3);
}

export function formatTime(date: Date) {
  if (isToday(date)) {
    return `Today at ${format(date, "h:mm a")}`;
  } else if (isYesterday(date)) {
    return `Today at ${format(date, "h:mm a")}`;
  } else {
    return format(date, "d, MMMM, yyyy h:mm a");
  }
}
