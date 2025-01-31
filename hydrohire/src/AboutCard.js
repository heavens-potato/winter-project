import justinProf from './assets/img/Justin.png';
import claireProf from './assets/img/Claire.jpg';
import stephenProf from './assets/img/Stephen.jpg';
import alexisProf from './assets/img/Alexis.JPG';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Map holding info for each person
const map = new Map();
map.set('Justin Glazer', {description: 'I’m Justin, and I am a CS major at the University of Maryland, College Park. I enjoy programming and developing applications that have real-world implications and are used to solve everyday issues. I hope to continue to create different projects and, eventually, take on a career as a software engineer. Outside of coding, I enjoy skateboarding, playing sports, and spending time with friends and family.', title: 'Backend Engineer', img: justinProf, li: 'https://www.linkedin.com/in/justin-glazer/', gh: 'https://github.com/justin-glazer'});
map.set('Claire Chen', {description: "I'm Claire, a CS major at the University of Maryland, College Park (UMD). I’ve always loved creating and seeing my developments and code come to life. I’m passionate about creating an impact with my work, and I’ve explored these experiences through various activities, projects, and internships. Beyond coding, I thrive in the exhilarating environments of hackathons, whether participating in or organizing them. When I’m not working on projects, you can find me dancing, drawing, or enjoying a cozy afternoon at a cat cafe.", title: 'Frontend Engineer', img: claireProf, li: 'https://www.linkedin.com/in/claire-s-chen/', gh: 'https://github.com/cc13985'});
map.set('Stephen Wu', {description: 'My name is Stephen and I am a CS major at the University of Maryland, College Park. I am passionate about leveraging web development for positive social impact, and have led a variety of social good web development projects since high school utilizing HTML/CSS and JavaScript, along with frameworks like React, Firebase, Framer Motion, and Material UI. Outside of the computer, I am an avid Disney park enjoyer and often visit capybara cafes, play tennis, and hike.', title: 'Product Manager & Frontend Engineer', img: stephenProf, li:'https://www.linkedin.com/in/stephen-wu-210a96304/' ,gh: 'https://github.com/heavens-potato'});
map.set('Alexis Giobbi', {description: "I'm Alexis, a recent graduate of the University of Pittsburgh with a major in Digital Narrative and Interactive Design and minors in CS and IS. I love working at the intersection of technology and people and am currently continuing my UX/UI design internship at a start-up while I look for a full-time role. In my freetime, I love reading, writing, and logging movies I'm watching on Letterboxd.", title: 'UI/UX Designer', img: alexisProf, li:'https://www.linkedin.com/in/alexis-giobbi/', gh: 'https://github.com/alexisgiobbi'});

function AboutCard({name}) {
    const theme = useTheme();
    return (
        <>
            <div className='flex flex-row p-2 lg:p-5 gap-3' style ={{borderRadius: '1.25rem', backgroundColor: theme.palette.secondary.light, height: '100%'}}>
                <div className='w-1/3 flex flex-col justify-center'> {/* Left Half */}
                <img className= 'flex justify-center h-64 object-cover rounded-xl' src={map.get(name).img} alt={name}/>
                    <Typography sx={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: theme.palette.primary.dark}}>{name}</Typography>
                    <div className='flex justify-center gap-2'>
                        <LinkedInIcon className='cursor-pointer' style={{color: theme.palette.primary.dark}} onClick={()=> window.open(map.get(name).li, "_blank")}>LinkedIn!   </LinkedInIcon>
                        <GitHubIcon className='cursor-pointer' style={{color: theme.palette.primary.dark}} onClick={()=> window.open(map.get(name).gh, "_blank")}>GitHub!</GitHubIcon>
                    </div>
                </div>
                <div className='w-2/3'> {/* Right Half */}
                    <Typography sx={{fontSize: 20, fontWeight: 'bold', color: theme.palette.primary.dark}}>{map.get(name).title}</Typography>
                    <p style={{color: theme.palette.primary.dark}}>{map.get(name).description}</p>
                </div>
            </div>
        </>
    );
}

export default AboutCard;