import axios from "axios";
import { Ilocation, IParticularDay, IWeatherForecast } from "./weatherSlice";

export const fetchLocation = (loc:string) => {
  return new Promise<Ilocation[]>((resolve, reject) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/search.json",
      params: { q: loc },
      headers: {
        "X-RapidAPI-Key": "e8520cd94emsh04c9ba7a3a3eac9p1c5a61jsn239fb4c5b7ef",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        let location: Ilocation[] = [];
        response.data.forEach((ele: any) => {
          const obj: Ilocation = {
            id: ele.id,
            name: ele.name,
            region: ele.region,
            country: ele.country,
            lat: ele.lat,
            lon: ele.lon,
          };
          location.push(obj);
        });
        resolve(location);
      })
      .catch((err) => reject(err));
  });
};

export const fetchWeather = (loc:string) => {
  return new Promise<IWeatherForecast>((resolve, reject) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: loc, days: "5" },
      headers: {
        "X-RapidAPI-Key": "e8520cd94emsh04c9ba7a3a3eac9p1c5a61jsn239fb4c5b7ef",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    axios.request(options).then((response) => {
        let days:IParticularDay[] = [];
        response.data['forecast'].forecastday.map((ele:any) => {
            const obj:IParticularDay = {
                date:ele.date,
                condition:ele.day.condition['text'],
                max_temp:ele.day.maxtemp_c,
                min_temp:ele.day.mintemp_c,
            }
            days.push(obj);
        })
        let forecast:IWeatherForecast = {
          location:response.data['location'].name,
            condition:response.data['current'].condition.text,
            wind_mph:response.data['current'].wind_mph,
            humidity:response.data['current'].humidity,
            visibility:response.data['current'].vis_miles,
            temp:response.data['current'].temp_c,
            wind_dir:response.data['current'].wind_dir,
            air_pressure:response.data['current'].pressure_mb,
            forecast:days,
        };
        resolve(forecast)
    });
  });
};
