import React, { useState } from "react";

function CurrencyConvertor() {

    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        const euro = (parseFloat(amount) / 90).toFixed(2);

        alert("Converting to Euro Amount is " + euro);

    };

    return (

        <div>

            <h1 style={{ color: "green" }}>
                Currency Convertor!!!
            </h1>

            <form onSubmit={handleSubmit}>

                <label>Amount</label>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <br /><br />

                <label>Currency</label>

                <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Submit
                </button>

            </form>

        </div>

    );

}

export default CurrencyConvertor;