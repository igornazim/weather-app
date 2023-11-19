import { useState, useEffect } from 'react';
import Cards from './Cards';
import Header from './Header';
import MainData from './MainData';
import Suntime from './Suntime';
import Footer from './Footer';
import { ForecastContext } from '../contexts/index';
import axios, { AxiosError } from 'axios';
import { geoData } from '../contexts/index';

const CityProvider = ({ children }: React.PropsWithChildren) => {
  const [geo, getData] = useState<geoData>({ city: 'paris', lon: 48.8566, lat: 2.3522 });
  const [currentData, setData] = useState(null);
  const [sunTime, setTime] = useState({sunrise: 1700283090, sunset: 1700315928});

  const url = geo.city
    ? `https://api.openweathermap.org/data/2.5/weather?q=${geo.city}&appid=ada1ba65089546899569c283f09d47fb&units=metric&timezone=7200`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=ada1ba65089546899569c283f09d47fb&units=metric&timezone=7200`;


  useEffect(()=> {
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        console.log(err)
        if (!(err instanceof AxiosError)) {
          return;
        } if (err.response && err.response.status === 401) {
          return;
        }
      }
    } 
    fetchWeatherData();
  }, [geo])


  return (
    <ForecastContext.Provider value={{ geo, currentData, getData, sunTime, setTime }}>
      {children}
    </ForecastContext.Provider>
  );
};

const App = () => {

  return (
    <CityProvider>
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
    </CityProvider>
  );
}

export default App;
