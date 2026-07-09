import React, { useState } from "react";

function EventExamples() {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const sayHello = () => {
        alert("Hello! Have a nice day.");
    };

    const increase = () => {
        increment();
        sayHello();
    };

    const sayWelcome = (message) => {
        alert(message);
    };

    const handleClick = () => {
        alert("I was clicked");
    };

    return (
        <div>

            <h2>{count}</h2>

            <button onClick={increase}>Increment</button>

            <br /><br />

            <button onClick={decrement}>Decrement</button>

            <br /><br />

            <button onClick={() => sayWelcome("Welcome")}>
                Say Welcome
            </button>

            <br /><br />

            <button onClick={handleClick}>
                Click on me
            </button>

        </div>
    );
}

export default EventExamples;