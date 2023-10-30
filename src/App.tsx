import { useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';
import MainData from './components/MainData';
import Search from './Search';
import { ForecastContext } from './contexts/index';

const CityProvider = ({ children }: React.PropsWithChildren) => {
  const [city, setCity] = useState('paris');
  console.log(city)

  return (
    <ForecastContext.Provider value={{ city, setCity }}>
      {children}
    </ForecastContext.Provider>
  );
};

const App = () => {

  return (
    <CityProvider>
      <div className="App">
        <Header>
          <Search />
        </Header> 
        <div className="left-column">
          <MainData />
          <Cards />
        </div>
      </div>
    </CityProvider>
  );
}

export default App;
