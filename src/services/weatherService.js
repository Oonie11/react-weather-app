import { DateTime } from "luxon";

const apiKey = "6998bc01d33c7269ddb10c30e43bb556";
const baseUrl = `https://api.openweathermap.org/data/2.5`;

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&
// Lon=2.3488&exclude=current,minutely,hourly,alerts&
// appid=1fa9ff4126d95b8db54f3897a208e91c&units-metric

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=6998bc01d33c7269ddb10c30e43bb556

//FUNCTION TO FETCH URL AND CONVERT from JSON FORMAT to js object
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(baseUrl + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: apiKey });

  return fetch(url).then((res) => res.json());
};

//EXTRACTING THE DATA FROM THE API TO USE,BY DESTRUCTURING
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatforecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

//FUNCTION TO GET THE FORMATTED DATA
const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatforecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;
