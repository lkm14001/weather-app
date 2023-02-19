import { styled } from "@mui/material/styles";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width:200,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#E7E7EB",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#FFEC65",
  },
}));

interface humidityprops { 
  humidity: number;
}
const HumidityProgressBar = (props: humidityprops) => {
  return (
    <>
      <CustomLinearProgress variant="determinate" value={props.humidity} />
    </>
  );
};

export default HumidityProgressBar;
