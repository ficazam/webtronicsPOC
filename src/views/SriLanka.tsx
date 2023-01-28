import { useState, useEffect } from "react";
import axios from "axios";
import { initialWeatherState, iWeather } from "../interfaces";
import { Card } from "@aws-amplify/ui-react";
import { ButtonInput } from "../components";
import { weathercodeConverter } from "../helpers";

export const SriLanka = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<iWeather>(initialWeatherState);
  const [weatherForecast, setWeatherForecast] = useState<string>("");

  const weatherPainter = () => {
    setLoading(true);

    axios(
      "https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/weather-painter"
    ).then((response) => {
      setWeather(response.data.current_weather);
      setWeatherForecast(() => weathercodeConverter(weather.weathercode));
      setLoading(false);

      console.log("reloaded");
    });
  };

  useEffect(() => {
    weatherPainter();
  }, []);

  if (loading)
    return (
      <p className="h-screen w-full flex items-center justify-center">
        L O A D I N G . . .
      </p>
    );

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      This is the current weather in Sri Lanka (Colombo):
      <Card className="py-10 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-evenly">
            <p className="flex justify-center">Temperature:</p>
            <p>{weather.temperature}°C</p>
          </div>
          <div className="w-full flex items-center justify-evenly">
            <p>Forecast:</p>
            <p>{weatherForecast}</p>
          </div>
          <div className="w-full flex items-center justify-evenly">
            <p className="flex justify-center">Wind Direction:</p>
            <p>{weather.winddirection}°</p>
          </div>
          <div className="w-full flex items-center justify-evenly">
            <p className="flex justify-center">Wind Speed:</p>
            <p>{weather.windspeed} Km/h</p>
          </div>
          <div className="w-full flex items-center justify-evenly">
            <p className="flex justify-center">Current Time:</p>
            <p>{weather.time.split("T")[1]}</p>
          </div>
          <div className="flex items-center justify-between">
            <ButtonInput clickHandler={weatherPainter} title="Reload Weather" />
          </div>
        </div>
      </Card>
    </div>
  );
};
