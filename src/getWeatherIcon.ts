export type DayOrNight = {
  D: string;
  N: string;
};

export type MapType = {
  Clouds: string;
  Thunderstorm: string;
  Drizzle: string;
  Rain: DayOrNight,
  Snow: string;
  Clear: DayOrNight,
  Mist: string;
  Smoke: string;
  Haze: string;
  Dust: string;
  Fog: string;
  Sand: string;
  Ash: string;
  Squall: string;
  Tornado: string;
};

const map: MapType = {
  Clouds: `${process.env.PUBLIC_URL}/day/clouds.svg`,
  Thunderstorm: `${process.env.PUBLIC_URL}/day/thunderstorm.svg`,
  Drizzle: `${process.env.PUBLIC_URL}/day/drizzle.svg`,
  Rain: {
    D: `${process.env.PUBLIC_URL}/day/rain-day.svg`,
    N: `${process.env.PUBLIC_URL}/day/rain-night.svg`,
  },
  Snow: `${process.env.PUBLIC_URL}/day/snow.svg`,
  Clear: {
    D: `${process.env.PUBLIC_URL}/day/clear-day.svg`,
    N: `${process.env.PUBLIC_URL}/day/clear-night.svg`,
  },
  Mist: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Smoke: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Haze: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Dust: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Fog: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Sand: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Ash: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Squall: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
  Tornado: `${process.env.PUBLIC_URL}/day/atmosphere.svg`,
};

export default map;
