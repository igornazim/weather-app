import { useContext } from 'react';

import Card from './Card';
import map, { MapType, DayOrNight } from '../getWeatherIcon';
import { ForecastContext, IweatherPerDay } from '../contexts/index';

const getWeekDay = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

const getIcon = (currentIcon: string | DayOrNight, weatherData: IweatherPerDay) => {
  const dayIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon.D;
  const nightIcon = typeof currentIcon === 'string' ? currentIcon : currentIcon.N;
  if (weatherData.weather[0].icon.includes('d')) {
    return typeof currentIcon === 'string' ? currentIcon : dayIcon;
  } return typeof currentIcon === 'string' ? currentIcon : nightIcon;
};

const Cards = () => {
  const contextData = useContext(ForecastContext);
  if (!contextData || !contextData.forecastData) {
    return null;
  }

  return (
    <div className="cards">
      {contextData.forecastData?.map((weather: IweatherPerDay) => {
        const icon = map[weather.weather[0].main as keyof MapType];
        const iconUrl = getIcon(icon, weather);
        const { temp } = weather.main;
        const day = getWeekDay(new Date(weather.dt_txt));
        return <Card temp={temp} day={day} key={weather.dt} icon={iconUrl!} />;
      })}
    </div>
  );
};

export default Cards;
