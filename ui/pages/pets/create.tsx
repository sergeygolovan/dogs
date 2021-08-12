import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import PetFormEditor from "../../components/PetFormEditor";
import MainLayout from "../../layouts/MainLayout";
import { AppDispatch, wrapper } from "../../store";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";

const CreatePetPage: FC = () => {
  return (
    <MainLayout title={`Создание карточки питомца`}>
      <PetFormEditor mode="create" />
    </MainLayout>
  );
};

export default CreatePetPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {
    await (store.dispatch as AppDispatch)(fetchCustomerCollection());
  });
