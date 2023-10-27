import React from 'react';
import '../App.css';

interface ICardProps {
  temp: number;
  day: string;
  icon: string;
}

const Card: React.FC<ICardProps> = (props) => {

  return (
    <div className="card">
      <p>
        {Math.round(props.temp)}°C
      </p>
      <img className="weatherIcon" src={props.icon} alt='cloudy' />
      <p>
        {props.day}
      </p>
    </div>
  );
}

export default Card;
