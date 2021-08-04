import React, { FC } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { AppDispatch, wrapper } from "../../store";
import IPet from "../../types/pet";
import { fetchPet } from "../../store/actions/pet.actions";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
import PetFormEditor from "../../components/PetFormEditor";

interface PetPageProps {
  pet: IPet | null;
}

const PetPage: FC<PetPageProps> = ({ pet }) => {
  const { push } = useRouter();
  const navBack = () => push("/pets");

  if (!pet) {
    navBack();
    return null;
  }

  return (
    <MainLayout
      title={pet ? `Карточка питомца: ${pet.name}` : ""}
      onNavBack={navBack}
    >
      <PetFormEditor pet={pet} mode="edit" />
    </MainLayout>
  );
};

export default PetPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store, params }) => {
    const action = await (store.dispatch as AppDispatch)(
      fetchPet(params!.id as string)
    );

    await (store.dispatch as AppDispatch)(fetchCustomerCollection());

    const props: { pet: IPet | null } = {
      pet: action.meta.requestStatus !== "rejected" ? (action.payload as IPet) : null
    };

    return { props };
  });
