import officeImage from "./office.jpg";
import "./App.css";

function App() {

  const officeDetails = {
    Name: "DBS",
    Rent: 50000,
    Address: "Chennai"
  };

  const officeList = [
    {
      Name: "DBS",
      Rent: 50000,
      Address: "Chennai"
    },
    {
      Name: "Regus",
      Rent: 70000,
      Address: "Bangalore"
    },
    {
      Name: "SmartWorks",
      Rent: 55000,
      Address: "Hyderabad"
    }
  ];

  return (
    <div style={{ marginLeft: "40px" }}>

      <h1>Office Space, at Affordable Range</h1>

      <img
        src={officeImage}
        alt="Office Space"
        width="25%"
        height="25%"
      />

      <h2>Name: {officeDetails.Name}</h2>

      <h3
        style={{
          color: officeDetails.Rent <= 60000 ? "red" : "green"
        }}
      >
        Rent: Rs. {officeDetails.Rent}
      </h3>

      <h3>Address: {officeDetails.Address}</h3>

      <hr />

      <h2>Office Space List</h2>

      {officeList.map((item, index) => (
        <div key={index}>

          <h3>Name: {item.Name}</h3>

          <h3
            style={{
              color: item.Rent <= 60000 ? "red" : "green"
            }}
          >
            Rent: Rs. {item.Rent}
          </h3>

          <h3>Address: {item.Address}</h3>

          <hr />

        </div>
      ))}

    </div>
  );
}

export default App;