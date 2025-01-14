import justinProf from './assets/img/Justin.png';
import claireProf from './assets/img/Claire.jpg';
import { Description } from '@mui/icons-material';

// Map holding descriptions
const map = new Map();
map.set('Justin', {description: 'He\'s Cool', img: justinProf});
map.set('Claire', {description: 'Hi!', img: claireProf});
map.set('Stephen', {description: "Stevey Stretchie", img: claireProf});
map.set('Alexis', {description: "Post Grad Life", img: claireProf});


function AboutCard({name}) {
    return (
        <>
            <text>{name}</text>
            <text>{map.get(name).description}</text>
            <img src={map.get(name).img}></img>
        </>
    );
}

export default AboutCard;