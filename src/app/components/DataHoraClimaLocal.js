import { useState, useEffect } from 'react';
import axios from 'axios';

const DateTimeWeather = () => {
  const [currentDateTime, setCurrentDateTime] = useState(null); // Começa como null
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ city: '', country: '' });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Substitua pela sua chave da API OpenWeather
        const apiKey = '1f0b147914625bcf903990f286f5e2ad';
        const city = 'Brasilia'; // Defina sua cidade aqui
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
        );

        const { data } = response;
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
        setLocation({ city: data.name, country: data.sys.country });
      } catch (error) {
        console.error('Erro ao buscar informações do clima:', error);
      }
    };

    // Atualiza a data e hora somente após o componente ser montado no cliente
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    fetchWeather();

    return () => clearInterval(intervalId);
  }, []);

  // Se a data e hora ainda não estão disponíveis, retorna null (evita renderização no SSR)
  if (!currentDateTime) {
    return null;
  }

  // Formatando data e hora
  const formattedDate = currentDateTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div>
      <p>{location.city}, {location.country}</p>
      <p>Data: {formattedDate}</p>
      <p>Hora: {formattedTime}</p>
      {weather ? (
        <p>Clima: {weather.temp}°C, {weather.description}</p>
      ) : (
        <p>Carregando informações do clima...</p>
      )}
    </div>
  );
};

export default DateTimeWeather;
