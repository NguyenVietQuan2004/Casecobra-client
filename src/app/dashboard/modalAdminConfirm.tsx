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
function ModalAdminConfirm({ email, fetchListUser }: { email: string; fetchListUser: () => {} }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleOnlickConfirm = async () => {
    try {
      await bookingApi.updateBookingToYes(email);
      setIsShowModal(false);
      fetchListUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Dialog open={isShowModal}>
        <DialogTrigger asChild>
          <div>
            <Button
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={() => setIsShowModal(true)}
            >
              Xác nhận
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="p-8 z-[120]" showIcon={false}>
          <DialogHeader>
            <DialogTitle className="font-normal">Bạn có chắc chắn xác nhận đơn hàng</DialogTitle>
            <DialogDescription className=" !mt-6" asChild>
              <div className="flex justify-end">
                <Button
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "mr-2",
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
                  onClick={handleOnlickConfirm}
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

export default ModalAdminConfirm;
