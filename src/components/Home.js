import React, { useState } from "react";
import axios from "axios";

const api = {
  key: "53268a647d290e9f6457193f68699300",
  base: "https://api.openweathermap.org/data/2.5/",
};
function Home() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    e.preventDefault();

    axios
      .post(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((response) => {
        setWeather(response.data);
      });
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <form>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search..."
            />
          </div>
          <button type="submit" hidden={true} onClick={search}></button>
        </form>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Home;
