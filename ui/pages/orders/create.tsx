import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import OrderFormEditor from "../../components/OrderFormEditor";
import MainLayout from "../../layouts/MainLayout";
import { AppDispatch, wrapper } from "../../store";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import { fetchPetCollection } from "../../store/actions/pet.actions";

const CreateOrderPage: FC = () => {
  const { push } = useRouter();
  const navBack = () => push("/orders");

  return (
    <MainLayout title={`Создание заказа`} onNavBack={navBack}>
      <OrderFormEditor mode="create" />
    </MainLayout>
  );
};

export default CreateOrderPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {
    await (store.dispatch as AppDispatch)(fetchCustomerCollection());
    await (store.dispatch as AppDispatch)(fetchPetCollection());
  });
