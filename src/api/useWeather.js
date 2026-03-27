import { useState, useEffect } from "react";
const OWM_KEY     = import.meta.env.VITE_OWM_API_KEY || "";
const BASE        = "https://api.openweathermap.org/data/2.5/weather";

// Fallback location (New Delhi) if geolocation fails
const DEFAULT_LAT = 28.6139;
const DEFAULT_LON = 77.2090;

function weatherIcon(code) {
  if (code >= 200 && code < 300) return "⛈️";  // thunderstorm
  if (code >= 300 && code < 400) return "🌦️";  // drizzle
  if (code >= 500 && code < 600) return "🌧️";  // rain
  if (code >= 600 && code < 700) return "❄️";  // snow
  if (code >= 700 && code < 800) return "🌫️";  // atmosphere (fog, dust, etc.)
  if (code === 800)               return "☀️";  // clear sky
  if (code > 800)                 return "⛅";  // clouds
  return "🌡️"; // fallback
}

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // prevents state update after unmount
    // Fetch weather using lat/lon
    async function fetch_weather(lat, lon) {
      // If API key missing → just stop loading
      if (!OWM_KEY) { 
        setLoading(false); 
        return; 
      }
      try {
        const res  = await fetch(
          `${BASE}?lat=${lat}&lon=${lon}&appid=${OWM_KEY}&units=metric`
        );
        const data = await res.json();
        // Only update state if component is still mounted
        if (!cancelled) {
          setWeather({
            city:        data.name,
            temp:        Math.round(data.main?.temp),
            feels:       Math.round(data.main?.feels_like),
            description: data.weather?.[0]?.description,
            icon:        weatherIcon(data.weather?.[0]?.id || 800),
          });
        }

      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (!navigator.geolocation) {
      fetch_weather(DEFAULT_LAT, DEFAULT_LON);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => 
        fetch_weather(pos.coords.latitude, pos.coords.longitude),
      () => 
        fetch_weather(DEFAULT_LAT, DEFAULT_LON),

      { timeout: 5000 }
    );

    // Cleanup → prevents React warnings
    return () => { cancelled = true; };

  }, []);

  return { weather, loading };
}