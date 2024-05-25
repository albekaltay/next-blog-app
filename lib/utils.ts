import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTodayFromDate(givenDate: string) {
  const today = dayjs();
  const differenceInDays = today.diff(givenDate, "day");
  const todayDate = dayjs(givenDate).add(differenceInDays, "day");
  return todayDate.format("ll");
}
