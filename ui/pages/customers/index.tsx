import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import CustomerCollection from "../../components/CustomerCollection";
import MainLayout from "../../layouts/MainLayout";
import { AppDispatch, wrapper } from "../../store";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import { fetchOrderCollection } from "../../store/actions/order.actions";
import { fetchPetCollection } from "../../store/actions/pet.actions";
import ICustomer from "../../types/customer";

interface ICustomersPageProps {
  customers: ICustomer[];
}

const CustomersPage: FC<ICustomersPageProps> = ({ customers }) => {

  const router = useRouter();

  return (
    <MainLayout title={`База клиентов`} onNavBack={() => router.push('/')}>
      <CustomerCollection customers={customers}/>
    </MainLayout>
  );
};

export default CustomersPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {
    await (store.dispatch as AppDispatch)(fetchOrderCollection());

    const action = await (store.dispatch as AppDispatch)(fetchCustomerCollection());

    return {
      props: {
        customers: action.meta.requestStatus !== "rejected" ? (action.payload as ICustomer[]) : []
      }
    }
  });