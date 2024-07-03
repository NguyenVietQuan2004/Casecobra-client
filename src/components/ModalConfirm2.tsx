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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "./ui/input";

const FormSchema = z.object({
  numberDate: z.coerce.number().positive(),
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
      numberDate: 1,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setAcceptDate(true);
    setModalConfirm(false);
    setListHours(["1", "2", "3"]);
    console.log(data);
    form.reset({ numberDate: 1 });
  }

  return (
    <div className="z-[120]">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="p-8" showIcon={false}>
          <DialogHeader>
            <DialogTitle className="font-normal"></DialogTitle>
            <DialogDescription className=" !mt-6" asChild>
              <div className="">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                      control={form.control}
                      name="numberDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium ml-[2px]">Số ngày kể từ ngày bắt đầu</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormDescription className="ml-[2px]">Nếu không nhập mặc định là 1</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => {
                          setModalConfirm(false);
                          form.reset({ numberDate: 1 });
                        }}
                        className={buttonVariants({
                          size: "sm",
                          className: "hidden sm:flex items-center gap-1 mr-4",
                        })}
                      >
                        Hủy
                      </Button>
                      <Button
                        type="submit"
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
