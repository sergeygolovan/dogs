import { useRouter } from "next/router";
import React from "react";
import PetCollection from "../../components/PetCollection";
import MainLayout from "../../layouts/MainLayout";

const PetsPage = () => {

  const router = useRouter();

  return (
    <MainLayout title={`База питомцев`} onNavBack={() => router.push('/')}>
      <PetCollection/>
    </MainLayout>
  );
};

export default PetsPage;