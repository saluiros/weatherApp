import React from 'react';

const Weather = props => {
    /* Destrukturyzuję dane, żeby łatwiej ich używać */
    const { city, temperature, clouds, pressure, sunrise, sunset, wind, humidity, error } = props.currentWeather;
    let viewWeatherContent = null;

    if (!error && city) {
        /* Zamieniam na czytelną godzinę wschód i zachód słońca, ponieważ pobierana jest w sekundach od 1 stycznia 1970 roku. 
        Mnożę przez 1000, ponieważ zwracany z api obiekt nie zawiera ms, 
        które przetwarza użyta metoda (bez pomnożenia godzina byłaby nieprawidłowa) */
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
        viewWeatherContent = (
            <div>
                <h2>{city}</h2>
                <p>Temperatura: {temperature} &#176;C</p>
                <p>Zachmurzenie: {clouds}%</p>
                <p>Ciśnienie: {pressure} hPa</p>
                <p>Wschód słońca: {sunriseTime}</p>
                <p>Zachód słońca: {sunsetTime}</p>
                <p>Prędkość wiatru: {wind} m/s</p>
                <p>Wilgotność: {humidity}%</p>
            </div>
        )
    }

    return (
        <div className="weather">
            {error ? `Nie udało się pobrać pogody dla wskazanego miasta: ${city}` : viewWeatherContent}

        </div>
    );
}

export default Weather;