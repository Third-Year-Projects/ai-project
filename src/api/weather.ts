const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const LOCATION = 'Accra,GH';

export const getWeatherData = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=metric&appid=${WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();

    const isGoodWeather = (temp: number, humidity: number): boolean => {
      // Optimal conditions for most crops in Ghana
      return temp >= 20 && temp <= 35 && humidity >= 40 && humidity <= 80;
    };

    return {
      condition: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      isGood: isGoodWeather(data.main.temp, data.main.humidity),
      location: data.name
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return {
      condition: "Unknown",
      temperature: 25,
      humidity: 60,
      description: "Weather data unavailable",
      isGood: true,
      location: "Accra"
    };
  }
};