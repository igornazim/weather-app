import { useEffect, useState, useContext } from 'react';

import map from '../getWeatherIcon';
import { MapType, DayOrNight } from '../getWeatherIcon';
import { MainweatherData } from '../components/Cards';
import { ForecastContext } from '../contexts/index';

export type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export interface IWeatherData {
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
  main: MainweatherData;
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
    dust: number;
  };
}

const getIcon = (currentIcon: string | DayOrNight, weatherData: IWeatherData) => {
  const dayIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon.D;
  const nightIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon.N;
  if (weatherData.weather[0].icon.includes('d')) {
    return typeof currentIcon === 'string' ? currentIcon : dayIcon;
  } if (weatherData.weather[0].icon.includes('n')) {
    return typeof currentIcon === 'string' ? currentIcon : nightIcon;
  }
};

const MainData = () => {
  const contextData = useContext(ForecastContext);

  const [temp, setTemp] = useState(0);
  const [name, setName] = useState('');
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [skyState, setSky] = useState('');
  const [currentIcon, setIcon] = useState('');

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        contextData?.setLocation({ lon: longitude, lat: latitude });
      },
      error => {
        contextData?.setLocation({ city: 'paris' });
        console.error(`Ошибка: ${error.message}`);
      },
    );
  }, []);

  useEffect(() => {
    const data = contextData?.currentWeatherData;

    if (data) {
      const icon = map[data.weather[0].main as keyof MapType];

      const roundedTemp = Math.round(data.main.temp);
      setTemp(roundedTemp);
      setName(data.name);
      setHumidity(data.main.humidity);
      const mphToMetersPerSecond = contextData?.temperatureUnits === 'C' ? data.wind.speed : data.wind.speed * 0.44704;
      setWind(Math.round(mphToMetersPerSecond));
      setSky(data.weather[0].description);
      contextData?.setTime({ sunrise: data.sys.sunrise, sunset: data.sys.sunset });
  
      const iconUrl = getIcon(icon, data);
      if (iconUrl !== undefined) {
        setIcon(iconUrl);
      }
    }
  
  }, [location, contextData?.geo, contextData?.currentWeatherData]);

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
          <sup>{contextData?.temperatureUnits === 'C' ? '°C' : '°F'}</sup>
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
  
};

export default MainData;