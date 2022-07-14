import React from "react";
import Navigation from "./config/Navigation";
import { ConversionContextProvider } from "./util/ConversionContext";
import { api } from "./util/api";
api("/latest?base=USD")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
export default () => {
  return (
    <ConversionContextProvider>
      <Navigation />
    </ConversionContextProvider>
  );
};
