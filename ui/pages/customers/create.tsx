import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";import CustomerFormEditor from "../../components/CustomerFormEditor";
;
import MainLayout from "../../layouts/MainLayout";
import {
  AppDispatch,
  wrapper,
} from "../../store";
import { fetchOrderCollection } from "../../store/actions/order.actions";
import { fetchPetCollection } from "../../store/actions/pet.actions";

const CreateCustomerPage: FC = () => {
  
  const { push } = useRouter();
  const navBack = () => push("/customers");

  return (
    <MainLayout
      title={`Создание карточки клиента`}
      onNavBack={navBack}
    >
      <CustomerFormEditor mode="create" />
    </MainLayout>
  );
};

export default CreateCustomerPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {
    await (store.dispatch as AppDispatch)(fetchOrderCollection());
    await (store.dispatch as AppDispatch)(fetchPetCollection());
  });
