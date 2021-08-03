import { FC } from "react";
import MainLayout from "../../layouts/MainLayout";
import PetEditor from "../../components/PetEditor";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { AppDispatch, wrapper } from "../../store";
import { fetchPet } from "../../store/actions/pet.actions";
import IPet from "../../types/pet";
import { fetchCustomerCollection } from "../../store/actions/customer.actions";

const PetPage: FC = ({ id, entity }) => {

  const {push} = useRouter()

  return (
    <MainLayout title={entity ? `Карточка питомца: ${entity.name}`: ""} onNavBack={() => push('/pets')}>
      <PetEditor id={id} entity={entity} mode="edit"/>
    </MainLayout>
  );
};

export default PetPage;


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async ({ store, params }) => {
  const action = await (store.dispatch as AppDispatch)(fetchPet(params!.id as string));

  await (store.dispatch as AppDispatch)(fetchCustomerCollection());

  let props: { id: string | null, entity: IPet | null } = {
    id: (params?.id as string) || null,
    entity: null
  };

  if (action.meta.requestStatus !== 'rejected') {
    props.entity = (action.payload as IPet)
  }

  return {props};
});