import React, { useContext } from 'react';
import { ForecastContext } from '../contexts/index';

const formateTime = (ms: number) => {
  const timestamp = ms * 1000;
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const normalaizedHours = hours < 10 ? `0${hours}` : hours;
  const normalizedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${normalaizedHours}:${normalizedMinutes}`;
};

const Suntime = () => {
  const contextData = useContext(ForecastContext); 
  const time = contextData?.sunTime;
  const formattedTimeSunrise = time?.sunrise ? formateTime(time.sunrise) : 1;
  const formattedTimeSunset = time?.sunrise ? formateTime(time.sunset) : 1;

  return (
    <>
      <div className="sunrise">
        <p>Sunrise</p>
        <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/day/time.svg`} alt='sunrise' />
        <p>
          {formattedTimeSunrise}
        </p>
      </div>
      <div className="sunset">
        <p>Sunset</p>
        <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/day/time.svg`} alt='sunrise' />
        <p>
          {formattedTimeSunset}
        </p>
      </div>
    </>
  );
}

export default Suntime;