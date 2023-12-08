import { useState, useEffect, useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import Cards from './Cards';
import Header from './Header';
import MainData from './MainData';
import Suntime from './Suntime';
import Footer from './Footer';
import { ForecastContext, GeoData, IweatherPerDay } from '../contexts/index';

const WeatherProvider = ({ children }: React.PropsWithChildren) => {
  const [geo, setLocation] = useState<GeoData>({ city: 'paris', lon: 48.8566, lat: 2.3522 });
  const [currentWeatherData, setWeatheerData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [temperatureUnits, setMetric] = useState('C');
  const temperatureQueryParam = temperatureUnits === 'C' ? 'metric' : 'imperial';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lon: longitude, lat: latitude });
      },
      (error) => {
        setLocation({ city: 'paris' });
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
        setWeatheerData(data);
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
        setForecastData(filteredData);
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
    setLocation,
    temperatureUnits,
    setMetric,
  }), [geo, currentWeatherData, setLocation, temperatureUnits, setMetric, forecastData]);

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
