"use client";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
const OrderStatus = ["Đã nhận phòng", "Chưa nhận phòng"];
const StatusDropdown = ({ id, orderStatus }: { id: string; orderStatus: string }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-52 flex justify-between items-center">
          {["Đã nhận phòng"]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {OrderStatus.map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn("flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100", {
              "bg-zinc-100": orderStatus === status,
            })}
          >
            <Check
              className={cn("mr-2 h-4 w-4 text-green-400", status === "Đã nhận phòng" ? "opacity-100" : "opacity-0")}
            />
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
