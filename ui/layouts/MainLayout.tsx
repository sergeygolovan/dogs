import React from "react";
import Navbar from "../components/Navbar";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SearchIcon from "@material-ui/icons/Search";
import styles from '../styles/MainLayout.module.css'
import { useRouter } from "next/router";

interface MainLayoutProps {
  title?: string;
  showBackButton?: boolean;
  onNavBack?: Function
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "Каникулы на пахре",
  showBackButton = true,
  onNavBack
}) => {

  const router = useRouter()

  if (!onNavBack) {
    onNavBack = () => router.back()
  }

  const onNavTo =(path) => () => {
    router.push(path);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <AppBar position="fixed" className={styles.toolbar}>
        <Toolbar>
          {showBackButton ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={onNavBack}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : null}
          <Stack spacing={2} direction="row" className={styles.nav}>
            {/* <Button variant="contained" size={"large"} color="success" disableElevation onClick={onNavTo("/orders/create")}>Создать заказ</Button> */}
            <Button variant="contained" disableElevation onClick={onNavTo("/pets")}>База питомцев</Button>
            {/* <Button variant="contained" disableElevation onClick={onNavTo("/calendar")}>Календарь</Button>
            <Button variant="contained" disableElevation onClick={onNavTo("/customers")}>База клиентов</Button> */}
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default MainLayout;
