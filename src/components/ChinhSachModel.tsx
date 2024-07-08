import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { buttonVariants } from "./ui/button";
function ChinhSach() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
          })}
        >
          Chính sách
        </Link>
      </DialogTrigger>
      <DialogContent className="p-1 pt-8 sm:p-8  z-[122] !max-w-[100vw] sm:!max-w-[50rem]">
        <DialogHeader>
          <DialogTitle className=" font-semibold">Chinh sach</DialogTitle>
          <DialogDescription className="flex justify-center sm:justify-end !mt-6" asChild></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ChinhSach;
