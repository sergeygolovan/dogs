import React, { FC } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { AppDispatch, wrapper } from "../../store";
import IOrder from "../../types/order";
import { fetchOrder } from "../../store/actions/order.actions";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import OrderFormEditor from "../../components/OrderFormEditor";
import { useEffect } from "react";
import { fetchPetCollection } from "../../store/actions/pet.actions";

interface OrderPageProps {
  order: IOrder | null;
}

const OrderPage: FC<OrderPageProps> = ({ order }) => {
  const { push } = useRouter();
  const navBack = () => push("/orders");

  useEffect(() => {
    if (!order) {
      navBack();
    }
  })

  return (
    <MainLayout title={order ? `Карточка заказа: ${order._id}` : ""}>
      <OrderFormEditor order={order} mode="edit" />
    </MainLayout>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store, params }) => {
    const action = await (store.dispatch as AppDispatch)(
      fetchOrder(params!.id as string)
    );

    await (store.dispatch as AppDispatch)(fetchCustomerCollection());
    await (store.dispatch as AppDispatch)(fetchPetCollection());

    const props: { order: IOrder | null } = {
      order:
        action.meta.requestStatus !== "rejected"
          ? (action.payload as IOrder)
          : null,
    };

    return { props };
  });
