import Navbar from "./Navbar";
import AboutCard from "./AboutCard";

function About(){
  return (
    <>
      <Navbar/>
      <div>
        <AboutCard></AboutCard>
        <AboutCard></AboutCard>
      </div>
    </>
  );
}

export default About;