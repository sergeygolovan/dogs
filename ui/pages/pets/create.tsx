import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import PetEditor from "../../components/PetEditor";
import MainLayout from "../../layouts/MainLayout";
import { AppDispatch, wrapper } from "../../store";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";
// import { NextThunkDispatch, wrapper } from "../../store";
//import { reset } from "../../store/creators";

const CreatePetPage: FC = () => {

  const { push } = useRouter()

  return (
    <MainLayout title={`Создание карточки питомца`} onNavBack={() => push('/pets')}>
      <PetEditor id={""} entity={null} mode="create"/>
    </MainLayout>
  );
};

export default CreatePetPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
  await (store.dispatch as AppDispatch)(fetchCustomerCollection());
});
