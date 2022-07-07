import React, { useEffect, useState } from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import "./Home.scss";
const Home = () => {
  const [city, setCity] = useState();
  const [con, setCon] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [weather, setWeather] = useState();
  const [wind, setWind] = useState();
  const [windspeed, setWindspeed] = useState();
  const [search, setSearch] = useState("Islamabad");
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&city?[location]type=hour&appid=214869cac8d0978b3399caa1d65cb226`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
      // Wind Speed And Direction Section Start
      setWindspeed(resJson.wind);
      if (resJson.wind.deg == 11 || resJson.wind.deg < 78) {
        setWind("North-East");
      } else if (resJson.wind.deg == 78 || resJson.wind.deg < 168) {
        setWind("South-East");
      } else if (resJson.wind.deg == 168 || resJson.wind.deg < 258) {
        setWind("South-West");
      } else if (resJson.wind.deg == 258 || resJson.wind.deg < 348) {
        setWind("North-West");
      }
      // Wind Speed And Direction Section End
      setCon(resJson.sys);
      // Set Sunrise Time Zone
      setSunrise(new Date(resJson.sys.sunrise * 1000).toLocaleTimeString());
      // Set Sunset Time Zone
      setSunset(new Date(resJson.sys.sunset * 1000).toLocaleTimeString());
      setWeather(resJson.weather[0]);
      console.log(resJson);
    };
    fetchApi();
  }, [search]);

  // key: 214869cac8d0978b3399caa1d65cb226
  // api:https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  //api:https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=214869cac8d0978b3399caa1d65cb226

  //   let sec1 = con.sunrise;
  //   let date1 = new Date(sec1 * 1000);
  //   let sunrise = date1.toLocaleTimeString();

  //   let sec2 = con.sunset;
  //   let date2 = new Date(sec2 * 1000);
  //   let sunset = date2.toLocaleTimeString();

  // Getting Icon

  // Degree to Direction Function
  //   var Deg = wind.deg;
  //   //wind.deg;
  //   let dir = "";
  //   if (Deg == 11 || Deg < 78) {
  //     dir = "North-East";
  //   } else if (Deg == 78 || Deg < 168) {
  //     dir = "South-East";
  //   } else if (Deg == 168 || Deg < 258) {
  //     dir = "South-West";
  //   } else if (Deg == 258 || Deg < 348) {
  //     dir = "North-West";
  //   }

  return (
    <>
      <div className="container-fluid main_body">
        <div className="container WeatherBody">
          <div className="WeatherBox">
            <h1 className="heading">Weather Forcast</h1>
            <input
              type="search"
              className="form-control inputField"
              placeholder="City"
              aria-describedby="addon-wrapping"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            {!city ? (
              <p className="error">No Data Found</p>
            ) : (
              <div>
                <div className="info">
                  <h2 className="location">
                    <AddLocationIcon className="LocationIcon " /> {search},{" "}
                    {con.country}
                  </h2>
                  <h1 className="temp"> {city.temp}° </h1>
                  <h3 className="disc">{weather.description}</h3>

                  <h3 className="tempmin_max">
                    {city.temp_max}° / {city.temp_min}°
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div className="container secondDiv">
            <hr />
            {!city ? (
              <p className="error">No Data Found</p>
            ) : (
              <>
                <div className="row">
                  <div className="col">
                    <h2>{city.humidity}%</h2>
                    <h2>Humidity</h2>
                  </div>
                  <div className="col">
                    <h2>{city.feels_like}%</h2>
                    <h2>Feels Like</h2>
                  </div>
                  <div className="col">
                    <h2>{city.pressure} hPa</h2>
                    <h2>Pressure</h2>
                  </div>
                </div>
              </>
            )}
            <hr />
            {!city ? (
              <p className="error">No Data Found</p>
            ) : (
              <>
                <div className="row">
                  <div className="col">
                    <h2>{sunrise}</h2>
                    <h2>Sunrise</h2>
                  </div>
                  <div className="col">
                    <h2>{sunset}</h2>
                    <h2>Sunset</h2>
                  </div>
                  <div className="col">
                    <h2>{windspeed.speed} m/s</h2>
                    <h2>Wind Speed</h2>
                  </div>
                  <div className="col">
                    <h2>{wind}</h2>
                    <h2>Direction</h2>
                  </div>
                </div>
              </>
            )}
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
