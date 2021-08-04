import React, { FC } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { AppDispatch, wrapper } from "../../store";
import ICustomer from "../../types/customer";
import { fetchCustomer } from "../../store/actions/customer.actions";
import CustomerFormEditor from "../../components/CustomerFormEditor";
import { fetchOrderCollection } from "../../store/actions/order.actions";
import { fetchPetCollection } from "../../store/actions/pet.actions";

interface CustomerPageProps {
  customer: ICustomer | null;
}

const CustomerPage: FC<CustomerPageProps> = ({ customer }) => {
  const { push } = useRouter();
  const navBack = () => push("/customers");

  if (!customer) {
    navBack();
    return null;
  }

  return (
    <MainLayout
      title={customer ? `Карточка клиента: ${customer.name}` : ""}
      onNavBack={navBack}
    >
      <CustomerFormEditor customer={customer} mode="edit" />
    </MainLayout>
  );
};

export default CustomerPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store, params }) => {
    const action = await (store.dispatch as AppDispatch)(
      fetchCustomer(params!.id as string)
    );

    await (store.dispatch as AppDispatch)(fetchOrderCollection());
    await (store.dispatch as AppDispatch)(fetchPetCollection());

    const props: { customer: ICustomer | null } = {
      customer: action.meta.requestStatus !== "rejected" ? (action.payload as ICustomer) : null
    };

    return { props };
  });
