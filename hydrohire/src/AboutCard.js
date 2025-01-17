import justinProf from './assets/img/Justin.png';
import claireProf from './assets/img/Claire.jpg';
import stephenProf from './assets/img/Stephen.jpg';
import alexisProf from './assets/img/Alexis.JPG';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { borderColor } from '@mui/system';
import { Typography } from '@mui/material';

// Map holding info for each person
const map = new Map();
map.set('Justin Glazer', {description: 'He\'s Cool', title: 'Backend Developer', img: justinProf, li: 'https://www.linkedin.com/in/justin-glazer/', gh: 'https://github.com/justin-glazer'});
map.set('Claire Chen', {description: 'Hi!', title: 'Frontend Developer', img: claireProf, li: 'https://www.linkedin.com/in/claire-s-chen/', gh: 'https://github.com/cc13985'});
map.set('Stephen Wu', {description: "Stevey Stretchie", title: 'Project Lead, Developer', img: stephenProf, li:'https://www.linkedin.com/in/stephen-wu-210a96304/' ,gh: 'https://github.com/heavens-potato'});
map.set('Alexis Giobbi', {description: "Post Grad Life", title: 'UI/UX Designer', img: alexisProf, li:'https://www.linkedin.com/in/alexis-giobbi/', gh: 'https://github.com/alexisgiobbi'});

function AboutCard({name}) {
    return (
        <>
            <div className='flex flex-row p-5 gap-3' style ={{borderRadius: '1.25rem', backgroundColor: '#D9EAF5'}}>
                <div className='w-1/3 flex flex-col justify-center'> {/* Left Half */}
                    <img className= 'flex justify-center h-52 object-cover rounded-xl' src={map.get(name).img} />
                    <Typography className='flex justify-center'sx={{ fontSize: 24, fontWeight: 'bold'}}>{name}</Typography>
                    <div className='flex justify-center gap-2'>
                        <LinkedInIcon onClick={()=> window.open(map.get(name).li, "_blank")}>LinkedIn!   </LinkedInIcon>
                        <GitHubIcon onClick={()=> window.open(map.get(name).gh, "_blank")}>GitHub!</GitHubIcon>
                    </div>
                </div>
                <div className='w-2/3'> {/* Right Half */}
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold'}}>{map.get(name).title}</Typography>
                    <p>{map.get(name).description}</p>
                </div>
            </div>
        </>
    );
}

export default AboutCard;