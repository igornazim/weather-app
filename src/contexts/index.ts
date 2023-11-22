import { createContext } from 'react';
import { IWeatherData } from '../components/MainData';

export type geoData = {
  lon?: number | null;
  lat?: number | null;
  city?: string | null;
}

type sunTime = {
  sunrise: number;
  sunset: number;
}

type ForecastContextType = {
  geo: geoData;
  currentData: IWeatherData | null;
  getData: (newData: geoData) => void,
  sunTime: sunTime | null,
  setTime: (newTime: sunTime) => void,
  tempMetric: string,
  setMetric: (tempMetric: string) => void,
}

const ForecastContext = createContext<ForecastContextType | null>(null);

export { ForecastContext };
