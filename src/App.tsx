import { useContext } from 'react';
import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';
import MainData from './components/MainData';
import { ForecastContext } from './contexts/index';

const App = () => {
  const name = useContext(ForecastContext);

  return (
    <ForecastContext.Provider value={ name }>
      <div className="App">
        <Header />
        <div className="left-column">
          <MainData />
          <Cards />
        </div>
      </div>
    </ForecastContext.Provider>
  );
}

export default App;
