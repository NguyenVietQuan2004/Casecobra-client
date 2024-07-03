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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { CalendarSelected } from "@demark-pro/react-booking-calendar";
import { Input } from "./ui/input";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
function ModalConfirm2({
  open,
  setAcceptDate,
  setModalConfirm,
  setListHours,
}: {
  open: boolean;
  setAcceptDate: React.Dispatch<React.SetStateAction<boolean>>;
  setModalConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setListHours: React.Dispatch<React.SetStateAction<Array<string>>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  const handleAccept = () => {
    setAcceptDate(true);
    setModalConfirm(false);
    setListHours(["1", "2", "3"]);
  };

  return (
    <div className="z-[120]">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="p-8" showIcon={false}>
          <DialogHeader>
            <DialogTitle className="font-normal">Bạn có muốn tiếp tục </DialogTitle>
            <DialogDescription className=" !mt-6" asChild>
              <div className="">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số ngày kể từ ngày bắt đầu</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
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
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalConfirm2;
