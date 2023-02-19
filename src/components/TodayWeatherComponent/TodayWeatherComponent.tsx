import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdGpsFixed, MdLocationPin } from "react-icons/md";
import { fetchImage } from "../ForecastComponent/DayWiseWeather";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchLocationAsync,
  fetchWeatherAsync,
  selectLocation,
  selectWeather,
  setLocation,
} from "../../features/weather/weatherSlice";
import TextField from "@mui/material/TextField";

const TodayWeatherComponent = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector(selectWeather);
  const locations = useAppSelector(selectLocation);

  const today = new Date().toISOString().slice(0, 10);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loc, setLoc] = useState<string>("");

  const locationhandler = () => {
    dispatch(fetchLocationAsync(loc));
  };

  const weatherHandler = () => {
    dispatch(fetchWeatherAsync(loc));
    setIsOpen(!isOpen);
  };

  const locationSearchValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoc(e.target.value);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setIsOpen(open);
    };

  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#1e213a",
          minHeight: {
            xs: "90vh",
            md: "100vh",
          },
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Button
            sx={{
              backgroundColor: "#6E707A",
              color: "white",
            }}
            onClick={toggleDrawer(true)}
          >
            Search for Places
          </Button>
          <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer(false)}
            sx={{
              ".MuiDrawer-paperAnchorLeft": {
                height: {
                  xs: "90vh",
                  md: "100vh",
                },
              },
              ".MuiDrawer-paper": {
                backgroundColor: "#1e213a",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100vw",
                  md: "25vw",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                gap: 5,
                marginTop: "10%",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <TextField
                  id="location"
                  label="Enter Location"
                  value={loc}
                  sx={{
                    input:{
                        color:'white'
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  onChange={locationSearchValueHandler}
                />
                <Button
                  sx={{
                    backgroundColor: "#3c47e9",
                    color: "white",
                  }}
                  onClick={locationhandler}
                >
                  Search
                </Button>
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {locations.map((ele: any, key: any) => (
                  <Box
                    component="div"
                    sx={{
                      border: "1px solid #616475",
                      px: 3,
                      py: 3,
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      gap: 5,
                      justifyContent: "space-between",
                    }}
                    key={key}
                    onClick={weatherHandler}
                  >
                    <Typography>{ele.name}</Typography>
                    <Typography>{">"}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Drawer>
          <IconButton
            sx={{
              backgroundColor: "#6E707A",
              color: "white",
            }}
          >
            <MdGpsFixed />
          </IconButton>
        </Box>
        <Box
          component="img"
          sx={{
            width: {
              xs: 150,
              md: 300,
            },
            minHeight: {
              xs: 150,
              md: 300,
            },
          }}
          src={fetchImage(weather.condition)}
        />
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "7rem",
              color: "#E7E7EB",
            }}
          >
            {weather.temp}
          </Typography>
          <Typography
            sx={{
              color: "#A09FB1",
              fontSize: "4rem",
            }}
          >
            &#8451;
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            color: "#A09FB1",
            fontSize: "2.5rem",
          }}
        >
          {weather.condition}
        </Typography>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#88869D",
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Today</Typography>
          <Typography sx={{ fontWeight: 700 }}>.</Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {new Date(today).toDateString()}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              color: "#88869D",
            }}
          >
            <MdLocationPin />
          </IconButton>
          <Typography sx={{ fontWeight: 600, color: "#88869D" }}>
            {weather.location}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default TodayWeatherComponent;
