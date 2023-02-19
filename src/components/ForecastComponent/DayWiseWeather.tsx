import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import clear from "../../assets/images/LightCloud.png";
import sunny from "../../assets/images/sunny.png";
import partlyCloudy from "../../assets/images/partly-cloudy.png";
import sleet from "../../assets/images/Sleet.png";
import cloudy from "../../assets/images/cloudy.png";
import heavyRain from "../../assets/images/HeavyRain.png";
import lightRain from "../../assets/images/LightRain.png";
import thunder from "../../assets/images/Thunderstorm.png";

interface dayWiseWeatherProps {
  day: string;
  condition: string;
  max_temp: number;
  min_temp: number;
}

export const fetchImage = (condition: string) => {
  if (condition === "Clear") {
    return clear;
  } else if (condition === "Sunny") {
    return sunny;
  } else if (condition === "Overcast" || condition === "Cloudy") {
    return cloudy;
  } else if (
    condition === "Mist" ||
    condition === "Patchy sleet possible" ||
    condition === "Light sleet" ||
    condition === "Light sleet showers" ||
    condition === "Light snow showers" ||
    condition === "Moderate snow"
  ) {
    return sleet;
  } else if (
    condition === "Heavy rain" ||
    condition === "Moderate or heavy freezing rain"
  ) {
    return heavyRain;
  } else if (
    condition === "Light rain shower" ||
    condition === "Light showers of ice pellets"
  ) {
    return lightRain;
  } else if (condition.includes("thinder")) {
    return thunder;
  } else {
    return partlyCloudy;
  }
};

const DayWiseWeather = (props: dayWiseWeatherProps) => {
    const date = new Date(props.day).toDateString();

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          width: 180,
          height: 200,
          py: 3,
          backgroundColor: "#1E213A",
          color: "#E7E7EB",
          borderRadius: 4,
        }}
      >
        <Typography>{date}</Typography>
        <Box
          component="img"
          sx={{
            width: 120,
            height: 120,
          }}
          src={fetchImage(props.condition)}
        />
        <Box
          component="div"
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", ml: 3 }}>
            {props.max_temp}&nbsp;&#8451;
          </Typography>
          <Typography sx={{ fontWeight: "bold", mr: 3, color: "#A09FB1  " }}>
            {props.min_temp}&nbsp;&#8451;
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DayWiseWeather;
