import React, { useEffect, useState } from 'react';
import Dashboard from './DashBoard';
import SunnyDay from './assets/SunnyDay.mp4'
import RainDay from './assets/RainDay.mp4'
import LightningDay from './assets/LightningDay.mp4'
import CloudDay from './assets/Cloudyday.mp4'
import SnowDay from './assets/SnowDay.mp4'
import MistDay from './assets/MistDay.mp4'
import SquallDay from './assets/SquallDay.mp4'
import Country from './countrys.json'

const App = ()=>{
  const [weatherData, setWeatherData] = useState(null);
  const [coor, setCoor] = useState({lat:0,lon:0})
  const [ video, setVideo] = useState()
  const [error, setError] = useState(false)

  const videos = {
    Clear : SunnyDay,
    Clouds : CloudDay,
    Rain :RainDay,
    Thunderstorm : LightningDay,
    Snow : SnowDay,
    Mist : MistDay,
    Squall : SquallDay
  }

  useEffect(() => {
    const fetchData = async () => {
     
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coor.lat}&lon=${coor.lon}&appid=da55f21e302c0d5ed18708f48de6bd61&units=metric&lang=ES`
          );
          const data = await response.json();
          setWeatherData(data);
          setVideo(videos[data.weather[0].main])
        
        } catch (err) {
          console.log('Error fetching weather data:', err);
        }
    };

    fetchData();
  }, [coor]);

  const handleError = () =>{
  
    setError(!error)
  }

  const handleCountry = (country)=>{
    return Country.filter(e => e.en.includes(country.trim())|| e.es.includes(country.trim()))
  }

  const handleLocation = async (e) => {
    try{
      const loc = e.split(','); 
      const alpha2 = handleCountry(loc[1].trim().charAt(0).toUpperCase() + loc[1].trim().slice(1).toLowerCase())[0].alpha2;
      await getCoordinates({ city: loc[0], alpha2 });
  
    }catch(err){
      handleError()
    }
  
  };

  const getCoordinates = async(loc)=>{
    const url = `https://spott.p.rapidapi.com/places/autocomplete?limit=1&skip=0&country=${loc.alpha2}&q=${loc.city}&type=CITY`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '23bc17bc01msh71ddf1b91b70499p18b334jsn739ffc73673e',
        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      setCoor({lat :result[0].coordinates.latitude, lon:result[0].coordinates.longitude })

    } catch (err) {
      console.error(err);
      handleError()
    }
  }
  return(
    <div className='relative bg-neutral-800 w-screen h-screen'>
      <video src={weatherData&&video} autoPlay loop muted className='absolute inset-0 w-full h-full object-cover'></video>
      
      <div className='relative z-10'>
        <Dashboard handleLocation ={ handleLocation} weather={weatherData} handleError={handleError} error={error}/> 
      </div>
  </div>
  )
}

export default App