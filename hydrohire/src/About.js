import Navbar from "./Navbar";
import AboutCard from "./AboutCard";

function About(){
  return (
    <>
      <Navbar/>
      <div>
        <div>
          <AboutCard name = 'Justin'></AboutCard>
          <AboutCard name = 'Claire'></AboutCard>
        </div>
        <div>
          <AboutCard name = 'Stephen'></AboutCard>
          <AboutCard name = 'Alexis'></AboutCard>
        </div>
      </div>
    </>
  );
}

export default About;