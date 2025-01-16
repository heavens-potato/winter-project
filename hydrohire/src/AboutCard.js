import justinProf from './assets/img/Justin.png';
import claireProf from './assets/img/Claire.jpg';
import stephenProf from './assets/img/Stephen.jpg';
import alexisProf from './assets/img/Alexis.jpg';
import { Description } from '@mui/icons-material';

// Map holding descriptions
const map = new Map();
map.set('Justin', {description: 'He\'s Cool', img: justinProf});
map.set('Claire', {description: 'Hi!', img: claireProf});
map.set('Stephen', {description: "Stevey Stretchie", img: stephenProf});
map.set('Alexis', {description: "Post Grad Life", img: alexisProf});


function AboutCard({name}) {
    return (
        <>
            <text>{name}</text>
            <img src={map.get(name).img} style={{ maxWidth: '20%' }}></img>
            <text>{map.get(name).description}</text>
        </>
    );
}

export default AboutCard;