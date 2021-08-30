import dynamic from "next/dynamic";
import { SchedulerViews } from "smart-webcomponents-react";
import MainLayout from "../../layouts/MainLayout";
import "smart-webcomponents-react/source/styles/smart.default.css";
import IOrder from "../../types/order";
import { GetServerSideProps } from "next";
import { wrapper, AppDispatch } from "../../store";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import { fetchOrderCollection } from "../../store/actions/order.actions";
import { fetchPetCollection } from "../../store/actions/pet.actions";
// import OrderCalendar from "../../components/OrderCalendar";
import { useRouter } from "next/router";

function CalendarPage({ orders }) {
  const router = useRouter();

  return (
    <MainLayout
      title={`Календарь`}
      onNavBack={() => router.push("/")}
    >
      {/* <OrderCalendar orders={orders}/> */}
    </MainLayout>
  );
}

export default CalendarPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {
    await (store.dispatch as AppDispatch)(fetchCustomerCollection());
    await (store.dispatch as AppDispatch)(fetchPetCollection());

    const action = await (store.dispatch as AppDispatch)(
      fetchOrderCollection()
    );

    return {
      props: {
        orders:
          action.meta.requestStatus !== "rejected"
            ? (action.payload as IOrder[])
            : [],
      },
    };
  });
