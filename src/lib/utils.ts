import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};
export const hashRole = async (role: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newRole = await bcrypt.hash(role, salt);
    return newRole;
  } catch (error) {
    throw new Error("Băm role thất bại");
  }
};
export const formatReservedDate = (allList: Array<any>) => {
  const listReservedFullDay = allList.filter((item: any) => {
    return item.hours.length === 3;
  });
  const getDayofList = listReservedFullDay.map((item: any) => {
    return item.date;
  });
  return getDayofList.map((item) => {
    return {
      startDate: item,
      endDate: item,
    };
  });
};
export const getItemBookingNotFull = (allList: Array<any>) => {
  const newList = allList.map((item) => {
    const date = new Date(item.date);
    const isoString = date.toString();
    return { ...item, date: isoString };
  });
  return newList.filter((item: any) => {
    return item.hours.length < 3;
  });
};
