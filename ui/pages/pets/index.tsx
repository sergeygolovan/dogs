import { useRouter } from "next/router";
import React from "react";
import PetCollection from "../../components/PetCollection";
import MainLayout from "../../layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchPetCollection } from "../../store/creators";

const PetsPage = () => {

  const router = useRouter();

  return (
    <MainLayout title={`База питомцев`} onNavBack={() => router.push('/')}>
      <PetCollection/>
    </MainLayout>
  );
};

export default PetsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchPetCollection());
  }
);