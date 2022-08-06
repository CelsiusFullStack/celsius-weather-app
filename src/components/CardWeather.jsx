import React, { useEffect, useState,} from 'react'
import axios from 'axios'
import Loading from './Loading'

const CardWeather = ({ lat, lon,setIsLoading }) => {
      const [weather, setWeather] = useState()
      const [temperature, setTemperature] = useState()
      const [isCelsius, setIsCelsius] = useState(true)
      const [isLoading, setisLoading] = useState(true)
      const myStyle={ backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZCaJy27xZuzGV_fcl0DUD5T1AclarPeZTKQ&usqp=CAU')",
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      opacity:'80%',
    };
      useEffect(() => {
        if (lat) {
          const apiKey = '649df62fc87ac5fc56fa1cea7a1a2d7d'
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          axios.get(url)
                  .then(res => { 
                        setWeather(res.data)
                        const temp = {
                              celsius:`${Math.trunc(res.data.main.temp -273.15)} °C`,farenheit:`${Math.trunc(res.data.main.temp -273.15) * 1.8 + 32} °F`
                      }
                      setTemperature(temp)
                      setisLoading(false)
                      document.body.style.backgroundImage = "url('https://png.pngtree.com/thumb_back/fh260/back_pic/04/39/71/36584e58be12c25.jpg');"                    
                    })
                    .catch((err) => console.log(err))
        }
  }, [lat, lon])

const handleClick = () => setIsCelsius(!isCelsius) 
      if(isLoading){
        return <Loading/>
      }else{
      return(
        <div className="weather" style={myStyle}>
            <div className="top">
              <div>
                <p className="city">{`${weather?.name} ${weather?.sys.country}`}</p>
                <p className="weather-description">&#34;{weather?.weather[0].description}&#34;</p>
              </div>
              <img className="weather-icon" src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather"></img>
            </div>
            <div className="bottom">
                <p className="temperature">{isCelsius? temperature?.celsius : temperature?.farenheit}</p>
                <div className="details">
                  <div className="parameter-row">
                    <span className="parameter-label">Details</span>
                  </div>
                  <div className="parameter-row">
                    <span className="parameter-label">Wind</span>
                    <span className="parameter-value">{weather?.wind.speed} m/s</span>
                  </div>
                  <div className="parameter-row">
                    <span className="parameter-label">Cloud</span>
                    <span className="parameter-value">{weather?.clouds.all} %</span>
                  </div>
                  <div className="parameter-row">
                    <span className="parameter-label">Pressure</span>
                    <span className="parameter-value">{weather?.main.pressure} hPa</span>
                  </div>
                </div>
            </div>
          <button onClick={handleClick}>{isCelsius ?'Convert °F':'Convert °C'}</button>
        </div>
      )
      }
}
export default CardWeather
