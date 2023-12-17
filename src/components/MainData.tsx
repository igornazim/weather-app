import map, { MapType, DayOrNight } from '../getWeatherIcon';
import { MainweatherData } from '../contexts/index';
import useForecast from '../hooks/useForecast';

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
  } return typeof currentIcon === 'string' ? currentIcon : nightIcon;
};

const MainData = () => {
  const contextData = useForecast();
  if (!contextData || !contextData.currentWeatherData) {
    return null;
  }
  const data = contextData.currentWeatherData;
  const {
    name, wind: { speed }, main: { temp, humidity }, weather,
  } = data;
  const icon = map[weather[0].main as keyof MapType];
  const iconUrl = getIcon(icon, data!);
  const mphToMetersPerSecond = contextData.temperatureUnits === 'C' ? speed : speed * 0.44704;

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <div className="temp-container">
        <div className="geo">
          <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/geo.svg`} alt="geo" />
          <p className="cityName">
            {name}
          </p>
        </div>
        <p className="current-data">
          {' '}
          {formattedDate}
        </p>
        <div className="temp-group">
          <p className="temp">
            {Math.round(temp)}
          </p>
          <sup>{contextData.temperatureUnits === 'C' ? '°C' : '°F'}</sup>
        </div>
        <div className="skyState">
          <img className="weatherIcon" src={iconUrl} alt="cloudy" />
          <p>{weather[0].description}</p>
        </div>
      </div>
      <div className="additional-panel">
        <div className="wind-group">
          <img className="windIcon" src={`${process.env.PUBLIC_URL}/wind.svg`} alt="wind speed" />
          <p>
            Wind
            {' '}
            {Math.round(mphToMetersPerSecond)}
            {' '}
            m/s
          </p>
        </div>
        <div className="humidity-group">
          <img className="humidityIcon" src={`${process.env.PUBLIC_URL}/hum.svg`} alt="humidity is" />
          <p>
            Hum
            {' '}
            {humidity}
            {' '}
            %
          </p>
        </div>
      </div>
    </>
  );
};

export default MainData;
