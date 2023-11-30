import { createContext } from 'react';
import { IWeatherData } from '../components/MainData';

export type GeoData = {
  lon?: number;
  lat?: number;
  city?: string;
};

type SunTime = {
  sunrise: number;
  sunset: number;
};

type ForecastContextType = {
  geo: GeoData;
  currentData: IWeatherData | null;
  getData: (newData: GeoData) => void,
  sunTime: SunTime | null,
  setTime: (newTime: SunTime) => void,
  tempMetric: string,
  setMetric: (tempMetric: string) => void,
};

const ForecastContext = createContext<ForecastContextType | null>(null);

export { ForecastContext };
