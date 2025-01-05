import { useState } from "react";
import { Notification } from "../Notification/Notification";
import { toast } from "react-toastify";

export const WeatherReport = () => {
  const [newCity, setNewCity] = useState("");
  const [data, setData] = useState();

  const apiKey = "8f6c035c54b34cfda9e1c31cba22fce7";

  const getCityName = async () => {
    if (newCity === "") {
      toast.warn("Please enter a city");
      return;
    }
    
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        toast.warn("Could not fetch Weather data");
        return;
      }

      setNewCity("");

      const jsonData = await response.json();
      const { name, weather, main } = jsonData;
      
      setData({
        name,
        description: weather[0].description,
        temperature: main.temp,
        humidity: main.humidity,
        weatherIcon: weather[0].icon,
      });

     


    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="container-fluid body ">
      <div className="row mt-5">
        <h1 className="fw-bold text-center">Weather Report</h1>
        <div className="col-lg-8 col-12 offset-lg-2 mt-5">
          <div className="col-8 offset-2 mb-5">
            <div className="row">
              <div className="col-6">
                <input
                  placeholder="Enter a Main City in your country"
                  className="form-control text-center"
                  value={newCity}
                  onChange={(event) => setNewCity(event.target.value)}
                />
              </div>
              <div className="col-6 d-grid">
                <button
                  className="btn btn-success"
                  onClick={getCityName}
                >
                  Get Report
                </button>
              </div>
            </div>
          </div>

          {data && (
            <div className="col-8 offset-2 card text-center mb-5 mt-5">
              <label className="mt-5 fs-1 fw-bolder">{data.name}</label>
              <h3>{(data.temperature - 273.15).toFixed(2)} °C</h3>
              <h5>Humidity: {data.humidity}%</h5>
              <h5>{data.description}</h5>
              <h5 className="mb-5 fs-1">
                <img src={`http://openweathermap.org/img/wn/${data.weatherIcon}.png`} alt="weather icon" />
              </h5>
            </div>
          )}
        </div>
      </div>
      <Notification />
    </div>
  );
};
