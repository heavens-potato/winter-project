import Navbar from "./Navbar";
import AboutCard from "./AboutCard";
import { display, flexbox } from "@mui/system";

function About(){
  return (
    <>
      <Navbar/>
      <div>
        <div>
          <div>
            <AboutCard name = 'Justin'></AboutCard>
          </div>
          <div>
            <AboutCard name = 'Claire'></AboutCard>
          </div>
        </div>
        <div>
          <div>
            <AboutCard name = 'Stephen' ></AboutCard>
          </div>
          <div>
            <AboutCard name = 'Alexis'></AboutCard>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;