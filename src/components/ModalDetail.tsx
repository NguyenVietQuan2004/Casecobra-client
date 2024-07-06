"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { calcMoney, formatDate, formatPrice } from "~/lib/utils";

function ModalDetail({ listDateBooked, userName }: { listDateBooked: Array<any>; userName: string }) {
  const money = listDateBooked.map((item) => {
    return calcMoney(item.hours);
  });
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <div>{formatPrice(money)}</div>
        </DialogTrigger>
        <DialogContent className="p-8 z-[99999] overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="font-normal">Chi tiết khách hàng {userName}</DialogTitle>
            <DialogDescription className=" !mt-6" asChild>
              <div>
                {listDateBooked.map((item) => {
                  return (
                    <div key={item.date}>
                      &bull; {formatDate(item.date)}
                      {item.hours.map((hour: any) => {
                        return (
                          <div key={hour} className="">
                            {hour === "1" ? "7h-10h" : hour === "2" ? "13h-17h" : "18h-22h"}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalDetail;
