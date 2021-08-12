import { useRouter } from "next/router";
import React from "react";

const Index = () => {

  useRouter().push('/calendar');

  return null;
};

export default Index;

