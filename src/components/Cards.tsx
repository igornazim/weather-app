import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import '../App.css';
import Card from './Card';

type weatherData = {
  "id": 500,
  "main": "Rain",
  "description": "light rain",
  "icon": "10n"
}

type mainweatherData = {
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

interface IweatherPerDay {
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
  weather: weatherData[];
  wind: {speed: number, deg: number, gust: number};
}

// const coll = [10, 10, 10, 10, 10];
const getWeekDay = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

const Cards = () => {
  const [name, setName] = useState('london');
  const [data, setData] = useState<IweatherPerDay[]>()

  useEffect(()=> {
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=ada1ba65089546899569c283f09d47fb&units=metric`);
        const filteredData = data.list.filter((weatherPerDay: IweatherPerDay) => weatherPerDay.dt_txt.includes('15:00:00'));
        console.log(filteredData)
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
  }, [name])

  return (
    <div className="cards">
      {data?.map((weather: IweatherPerDay) => {
        const temp = weather.main.temp;
        const day = getWeekDay(new Date(weather.dt_txt))
        return <Card temp={temp} day={day} key={weather.dt} />
      })}
    </div>
  );
}

export default Cards;
