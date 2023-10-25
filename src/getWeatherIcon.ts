type dynamicKeysObject = {
  [key in 'Mist' | 'Smoke' | 'Haze' | 'Dust' | 'Fog' | 'Sand' | 'Dust' | 'Ash' | 'Squall' | 'Tornado']: string;
};

export type mapType = {
  Clouds: string;
  Thunderstorm: string;
  Drizzle: string;
  Rain: {
    D: string;
    N: string;
  };
  Snow: string;
  Clear: {
    D: string;
    N: string;
  };
} | dynamicKeysObject;

const map: mapType = {
  Clouds: `${process.env.PUBLIC_URL}/day/clouds.svg`,
  Thunderstorm: `${process.env.PUBLIC_URL}/day/thunderstorm.svg`,
  Drizzle: `${process.env.PUBLIC_URL}/day/drizzle".svg`,
  Rain: {
    D: `${process.env.PUBLIC_URL}/day/rain-day.svg`,
    N: `${process.env.PUBLIC_URL}/day/rain-night.svg`,
  },
  Snow: `${process.env.PUBLIC_URL}/day/snow.svg`,
  Clear: {
    D: `${process.env.PUBLIC_URL}/day/clear-day.svg`,
    N: `${process.env.PUBLIC_URL}/day/clear-night.svg`,
  },
}

export default map;