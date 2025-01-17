import Navbar from "./Navbar";
import AboutCard from "./AboutCard";
import { display, flexbox } from "@mui/system";
import { Typography } from '@mui/material';


function About(){
  return (
    <>
      <Navbar/>
      <div>
        <Typography className = 'flex justify-center' variant="h4" sx={{ fontSize: 28}}>Meet the Team</Typography>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-3">
            <div>
              <AboutCard name = 'Stephen Wu' ></AboutCard>
            </div>
            <div>
              <AboutCard name = 'Justin Glazer'></AboutCard>
            </div>
          </div>
          <div className="grid gap-3">
            <div>
              <AboutCard name = 'Claire Chen'></AboutCard>
            </div>
            <div>
              <AboutCard name = 'Alexis Giobbi'></AboutCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;