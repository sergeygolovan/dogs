import React from "react";
import Navbar from "../components/Navbar";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AssignmentIcon from '@material-ui/icons/Assignment';
import PetsIcon from '@material-ui/icons/Pets';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import TodayIcon from '@material-ui/icons/Today';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styles from "../styles/MainLayout.module.css";
import { useRouter } from "next/router";
import { useAppSelector } from "../store";
import CustomSnackbar from "../components/CustomSnackbar";
import IMessage from "../types/message";

interface MainLayoutProps {
  title?: string;
  showBackButton?: boolean;
  onNavBack?: Function;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "Каникулы на пахре",
  showBackButton = true,
  onNavBack,
}) => {
  const router = useRouter();

  const onNavTo = (path: string) => () => {
    router.push(path);
  };

  if (!onNavBack) {
    onNavBack = _ => router.back();
  }

  const [tabName, setTabName] = React.useState('');

  const handleChange = (event: React.SyntheticEvent, tabPath: string) => {
    setTabName(tabPath);
    router.push(tabPath);
  };

  const messages: IMessage[] = useAppSelector((state) => state.messages.queue);

  let messageItems = messages.map(({ message, type, id }: IMessage, index) => (
    <CustomSnackbar
      key={id}
      id={id}
      position={index + 1}
      type={type}
      message={message}
    />
  ));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <AppBar position="fixed" className={styles.toolbar}>
        <Toolbar>
          {showBackButton && (
            <IconButton
              className={styles.button}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={onNavBack}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Stack spacing={2} direction="row" className={styles.title}>
            <Typography className={styles.title} variant="h6" noWrap>
              {title}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className={styles.container}>
        {messageItems}
        {children}
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={tabName}
          onChange={handleChange}
        >
          
          <BottomNavigationAction label="Питомцы" value="/pets" icon={<PetsIcon />} />
          <BottomNavigationAction label="Клиенты" value="/customers" icon={<PeopleAltIcon />} />
          <BottomNavigationAction label="Создать заказ" value="/orders/create" icon={<AddCircleOutlineIcon />} />
          <BottomNavigationAction label="Заказы" value="/orders" icon={<AssignmentIcon />} />
          <BottomNavigationAction label="Календарь" value="/calendar" icon={<TodayIcon />} />
          
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default MainLayout;
