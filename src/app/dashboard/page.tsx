import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import StatusDropdown from "./StatusDropdown";

const Page = async () => {
  const orders = [
    {
      id: "1",
      shippingAddress: "can tho",
      status: "chua thanh toan",
      createdAt: "20/20/2004",
      user: {
        id: "2",
        email: "nguyenvietquan.30032004@gmail.com",
        daybook: "6-30-2004",
        name: "Quan dep trai",
        amount: 2,
      },
    },
    {
      id: "1",
      shippingAddress: "can tho",
      status: "chua thanh toan",
      createdAt: "20/20/2004",
      user: {
        id: "2",
        email: "nguyenvietquan.30032004@gmail.com",
        daybook: "6-30-2004",
        name: "Quan dep trai",
        amount: 2,
      },
    },
    {
      id: "1",
      shippingAddress: "can tho",
      status: "chua thanh toan",
      createdAt: "20/20/2004",
      user: {
        id: "2",
        email: "nguyenvietquan.30032004@gmail.com",
        daybook: "6-30-2004",
        name: "Quan dep trai",
        amount: 2,
      },
    },
    {
      id: "1",
      shippingAddress: "can tho",
      status: "chua thanh toan",
      createdAt: "20/20/2004",
      user: {
        id: "2",
        email: "nguyenvietquan.30032004@gmail.com",
        daybook: "6-30-2004",
        name: "Quan dep trai",
        amount: 2,
      },
    },
    {
      id: "1",
      shippingAddress: "can tho",
      status: "chua thanh toan",
      createdAt: "20/20/2004",
      user: {
        id: "2",
        email: "nguyenvietquan.30032004@gmail.com",
        daybook: "6-30-2004",
        name: "Quan dep trai",
        amount: 2,
      },
    },
    {
      id: "1",
      shippingAddress: "can tho",
      status: "chua thanh toan",
      createdAt: "20/20/2004",
      user: {
        id: "2",
        email: "nguyenvietquan.30032004@gmail.com",
        daybook: "6-30-2004",
        name: "Quan dep trai",
        amount: 2,
      },
    },
  ];

  const lastWeekSum = 100;

  const lastMonthSum = 700;

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">{lastWeekSum}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">of {WEEKLY_GOAL} goal</div>
              </CardContent>
              <CardFooter>
                <Progress value={(lastWeekSum * 100) / WEEKLY_GOAL} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">{lastMonthSum}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">of {MONTHLY_GOAL} goal</div>
              </CardContent>
              <CardFooter>
                <Progress value={(lastMonthSum * 100) / MONTHLY_GOAL} />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Ngày đặt lịch đầu tiên </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="bg-accent cursor-pointer">
                  <TableCell className="">
                    <div className="font-medium">{order.user.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">{order.user.email}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{order.createdAt}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{order.user.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
