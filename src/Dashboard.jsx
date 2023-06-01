import React from 'react'
import { BsThermometerHalf, BsSearch,BsThermometerSnow,BsThermometerSun } from "react-icons/bs";


const Dashboard = ({handleLocation, weather, handleError, error}) => {
    const handleSearch = ()=>{
        const text = document.getElementById('location').value
        handleLocation(text)
    }

    const handleEnter = (e)=>{
        if (e.key === "Enter") {
            handleSearch()
        }
    }
    

    return (
        
        <div className="flex justify-center align-middle p-10">
            <div className='bg-neutral-900 bg-opacity-50 p-10 rounded-2xl'>
                <div className='flex justify-center px-5 '>
                    <BsThermometerHalf size={28} fill='#FFFFFF'/>
                    <input
                        type="text"
                        id="location"
                        placeholder='Ciudad, pais'
                        className='w-[50%] bg-transparent border-b-4 border-neutral-200 focus:outline-none text-white mx-2 text-center'
                        onKeyDown={handleEnter}
                    />
                    <button className='bg-neutral-100 opacity-50 transition-all duration-150 hover:opacity-100 px-4 mx-5 rounded-2xl'><BsSearch size={20} fill='#FFF00' onClick={()=>handleSearch()}/></button>
                    
                </div>
                {
                    error && 
                    <div className='mt-10 bg-red-500 bg-opacity-50 p-4 rounded-2xl cursor-pointer transition-all duration-150 hover:bg-opacity-90 animate-bounce' onClick={()=>handleError()}>
                        <h4 className='text-center font-medium text-neutral-200'>Error al encontrar ciudad</h4>
                        
                    </div>
                }
                
                <div className='mt-10'>
                    <h1 className='text-center text-7xl text-neutral-200'>{weather&&Math.round(weather.main.temp)}°</h1>
                    <span className='align-middle items-center flex justify-center mt-5 text-neutral-200'>{weather&&weather.weather[0].description}</span>
                </div>
                <div className='flex justify-center mt-5'>
                    <div className='mx-5 inline-flex'>
                        <div className='flex'>
                            <BsThermometerSnow size={35} fill='#FFFF'/><label className='text-neutral-200 text-3xl px-2'>{weather&& Math.round(weather.main.temp_min)}°</label>
                           
                        </div>
                        
                    </div>
                    <div className='mx-5 inline-flex'>
                        <BsThermometerSun size={35} fill='#FFFF'/><label className='text-neutral-200 text-3xl px-2'>{weather&& Math.round(weather.main.temp_max)}°</label>
                    </div>
                    
                </div>
                <div className='flex justify-center mt-10'>
                    <table class="table-auto border-separate border-spacing-3">
                        <tbody className='text-neutral-200'>
                            <tr>
                                <td>Viento</td>
                                <td>{weather&& weather.wind.speed} km/h</td>
                                
                            </tr>
                            <tr>
                                <td>Humedad</td>
                                <td>{weather&& weather.main.humidity} %</td>
                            </tr>
                            <tr>
                                <td>Presión</td>
                                <td>{weather&& weather.main.pressure}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='lg:flex lg:justify-between mt-10'>
                    <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className='block text-sm text-neutral-500 transition duration-200 hover:text-neutral-300'>Openweathermap</a>
                    <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className='block text-sm text-neutral-500 transition duration-200 hover:text-neutral-300'>Angel Magaquian</a>
                    <a href="https://rapidapi.com/Spott/api/spott" target="_blank" rel="noopener noreferrer" className='block text-sm text-neutral-500 transition duration-200 hover:text-neutral-300'>RapidApi</a>
                </div>
            </div>
            
        </div>
          
    )
}

export default Dashboard