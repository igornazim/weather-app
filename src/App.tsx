import { useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';
import MainData from './components/MainData';
import { ForecastContext } from './contexts/index';

const CityProvider = ({ children }: React.PropsWithChildren) => {
  const [city, setCity] = useState('paris');

  return (
    <ForecastContext.Provider value={{ city, setCity }}>
      {children}
    </ForecastContext.Provider>
  );
};

const App = () => {

  return (
    <div className="App">
      <Header />
      <div className="left-column">
        <CityProvider>
          <MainData />
          <Cards />
        </CityProvider>
      </div>
    </div>
  );
}

export default App;
