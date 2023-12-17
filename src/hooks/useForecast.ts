import { useContext } from 'react';

import { ForecastContext } from '../contexts/index';

const useForecast = () => useContext(ForecastContext);

export default useForecast;
