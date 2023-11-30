import { useEffect, useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import Card from './Card';
import map from '../getWeatherIcon';
import { MapType, DayOrNight } from '../getWeatherIcon';
import { ForecastContext } from '../contexts/index';

type IconData = {
  'id': 500,
  'main': 'Rain',
  'description': 'light rain',
  'icon': '10n'
};

export type MainweatherData = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
};

export interface IweatherPerDay {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: MainweatherData
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  }
  visibility: number;
  weather: IconData[];
  wind: { speed: number, deg: number, gust: number };
}

const getWeekDay = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

const getIcon = (currentIcon: string | DayOrNight, weatherData: IweatherPerDay) => {
  const dayIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon.D;
  const nightIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon.N;
  if (weatherData.weather[0].icon.includes('d')) {
    return typeof currentIcon === 'string' ? currentIcon : dayIcon;
  } if (weatherData.weather[0].icon.includes('n')) {
    return typeof currentIcon === 'string' ? currentIcon : nightIcon;
  }
};

const Cards = () => {
  const contextData = useContext(ForecastContext);
  const [currentData, setData] = useState<IweatherPerDay[]>();
  const tempQueryParam = contextData?.tempMetric === 'C' ? 'metric' : 'imperial';

  const apiUrl = new URL('https://api.openweathermap.org/data/2.5/forecast');
  apiUrl.searchParams.append('appid', 'ada1ba65089546899569c283f09d47fb');
  apiUrl.searchParams.append('units', tempQueryParam);
  apiUrl.searchParams.append('timezone', '7200');

  if (contextData?.currentData?.name) {
    apiUrl.searchParams.append('q', contextData.currentData.name);
  }

  const url = apiUrl.toString();

  useEffect(()=> {
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get(url);
        const filteredData = data.list.filter((weatherPerDay: IweatherPerDay) => weatherPerDay.dt_txt.includes('12:00:00'));
        setData(filteredData);
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
  }, [contextData]);

  return (
    <div className="cards">
      {currentData?.map((weather: IweatherPerDay) => {
        const icon = map[weather.weather[0].main as keyof MapType];
        const iconUrl = getIcon(icon, weather);
        const temp = weather.main.temp;
        const day = getWeekDay(new Date(weather.dt_txt));
        return <Card temp={temp} day={day} key={weather.dt} icon={iconUrl!} />;
      })}
    </div>
  );
};

export default Cards;
