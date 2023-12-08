import { useContext } from 'react';
import { ForecastContext } from '../contexts/index';

interface ICardProps {
  temp: number;
  day: string;
  icon: string;
}

const Card = (props: ICardProps) => {
  const contextData = useContext(ForecastContext);
  const { temp, icon, day } = props;

  return (
    <div className="card">
      <p>
        {Math.round(temp)}
        {contextData?.temperatureUnits === 'C' ? '°C' : '°F'}
      </p>
      <img className="weatherIcon" src={icon} alt="cloudy" />
      <p>
        {day}
      </p>
    </div>
  );
};

export default Card;
