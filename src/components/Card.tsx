import React, { useContext } from 'react';
import { ForecastContext } from '../contexts/index';

interface ICardProps {
  temp: number;
  day: string;
  icon: string;
}

const Card: React.FC<ICardProps> = (props) => {
  const contextData = useContext(ForecastContext);

  return (
    <div className="card">
      <p>
        {Math.round(props.temp)}{contextData?.tempMetric === 'C' ? '°C' : '°F'}
      </p>
      <img className="weatherIcon" src={props.icon} alt='cloudy' />
      <p>
        {props.day}
      </p>
    </div>
  );
};

export default Card;
