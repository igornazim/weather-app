import { useEffect, useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import Card from './Card';
import map from '../getWeatherIcon';
import { mapType } from '../getWeatherIcon';
import { ForecastContext } from '../contexts/index';

type iconData = {
  "id": 500,
  "main": "Rain",
  "description": "light rain",
  "icon": "10n"
}

export type mainweatherData = {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
}

export interface IweatherPerDay {
  clouds: {all: number};
  dt: number;
  dt_txt: string;
  main: mainweatherData
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  }
  visibility: number;
  weather: iconData[];
  wind: {speed: number, deg: number, gust: number};
}

const getWeekDay = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

const getIcon = (currentIcon: string, weatherData: IweatherPerDay) => {
  const dayIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon['D'];
  const nightIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon['N'];
  if (weatherData.weather[0].icon.includes('d')) {
    return typeof currentIcon === 'string' ? currentIcon : dayIcon;
  } if (weatherData.weather[0].icon.includes('n')) {
    return typeof currentIcon === 'string' ? currentIcon : nightIcon;
  }
};

const Cards = () => {
  const contextData = useContext(ForecastContext);
  const [data, setData] = useState<IweatherPerDay[]>()
  const tempQueryParam = contextData?.tempMetric === 'C' ? 'metric' : 'imperial';

  useEffect(()=> {
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${contextData?.currentData?.name}&appid=ada1ba65089546899569c283f09d47fb&units=${tempQueryParam}&timezone=7200`);
        const filteredData = data.list.filter((weatherPerDay: IweatherPerDay) => weatherPerDay.dt_txt.includes('12:00:00'));
        setData(filteredData);
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
  }, [contextData])

  return (
    <div className="cards">
      {data?.map((weather: IweatherPerDay) => {
        const icon = map[weather.weather[0].main as keyof mapType];
        const iconUrl = getIcon(icon, weather);
        const temp = weather.main.temp;
        const day = getWeekDay(new Date(weather.dt_txt))
        return <Card temp={temp} day={day} key={weather.dt} icon={iconUrl!} />
      })}
    </div>
  );
}

export default Cards;
