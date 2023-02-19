import { useEffect } from "react";
import ForecastComponent from "./components/ForecastComponent/ForecastComponent";
import Box from "@mui/material/Box";
import TodayWeatherComponent from "./components/TodayWeatherComponent/TodayWeatherComponent";

const App = () => {
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection:{
            xs:'column',
            md:'row'
          }
        }}
      >
        <Box
          component="div"
          sx={{
            width: {
              // xs:
              md:"25vw",
            },
            minHeight:{
              // xs:"25vh",
              md:"100vh"
            },
          }}
        >
          <TodayWeatherComponent />
        </Box>
        <ForecastComponent />
      </Box>
    </>
  );
};

export default App;
