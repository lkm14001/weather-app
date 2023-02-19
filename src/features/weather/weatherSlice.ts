import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { StringLiteral } from "typescript";
import { RootState } from "../../app/store";
import { fetchLocation, fetchWeather } from "./weatherAPI";

export interface Ilocation {
    id:number,
    name:string,
    region:string,
    country:string,
    lat:number,
    lon:number,
}

export interface IParticularDay {
    date:string,
    condition:string,
    max_temp:number,
    min_temp:number,
}

export interface IWeatherForecast {
    location:string,
    condition:string,
    wind_mph:number,
    humidity:number,
    visibility:number,
    air_pressure:number,
    temp:number,
    wind_dir:string,
    forecast:IParticularDay[]
}

export interface weatherState {
    weatherDetails:IWeatherForecast,
    location:Ilocation[],
}

const initialState:weatherState = {
    weatherDetails:{
        location:'kurnool',
        condition:'clear',
        wind_mph:20,
        temp:0,
        humidity:10,
        visibility:2,
        wind_dir:'SE',
        air_pressure:3,
        forecast:[]
    },
    location:[]
}

export const fetchLocationAsync = createAsyncThunk('weather/fetchLocation', async (loc:string)=>{
    const response = await fetchLocation(loc);
    return response;
})

export const fetchWeatherAsync = createAsyncThunk('weather/fetchWeather', async (loc:string) => {
    const response = await fetchWeather(loc);
    return response;
})

const weatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers: {
        setLocation: (state,action) => {
            state.weatherDetails.location = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchWeatherAsync.fulfilled,(state,action) => {
            state.weatherDetails = action.payload;
        })
        builder.addCase(fetchLocationAsync.fulfilled, (state,action) => {
            state.location = action.payload
        })
    }
})

export const selectWeather = (state:RootState) => state.weather.weatherDetails;
export const selectLocation = (state:RootState) => state.weather.location;
export const { setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;