"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";
function ModalConfirm({
  open,
  setAcceptDate,
  setModalConfirm,
}: {
  open: boolean;
  setAcceptDate: React.Dispatch<React.SetStateAction<boolean>>;
  setModalConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleAccept = () => {
    setAcceptDate(true);
    setModalConfirm(false);
  };
  return (
    <div className="z-[120]">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle className="font-normal">Bạn có chắc đặt ngày này chứ</DialogTitle>
            <DialogDescription className="flex justify-end !mt-6" asChild>
              <div>
                <Button
                  onClick={() => setModalConfirm(false)}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1 mr-4",
                  })}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleAccept}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
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

export default ModalConfirm;
