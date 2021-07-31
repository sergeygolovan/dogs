import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

const OrdersPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      title={`Просмотр списка заказов`}
      onNavBack={() => router.push("/")}
    ></MainLayout>
  );
}

export default OrdersPage;