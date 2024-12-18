import React, { useEffect, useRef } from 'react'
import './App.css'
import searchicon from  './Assets/search.png'
import clear from './Assets/clear.png'
import cloud from './Assets/cloud.png'
import drizzle from './Assets/drizzle.png'
import humidity from './Assets/humidity.png'
import wind from './Assets/wind.png'
import { useState } from 'react'



export default function App() {

     const [weatherData,setweatherData] = useState({})
     const inputRef=useRef()



     const  allimages = {
          "01d" :clear,
          "01n" :cloud,
          "02d" :clear,
          "02n" :cloud,
          "03d" :clear,
          "03n" :cloud,
          "04d" :clear,
          "04n" :cloud,
          "05d" :clear,
          "05n" :cloud,
          "06d" :cloud,
          "06n" :cloud,
          "07d" :cloud,
          "07n" :drizzle,
          "08d" :cloud,
          "08n" :drizzle,
          "09d" :cloud,
          "09n" :drizzle,
          "10d" :cloud,
          "10n" :drizzle,
     }

  const search = async (city)=>{
   
     if(city === ""){
          alert("please enter city")
     }

    try {

     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'b70aeaf535f3c63c9d1bbb2a12ee4e99'}`;
     const response = await fetch(url);
     const data = await response.json();
     console.log(data)

     if(response.status > 400){
          alert(data.message)
     }


     const icon = allimages[data.weather[0].icon];

     setweatherData({
           city:data.name,
           temp:data.main.temp,
           humidity:data.main.humidity,
           windSpeed:data.wind.speed,
           image:icon
     })
    } catch (error) {
       
    }
  }


  useEffect(()=>{
       search("sindhanur")
  },[])

console.log(weatherData)

  return (
    <div className='weather'>
         <div className='weather-container'>
               <div className='input-field'>
                  <input ref={inputRef} type="text" placeholder='search-city' required />
                  <img onClick={()=>{search(inputRef.current.value)}} src={searchicon} alt="" />
               </div>

               <div className='weather-info'>
                    <img src={weatherData.image} alt="" />
                    <h1>{weatherData.temp}<sup>o</sup>c</h1>
                    <h3>{weatherData.city}</h3>
               </div>

               <div className='weather-humidity-wind'>
                    <div className='humidity'>
                       <img src={humidity} alt="" />
                       <div className='humidity-range'>
                            <h4>{weatherData.humidity}%</h4>
                            <p>Humidity</p>
                       </div>
                    </div>

                    <div className='wind'>
                    <img src={wind} alt="" />
                       <div className='wind-range'>
                            <h4>{weatherData.windSpeed} km/h</h4>
                            <p>Wind Speed</p>
                       </div>
                    </div>
               </div>
         </div>
    </div>
  )
}
