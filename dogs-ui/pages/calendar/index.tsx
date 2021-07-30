import dynamic from "next/dynamic";
import { SchedulerViews } from "smart-webcomponents-react";
import MainLayout from "../../layouts/MainLayout";
import "smart-webcomponents-react/source/styles/smart.default.css";
import styles from "../../styles/Calendar.module.css";

const Scheduler = dynamic(() => import("smart-webcomponents-react/scheduler"), {
  ssr: false, //no server-side rendering
  loading: () => <>Загрузка...</>,
});

function CalendarPage() {
  const today = new Date(),
    todayDate = today.getDate(),
    currentYear = today.getFullYear(),
    currentMonth = today.getMonth(),
    dataSource = [
      {
        label: "Google AdWords Strategy",
        dateStart: new Date(currentYear, currentMonth, todayDate, 9, 0),
        dateEnd: new Date(currentYear, currentMonth, todayDate + 1, 10, 30),
        description: "hello description"
        
      },
      {
        label: "New Brochures",
        dateStart: new Date(currentYear, currentMonth, todayDate - 1, 11, 30),
        dateEnd: new Date(currentYear, currentMonth, todayDate - 1, 14, 15),

      },
      {
        label: "Brochure Design Review",
        dateStart: new Date(currentYear, currentMonth, todayDate + 2, 13, 15),
        dateEnd: new Date(currentYear, currentMonth, todayDate + 2, 16, 15),
       
      },
    ],
    currentTimeIndicator = true,
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
    <MainLayout title={`Календарь`} showBackButton={true}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Scheduler
            className={styles.scheduler}
            id="scheduler"
            currentTimeIndicator={true}
            shadeUntilCurrentTime={false}
            dataSource={dataSource}
            view="month"
            //maxEventsPerCell={5}
            // views={views}
            firstDayOfWeek={1}
          ></Scheduler>
        </main>
      </div>
    </MainLayout>
  );
}

export default CalendarPage;
