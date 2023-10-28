import { createContext } from 'react';

type ForecastContextType = {
  city: string;
  setCity: (newCity: string) => void,
}

const ForecastContext = createContext<ForecastContextType | null>(null);

export { ForecastContext };
