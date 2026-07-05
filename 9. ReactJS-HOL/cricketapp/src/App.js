import "./App.css";

import { ListofPlayers, Scorebelow70 } from "./ListofPlayers";

import {
  OddPlayers,
  EvenPlayers,
  ListofIndianPlayers,
  IndianTeam
} from "./IndianPlayers";

function App() {

  const flag = false;

  if (flag === true) {

    return (
      <div>

        <h1>List of Players</h1>

        <ListofPlayers />

        <hr />

        <Scorebelow70 />

      </div>
    );

  } else {

    return (

      <div>

        <h1>Indian Team</h1>

        <h2>Odd Players</h2>

        {OddPlayers(IndianTeam)}

        <hr />

        <h2>Even Players</h2>

        {EvenPlayers(IndianTeam)}

        <hr />

        <h2>List of Indian Players Merged</h2>

        <ListofIndianPlayers />

      </div>

    );

  }

}

export default App;