import Navbar from "./Navbar";
import AboutCard from "./AboutCard";
import { display, flexbox } from "@mui/system";
import { Typography } from '@mui/material';


function About(){
  return (
    <>
      <Navbar/>
      <div>
        <Typography class = 'flex justify-center' variant="h4" sx={{ fontSize: 28, fontWeight: 'bold'}}>Meet the Team</Typography>
        <div class = "flex space-between">
          <div>
            <div>
              <AboutCard name = 'Stephen' ></AboutCard>
            </div>
            <div>
              <AboutCard name = 'Justin'></AboutCard>
            </div>
          </div>
          <div>
            <div>
              <AboutCard name = 'Claire'></AboutCard>
            </div>
            <div>
              <AboutCard name = 'Alexis'></AboutCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;