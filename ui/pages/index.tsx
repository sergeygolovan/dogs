import React from "react";
import MainLayout from "../layouts/MainLayout";
import MainMenu from "../components/MainMenu";

const Index = () => {
  return (
    <MainLayout showBackButton={false} >
      <MainMenu/>
    </MainLayout>
  );
};

export default Index;

