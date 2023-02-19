import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ImCompass } from "react-icons/im";
import HumidityProgressBar from "./HumidityProgressBar";

interface todayHighlightprops {
  title: string;
  data: number;
  wind_dir?: string;
}

const TodaysHighlights = (props: todayHighlightprops) => {
  return (
    <>
      <Box
        component="div"
        sx={{
          // height: 250,
          py: 5,
          px: 10,
          // width: 400,
          backgroundColor: "#1E213A",
          color: "#E7E7EB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "1.1rem",
          }}
        >
          {props.title}
        </Typography>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            // gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "3.5rem",
            }}
          >
            {props.data}{" "}
          </Typography>
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: "2.5rem",
            }}
          >
            {props.title == "Wind status"
              ? "mph"
              : props.title == "Humidity"
              ? "%"
              : props.title == "Visibility"
              ? "miles"
              : "mb"}
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
          {props.wind_dir && (
            <>
              <ImCompass />
              <Typography
                sx={{
                  color: "#E7E7EB",
                  fontWeight: "bold",
                }}
              >
                {props.wind_dir}
              </Typography>
            </>
          )}
          {props.title === "Humidity" && (
            <HumidityProgressBar humidity={props.data} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default TodaysHighlights;
