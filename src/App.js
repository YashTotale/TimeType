import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import NavBar from "./components/navigation/NavBar";
import SideBar from "./components/navigation/SideBar";
import { makeStyles } from "@material-ui/core";
import TypingInput from "./components/typing/TypingInput";
import words from "./words";

const useAppStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
}));

const App = () => {
  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
    };
  }, []);
  const classes = useAppStyles();
  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <SideBar></SideBar>
      <TypingInput></TypingInput>
    </div>
  );
};

export default hot(module)(App);
