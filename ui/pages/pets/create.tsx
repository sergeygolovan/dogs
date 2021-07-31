import { useRouter } from "next/router";
import { FC } from "react";
import PetEditor from "../../components/PetEditor";
import MainLayout from "../../layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "../../store";
//import { reset } from "../../store/creators";

const CreatePetPage: FC = () => {

  const router = useRouter()

  return (
    <MainLayout title={`Создание карточки питомца`} onNavBack={() => router.push('/pets')}>
      <PetEditor mode="create"/>
    </MainLayout>
  );
};

export default CreatePetPage;

// export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
//   await (store.dispatch as NextThunkDispatch)(await reset());
// });
