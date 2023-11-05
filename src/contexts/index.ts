import { createContext } from 'react';
import { IWeatherData } from '../components/MainData';

export type geoData = {
  lon?: number | null;
  lat?: number | null;
  city?: string | null;
}

type ForecastContextType = {
  geo: geoData;
  currentData: IWeatherData | null;
  getData: (newData: geoData) => void,
}

const ForecastContext = createContext<ForecastContextType | null>(null);

export { ForecastContext };
