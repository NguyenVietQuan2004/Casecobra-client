import { useState } from "react";
import { bookingApi } from "~/apiRequest/BookingApi";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
function ModalDeleteConfirm({ handleDeleteListBook, email }: { handleDeleteListBook: any; email: string }) {
  const [isShowModal, setIsShowModal] = useState(false);
  console.log(email);
  return (
    <div className="">
      <Dialog open={isShowModal}>
        <DialogTrigger asChild>
          <div>
            <Button
              className={buttonVariants({
                variant: "destructive",
                size: "sm",
                className: "mr-2",
              })}
              onClick={() => setIsShowModal(true)}
            >
              Hủy
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="p-8 z-[120]" showIcon={false}>
          <DialogHeader>
            <DialogTitle className="font-normal">Bạn có chắc chắn hủy đơn hàng</DialogTitle>
            <DialogDescription className=" !mt-6" asChild>
              <div className="flex justify-end">
                <Button
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "mr-2 text-black",
                  })}
                  onClick={() => setIsShowModal(false)}
                >
                  Huỷ
                </Button>
                <Button
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                  onClick={() => handleDeleteListBook(email)}
                >
                  Xác nhận
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalDeleteConfirm;
