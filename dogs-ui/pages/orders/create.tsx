import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

function createOrderPage() {
    const router = useRouter();

  return (
    <MainLayout
      title={`Создание заказа`}
      onNavBack={() => router.push("/")}
    ></MainLayout>
  );
}

export default createOrderPage;
