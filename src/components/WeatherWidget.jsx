import { useWeather } from "../api/useWeather";
import "./WeatherWidget.css";

export default function WeatherWidget() {
  const { weather, loading } = useWeather();
  if (loading) return <div className="weather-pill weather-loading">⛅ …</div>;
  if (!weather) return null;
  return (
    <div className="weather-pill" title={`Feels like ${weather.feels}°C — ${weather.description}`}>
      <span className="w-icon">{weather.icon}</span>
      <span className="w-temp">{weather.temp}°C</span>
      <span className="w-city">{weather.city}</span>
    </div>
  );
}
