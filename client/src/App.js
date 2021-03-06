import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import SearchBarComponent from "./components/search-bar";
import WeatherDataComponent from "./components/weather-data"

const ENDPOINT = '';
const socket = socketIOClient(ENDPOINT);

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    socket.emit("connected");
    socket.on("update", (data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="App">
      <div className="weather">
        <h2>Weather Application</h2>
        <SearchBarComponent
          onSearch={(city, data) => {
            setData(data);
            socket.emit("weather", city);
          }}
        />
        <WeatherDataComponent data={data} />
      </div>
    </div>
  );
}

export default App;
