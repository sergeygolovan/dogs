import dynamic from "next/dynamic";
import { FC } from "react";
import { SchedulerViews } from "smart-webcomponents-react";
import "smart-webcomponents-react/source/styles/smart.default.css";
import { customerCollectionSelectors, useAppSelector } from "../store";
import styles from "../styles/OrderCalendar.module.css";
import IOrder from "../types/order";

// const Scheduler = dynamic(() => import("smart-webcomponents-react/scheduler"), {
//   ssr: false, //no server-side rendering
//   loading: () => <>Загрузка...</>,
// });

interface IOrderCalendarProps {
  orders: IOrder[];
}

const OrderCalendar: FC<IOrderCalendarProps> = ({ orders }) => {

  //const customers = useAppSelector(customerCollectionSelectors.selectAll);

  // dataSource = [
  //   {
  //     label: "Google AdWords Strategy",
  //     dateStart: new Date(currentYear, currentMonth, todayDate, 9, 0),
  //     dateEnd: new Date(currentYear, currentMonth, todayDate + 1, 10, 30),
  //     description: "hello description",
  //   },
  //   {
  //     label: "New Brochures",
  //     dateStart: new Date(currentYear, currentMonth, todayDate - 1, 11, 30),
  //     dateEnd: new Date(currentYear, currentMonth, todayDate - 1, 14, 15),
  //   },
  //   {
  //     label: "Brochure Design Review",
  //     dateStart: new Date(currentYear, currentMonth, todayDate + 2, 13, 15),
  //     dateEnd: new Date(currentYear, currentMonth, todayDate + 2, 16, 15),
  //   },
  // ],

  const colorScheme = ['#D50000', '#E67C73', '#F4511E', '#F6BF26'];

  //const dataSource = [];
  // const dataSource = orders.map(order => ({
  //   label: `Клиент: ${customers.find(c => c._id === order.customer).name}`,
  //   dateStart: new Date(order.dateTimeFrom),
  //   dateEnd: new Date(order.dateTimeTo),
  //   description: order.comments
  // }));

  const currentTimeIndicator = true,
    shadeUntilCurrentTime = true,
    view = "day",
    views: SchedulerViews[] = [
      "day",
      "week",
      "month",
      "timelineDay",
      "timelineWeek",
      "timelineMonth",
    ],
    firstDayOfWeek = 1;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* <Scheduler
          className={styles.scheduler}
          id="scheduler"
          currentTimeIndicator={true}
          shadeUntilCurrentTime={false}
          dataSource={[]}
          view="month"
          colorScheme={colorScheme}
          //maxEventsPerCell={5}
          // views={views}
          firstDayOfWeek={1}
        ></Scheduler> */}
      </main>
    </div>
  );
};

export default OrderCalendar;
