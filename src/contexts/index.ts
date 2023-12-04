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
  currentWeatherData: IWeatherData | null;
  setLocation: (newLocation: GeoData) => void,
  sunTime: SunTime | null,
  setTime: (newTime: SunTime) => void,
  temperatureUnits: string,
  setMetric: (tempMetric: string) => void,
};

const ForecastContext = createContext<ForecastContextType | null>(null);

export { ForecastContext };
