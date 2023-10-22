import React from 'react';
import '../App.css';

interface ICardProps {
  temp: number;
  day: string;
}

const Card: React.FC<ICardProps> = (props) => {

  return (
    <div className="card">
      <div>
        <p>
          {Math.round(props.temp)}°C
        </p>
        <img className="weatherIcon" src={`${process.env.PUBLIC_URL}/cloudy.svg`} alt='cloudy' />
        <p>
          {props.day}
        </p>
      </div>
    </div>
  );
}

export default Card;
