import { createContext } from 'react';
import { IWeatherData } from '../components/MainData';

export type GeoData = {
  lon?: number;
  lat?: number;
  city?: string;
};

type IconData = {
  'id': 500,
  'main': 'Rain',
  'description': 'light rain',
  'icon': '10n'
};

export type MainweatherData = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
};

export interface IweatherPerDay {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: MainweatherData
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  }
  visibility: number;
  weather: IconData[];
  wind: { speed: number, deg: number, gust: number };
}

type ForecastContextType = {
  geo: GeoData;
  currentWeatherData: IWeatherData | null,
  forecastData: IweatherPerDay[],
  temperatureUnits: string,
  setLocation: (newLocation: GeoData) => void,
  setMetric: (tempMetric: string) => void,
};

const ForecastContext = createContext<ForecastContextType | null>(null);

export { ForecastContext };
