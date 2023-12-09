/* eslint-disable indent */
import { useReducer, useEffect, useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import Cards from './Cards';
import Header from './Header';
import MainData from './MainData';
import Suntime from './Suntime';
import Footer from './Footer';
import { ForecastContext, GeoData, IweatherPerDay } from '../contexts/index';

interface IFullWeatherData {
  geo: { city: string, lon: number, lat: number },
  currentWeatherData: null,
  forecastData: null,
  temperatureUnits: string,
}

const actions = {
  set_geo: 'set_geo',
  set_weather_data: 'set_weather_data',
  set_forecast_data: 'set_forecast_data',
  set_metric: 'set_metric',
};

const weatherReducer = (state: IFullWeatherData, action: any) => {
  switch (action.type) {
    case actions.set_geo:
      return { ...state, geo: action.payload };
    case actions.set_weather_data:
      return { ...state, currentWeatherData: action.payload };
    case actions.set_forecast_data:
      return { ...state, forecastData: action.payload };
    case actions.set_metric:
      return { ...state, temperatureUnits: action.payload };
    default:
      return state;
  }
};

const WeatherProvider = ({ children }: React.PropsWithChildren) => {
  const initialState = {
    geo: { city: 'paris', lon: 48.8566, lat: 2.3522 },
    currentWeatherData: null,
    forecastData: [],
    temperatureUnits: 'C',
  };
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const {
    geo, currentWeatherData, forecastData, temperatureUnits,
  } = state;

  const temperatureQueryParam = temperatureUnits === 'C' ? 'metric' : 'imperial';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch({ type: actions.set_geo, payload: { lon: longitude, lat: latitude } });
      },
      (error) => {
        dispatch({ type: actions.set_geo, payload: { city: 'paris' } });
        console.error(`Ошибка: ${error.message}`);
      },
    );
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
        apiUrl.searchParams.append('appid', 'ada1ba65089546899569c283f09d47fb');
        apiUrl.searchParams.append('units', temperatureQueryParam);
        apiUrl.searchParams.append('timezone', '7200');

        if (geo.city) {
          apiUrl.searchParams.append('q', geo.city);
        } else if (geo.lat !== undefined && geo.lon !== undefined) {
          apiUrl.searchParams.append('lat', geo.lat.toString());
          apiUrl.searchParams.append('lon', geo.lon.toString());
        }

        const url = apiUrl.toString();
        const { data } = await axios.get(url);
        dispatch({ type: actions.set_weather_data, payload: data });
      } catch (err) {
        console.log(err);
        if (!(err instanceof AxiosError)) {
          return;
        } if (err.response && err.response.status === 401) {
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    };
    fetchWeatherData();
  }, [geo, temperatureQueryParam]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const apiUrl = new URL('https://api.openweathermap.org/data/2.5/forecast');
        apiUrl.searchParams.append('appid', 'ada1ba65089546899569c283f09d47fb');
        apiUrl.searchParams.append('units', temperatureQueryParam);
        apiUrl.searchParams.append('timezone', '7200');

        if (geo.city) {
          apiUrl.searchParams.append('q', geo.city);
        } else if (geo.lat !== undefined && geo.lon !== undefined) {
          apiUrl.searchParams.append('lat', geo.lat.toString());
          apiUrl.searchParams.append('lon', geo.lon.toString());
        }

        const url = apiUrl.toString();
        const { data } = await axios.get(url);
        const filteredData = data.list.filter((weatherPerDay: IweatherPerDay) => weatherPerDay.dt_txt.includes('12:00:00'));
        dispatch({ type: actions.set_forecast_data, payload: filteredData });
      } catch (err) {
        console.log(err);
        if (!(err instanceof AxiosError)) {
          return;
        } if (err.response && err.response.status === 401) {
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    };
    fetchForecastData();
  }, [geo, temperatureQueryParam]);

  const contextValue = useMemo(() => ({
    geo,
    currentWeatherData,
    forecastData,
    temperatureUnits,
    setLocation: (newGeo: GeoData) => dispatch({ type: actions.set_geo, payload: newGeo }),
    setMetric: (tempMetric: string) => dispatch({ type: actions.set_metric, payload: tempMetric }),
  }), [geo, currentWeatherData, temperatureUnits, forecastData]);

  return (
    <ForecastContext.Provider value={contextValue}>
      {children}
    </ForecastContext.Provider>
  );
};

const App = () => (
  <WeatherProvider>
    <div className="app">
      <Header />
      <div className="main">
        <div className="left-column">
          <MainData />
          <Cards />
        </div>
        <div className="right-column">
          <Suntime />
        </div>
      </div>
      <Footer />
    </div>
  </WeatherProvider>
);

export default App;
