import React from "react";
import GuestPage from "./GuestPage";
import UserPage from "./UserPage";

function Greeting(props) {

    const isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {

        return <UserPage />;

    }

    return <GuestPage />;

}

export default Greeting;