import Head from "next/head";
import styles from "../styles/MainMenu.module.css";
import MainMenuItem, { IMainMenuItemProps } from "./MainMenuItem";

export default function MainMenu() {

  const title = "Добро пожаловать!";

  const items: IMainMenuItemProps[] = [
    {
      title: "Создать заказ",
      description: "Быстрое создание заказа, карточки клиента и анкет питомцев",
      href: "/orders/create",
    },
    {
      title: "Просмотр заказов",
      description: "Просмотр и создание заказов",
      href: "/orders",
    },
    {
      title: "Календарь",
      description: "Просмотр и создание заказов в календаре",
      href: "/calendar",
    },
    {
      title: "База клиентов",
      description: "Просмотр и редактирование картотеки клиентов",
      href: "/customers",
    },
    {
      title: "База питомцев",
      description: "Просмотр и редактирование информации о питомцах",
      href: "/pets",
    },
  ];

  return (
    <>
      <Head>
        <title>Каникулы на Пахре</title>
        <meta name="description" content="Сервис по передержке собак" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.items}>
          {items.map(itemProps => <MainMenuItem key={itemProps.href} {...itemProps}/>)}
        </div>

      </main>
    </>
  );
}
