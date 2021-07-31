import { FC } from "react";
import MainLayout from "../../layouts/MainLayout";
import PetEditor from "../../components/PetEditor";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchPet } from "../../store/creators";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useRouter } from "next/router";

const PetPage: FC = () => {

  const item = useTypedSelector(state => state.selectedPet.item);
  const router = useRouter()

  const title = item?.name ? `Карточка питомца: ${item.name}` : `Карточка питомца`;

  return (
    <MainLayout title={title} onNavBack={() => router.push('/pets')}>
      <PetEditor mode="edit"/>
    </MainLayout>
  );
};

export default PetPage;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    if (typeof params?.id === 'string') {
      await (store.dispatch as NextThunkDispatch)(await fetchPet(params.id));
    }
  }
);
