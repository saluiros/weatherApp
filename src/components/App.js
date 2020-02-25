import React, { Component } from 'react';
import Header from './Header';
import SearchCity from './SearchCity';
import Weather from './Weather';
import './App.css';
import Footer from './Footer';

const apiKey = 'ef8b35e069be23929dddca3df9e09120';

class App extends Component {
  /* Stan do pobierania wartości dla pogody w danym mieście.
    city przechowuje wrtość wpisaną do formularza
    pozostałe właściwości pobierane są przez fetch z Api Open Weather Map
    error będzie wskazywał czy otrzymaliśmy wyniki z fetch
  */
  state = {
    cityValue: '',
    city: '',
    error: false,
    date: '',
    temperature: '',
    sunrise: '',
    sunset: '',
    pressure: '',
    wind: '',
    clouds: '',
    humidity: ''
  };



  /* Pobieranie wartości wpisywanej do inputa jako state.city */
  handleCityInput = event => {
    this.setState({
      cityValue: event.target.value
    })
  };

  handleCitySubmit = event => {
    event.preventDefault();
    /* Pobieram dane na podstawie tworzonego url, fetch tworzy obietnicę (promiss).
    Rozstrzygnięciem obietnicy może być jej spełnienie lub odrzucenie. 
    Spełnienie oznacza zwrot wyników, czyli wszystko poszło poprawnie (co nie oznacza, że otrzymaliśmy oczekiwany wynik).
    Odrzucenie natomiast kiedy coś poszło niepoprawnie np. błąd w adresie api.  
    Za pomocą ten tworzymy łańcuch, napierw sprawdzam czy przyszła odpowiedź i zwracam dane, potem wyciągam z body jsona.
    W kolejnym then pracuję juz na wynikach.*/
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityValue}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
      .then(resp => {
        if (resp.ok) {
          return resp
        }
        throw Error("Nie udało się pobrać pogody dla wskazanego miasta")
      })
      .then(resp => resp.json())
      .then(result => {
        const dateTime = new Date().toLocaleString;
        this.setState(changeState => ({
          error: false,
          date: dateTime,
          temperature: result.main.temp,
          sunrise: result.sys.sunrise,
          sunset: result.sys.sunset,
          pressure: result.main.pressure,
          wind: result.wind.speed,
          clouds: result.clouds.all,
          humidity: result.main.humidity,
          city: changeState.cityValue
        }))
      })
      .catch(error => {
        console.log(error);
        this.setState(changeState => ({
          error: true,
          city: changeState.cityValue
        }))
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchCity cityValue={this.state.cityValue} cityInput={this.handleCityInput} citySubmit={this.handleCitySubmit} />
        <Weather currentWeather={this.state} />
        <Footer />
      </div>
    );
  }
}

export default App;
