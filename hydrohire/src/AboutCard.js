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
map.set('Justin Glazer', {description: 'Hi! Im Justin, and I am a CS major at the University of Maryland, College Park (UMD). I have been coding since eleventh grade, and I have primarily studied Java and C. I am interested in becoming a software developer in the future. In my free time, I like to snowboard, skateboard, and play sports with friends', title: 'Backend Engineer', img: justinProf, li: 'https://www.linkedin.com/in/justin-glazer/', gh: 'https://github.com/justin-glazer'});
map.set('Claire Chen', {description: 'Hi!', title: 'Frontend Engineer', img: claireProf, li: 'https://www.linkedin.com/in/claire-s-chen/', gh: 'https://github.com/cc13985'});
map.set('Stephen Wu', {description: "Stevey Stretchie", title: 'Product Manager & Frontend Engineer', img: stephenProf, li:'https://www.linkedin.com/in/stephen-wu-210a96304/' ,gh: 'https://github.com/heavens-potato'});
map.set('Alexis Giobbi', {description: "Post Grad Life", title: 'UI/UX Designer', img: alexisProf, li:'https://www.linkedin.com/in/alexis-giobbi/', gh: 'https://github.com/alexisgiobbi'});

function AboutCard({name}) {
    const theme = useTheme();
    return (
        <>
            <div className='flex flex-row p-2 lg:p-5 gap-3' style ={{borderRadius: '1.25rem', backgroundColor: theme.palette.secondary.light}}>
                <div className='w-1/3 flex flex-col justify-center'> {/* Left Half */}
                <img className= 'flex justify-center h-64 object-cover rounded-xl' src={map.get(name).img} />
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