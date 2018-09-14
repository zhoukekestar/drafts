// src/app-client.js
import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";

window.onload = () => {
    ReactDOM.render(
        <HomePage count={10} />,
        document.getElementById("main")
    );
};
