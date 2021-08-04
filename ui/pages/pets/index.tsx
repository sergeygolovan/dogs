import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import PetCollection from "../../components/PetCollection";
import MainLayout from "../../layouts/MainLayout";
import { AppDispatch, wrapper } from "../../store";
import { fetchPetCollection } from "../../store/actions/pet.actions";
import IPet from "../../types/pet";

interface IPetsPageProps {
  pets: IPet[];
}

const PetsPage: FC<IPetsPageProps> = ({ pets }) => {

  const router = useRouter();

  return (
    <MainLayout title={`База питомцев`} onNavBack={() => router.push('/')}>
      <PetCollection pets={pets}/>
    </MainLayout>
  );
};

export default PetsPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store }) => {
    const action = await (store.dispatch as AppDispatch)(fetchPetCollection());

    return {
      props: {
        pets: action.meta.requestStatus !== "rejected" ? (action.payload as IPet[]) : []
      }
    }
  });