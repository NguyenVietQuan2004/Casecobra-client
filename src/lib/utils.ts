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
export const formatReservedDate = (listReserved: Array<any>) => {
  return listReserved.map((item) => {
    return {
      startDate: item.reserved,
      endDate: item.reserved,
    };
  });
};
