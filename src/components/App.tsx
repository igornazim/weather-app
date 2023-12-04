import { useState, useEffect } from 'react';
import Cards from './Cards';
import Header from './Header';
import MainData from './MainData';
import Suntime from './Suntime';
import Footer from './Footer';
import { ForecastContext } from '../contexts/index';
import axios, { AxiosError } from 'axios';
import { GeoData } from '../contexts/index';

const WeatherProvider = ({ children }: React.PropsWithChildren) => {
  const [geo, setLocation] = useState<GeoData>({ city: 'paris', lon: 48.8566, lat: 2.3522 });
  const [currentWeatherData, setData] = useState(null);
  const [sunTime, setTime] = useState({ sunrise: 1700283090, sunset: 1700315928 });
  const [temperatureUnits, setMetric] = useState('C');
  const temperatureQueryParam = temperatureUnits === 'C' ? 'metric' : 'imperial';

  useEffect(()=> {
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
        setData(data);
      } catch (err) {
        console.log(err);
        if (!(err instanceof AxiosError)) {
          return;
        } if (err.response && err.response.status === 401) {
          return;
        }
      }
    }; 
    fetchWeatherData();
  }, [geo]);


  return (
    <ForecastContext.Provider
      value=
        {{
          geo,
          currentWeatherData,
          setLocation,
          sunTime,
          setTime,
          temperatureUnits,
          setMetric,
        }}
    >
      {children}
    </ForecastContext.Provider>
  );
};

const App = () => {

  return (
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
};

export default App;
