import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { fontWeight } from "@mui/system";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchWeatherAsync,
  selectWeather,
} from "../../features/weather/weatherSlice";
import DayWiseWeather from "./DayWiseWeather";
import TodaysHighlights from "./TodaysHighlights";

const ForecastComponent = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector(selectWeather);

  // useEffect(() => {
  //   dispatch(fetchWeatherAsync('visakhapatnam'));
  // }, []);

  return (
    <>
      <Box
        component="div"
        sx={{
          width: {
            xs:"100vw",
            md:"75vw"
          },
          minHeight:'100vh',
          justifyContent: "space-around",
          gap: 7,
          backgroundColor: "#100e1d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs:"repeat(1,1fr)",
              md:"repeat(3,1fr)",
            },
            gap: 5,
            mt: 4,
          }}
        >
          {weather.forecast.map((ele: any, key: any) => (
            <DayWiseWeather
              condition={ele.condition}
              day={ele.date}
              max_temp={ele.max_temp}
              min_temp={ele.min_temp}
            />
          ))}
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Today's Highlights
          </Typography>
          <Box
            component="div"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                md: "repeat(2,1fr)",
                xs: "repeat(1,1fr)",
              },
              gap: 4,
            }}
          >
            <TodaysHighlights
              title="Wind status"
              data={weather.wind_mph}
              wind_dir={weather.wind_dir}
            />
            <TodaysHighlights title="Humidity" data={weather.humidity} />
            <TodaysHighlights title="Visibility" data={weather.visibility} />
            <TodaysHighlights
              title="Air Pressure"
              data={weather.air_pressure}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForecastComponent;
