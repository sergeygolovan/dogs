import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";

const CustomersPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      title={`База клиентов`}
      onNavBack={() => router.push("/")}
    ></MainLayout>
  );
};

export default CustomersPage;
