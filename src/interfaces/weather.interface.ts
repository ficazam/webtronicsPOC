export interface iWeather {
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

export const initialWeatherState = {
  temperature: 0,
  time: "",
  weathercode: 0,
  winddirection: 0,
  windspeed: 0,
};
