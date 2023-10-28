import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import '../App.css';

import map from '../getWeatherIcon';
import { mapType } from '../getWeatherIcon';
import { mainweatherData } from '../components/Cards';

export type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IWeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: mainweatherData;
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
    dust: number; // Не уверен, что это должно быть тут
  };
}

const getIcon = (currentIcon: string, weatherData: IWeatherData) => {
  const dayIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon['D'];
  const nightIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon['N'];
  if (weatherData.weather[0].icon.includes('d')) {
    return typeof currentIcon === 'string' ? currentIcon : dayIcon;
  } if (weatherData.weather[0].icon.includes('n')) {
    return typeof currentIcon === 'string' ? currentIcon : nightIcon;
  }
};

const MainData = () => {
  const [temp, setTemp] = useState(0);
  const [name, setName] = useState('');
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [skyState, setSky] = useState('');
  const [currentIcon, setIcon] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const today = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          error => {
            setLatitude(48.8566);
            setLongitude(2.3522);
            console.error(`Ошибка: ${error.message}`);
          }
        );
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ada1ba65089546899569c283f09d47fb&units=metric`);

        const icon = map[data.weather[0].main as keyof mapType];

        const roundedTemp = Math.round(data.main.temp);
        setTemp(roundedTemp);
        setName(data.name);
        setHumidity(data.main.humidity);
        setWind(Math.round(data.wind.speed));
        setSky(data.weather[0].description);

        const iconUrl = getIcon(icon, data);
        if (iconUrl !== undefined) {
          setIcon(iconUrl);
        }

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
  }, [latitude, longitude]);

  return (
    <>
      <div className="temp-container">
        <div className="geo">
          <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/geo.svg`} alt='geo' />
          <p className="cityName">
            {name}
          </p>
        </div>
        <p className="current-data"> {formattedDate}</p>
        <div className="temp-group">
          <p className="temp">
            {temp}
          </p>
          <sup>°C</sup>
        </div>
        <div className="skyState">
          <img className="weatherIcon" src={currentIcon} alt='cloudy' />
          <p>{skyState}</p>
        </div>
      </div>
      <div className="additional-panel">
        <div className="wind-group">
          <img className="windIcon" src={`${process.env.PUBLIC_URL}/wind.svg`} alt='wind speed' />
          <p>Wind {wind} m/s</p>
        </div>
        <div className="humidity-group">
          <img className="humidityIcon" src={`${process.env.PUBLIC_URL}/hum.svg`} alt='humidity is' />
          <p>Hum {humidity} %</p>
        </div>
      </div>
    </>
  );
  
}

export default MainData;
