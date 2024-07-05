import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { formatInTimeZone } from "date-fns-tz";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatPrice = (prices: Array<number>) => {
  let sum = 0;
  for (let i = 0; i < prices.length; i++) {
    sum += prices[i];
  }
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(sum);
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

export const formatReservedDate2 = (allList: Array<any>) => {
  const listReservedFullDay = allList.filter((item: any) => {
    return item.hours.length >= 1;
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
  return allList.map((item) => {
    const date = new Date(item.date);
    const isoString = date.toString();
    return { ...item, date: isoString };
  });
  // return newList.filter((item: any) => {
  //   return item.hours.length < 3;
  // });
};

export const formatDate = (isoString: any) => {
  // Chuyển đổi thời gian UTC sang múi giờ Việt Nam
  const timeZone = "Asia/Ho_Chi_Minh";
  const a = formatInTimeZone(isoString, timeZone, "yyyy-MM-dd"); // 2014-10-25 06:46:20 EST
  return a;
};

export const calcMoney = (hours: any) => {
  let money = 0;
  for (let i = 0; i < hours.length; i++) {
    if (hours[i] === "1") {
      money += 1000000;
    }
    if (hours[i] === "2") {
      money += 2000000;
    }
    if (hours[i] === "3") {
      money += 3000000;
    }
  }
  return money;
};
