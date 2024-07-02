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

const listHours = [
  {
    id: "1",
    label: "7h-10h",
  },
  {
    id: "2",
    label: "13h-17h",
  },
  {
    id: "3",
    label: "18h-22h",
  },
] as const;

const FormSchema = z.object({
  // listHours: z.array(z.string(), {
  //   message: "You have to select at least one item.",
  // }),
  listHours: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

function ModalConfirm({
  open,
  setAcceptDate,
  setModalConfirm,
  setListHours,
  newList,
  selectedDates,
}: {
  open: boolean;
  setAcceptDate: React.Dispatch<React.SetStateAction<boolean>>;
  setModalConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setListHours: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedDates: CalendarSelected[] | undefined;
  newList: Array<any>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      listHours: [],
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setAcceptDate(true);
    setModalConfirm(false);
    setListHours(data.listHours);
    form.reset({ listHours: [] });
  };
  const currentDate = newList.find((item) => {
    return item.date === selectedDates?.[0]?.toString();
  });
  console.log(currentDate);

  return (
    <div className="z-[120]">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="p-8" showIcon={false}>
          <DialogHeader>
            <DialogTitle className="font-normal">Vui lòng chọn khung giờ</DialogTitle>
            <DialogDescription className=" !mt-6" asChild>
              <div>
                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="listHours"
                        render={() => (
                          <FormItem className="">
                            <div className="mb-4">
                              <FormLabel className="text-base"></FormLabel>
                              <FormDescription>Select the items you want to booking </FormDescription>
                            </div>
                            {listHours.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="listHours"
                                render={({ field }) => {
                                  return (
                                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          disabled={currentDate?.hours?.includes(item.id)}
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(field.value?.filter((value) => value !== item.id));
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={() => setModalConfirm(false)}
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
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalConfirm;
