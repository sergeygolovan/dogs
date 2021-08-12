import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import OrderCollection from "../../components/OrderCollection";
import MainLayout from "../../layouts/MainLayout";
import { wrapper, AppDispatch } from "../../store";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import { fetchOrderCollection } from "../../store/actions/order.actions";
import { fetchPetCollection } from "../../store/actions/pet.actions";
import IOrder from "../../types/order";

const OrdersPage = ({ orders }) => {
  const router = useRouter();

  return (
    <MainLayout
      title={`Просмотр списка заказов`}
      onNavBack={() => router.push("/")}
    >
      <OrderCollection orders={orders}/>
    </MainLayout>
  );
}

export default OrdersPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {

    await (store.dispatch as AppDispatch)(fetchCustomerCollection());
    await (store.dispatch as AppDispatch)(fetchPetCollection());

    const action = await (store.dispatch as AppDispatch)(fetchOrderCollection());

    return {
      props: {
        orders: action.meta.requestStatus !== "rejected" ? (action.payload as IOrder[]) : []
      }
    }
  });
