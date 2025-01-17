import Navbar from "./Navbar";
import AboutCard from "./AboutCard";
import { Typography } from '@mui/material';


function About(){
  return (
    <>
      <Navbar/>
      <div> {/* Parent Div */}
        <div> {/* Top Part */}
          <div className = 'flex justify-center mt-1'>
            <Typography variant="h4" sx={{ fontSize: 32}}>Meet the Team</Typography>
          </div>
          <div className = 'flex justify-center mx-7'>
            <p> Job Capyture simplifies and streamlines your job search process with an organized and customizable 
              way to manage applications. We aim to solve the chaos of tracking applications across spreadsheets, 
              emails, and scattered documents by offering a centralized, intuitive platform that visualizes progress 
              and offers an organized method of viewing jobs. Designed for job seekers at all stages, 
              Job Capyture is essential for maintaining clarity and confidence during the often-overwhelming job 
              application journey.</p>
          </div>
        </div> {/* Top End */}
        <div className="grid grid-cols-2 gap-3 p-4"> {/* Grid Parent */}
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
        </div> {/* Grid End */}
        <div className="flex justify-center gap-32"> {/* Bottom Part */}
          <text>Box</text>
          <text>Box</text>
          <text>Box</text>
        </div> {/* Bottom End */}
      </div> {/* Content End */}
    </>
  );
}

export default About;