import justinProf from './assets/img/Justin.png';
import claireProf from './assets/img/Claire.jpg';
import stephenProf from './assets/img/Stephen.jpg';
import alexisProf from './assets/img/Alexis.JPG';

// Map holding info for each person
const map = new Map();
map.set('Justin', {description: 'He\'s Cool', title: 'Backend Developer', img: justinProf, li: 'https://www.linkedin.com/in/justin-glazer/', gh: 'https://github.com/justin-glazer'});
map.set('Claire', {description: 'Hi!', title: 'Frontend Developer', img: claireProf, li: 'https://www.linkedin.com/in/claire-s-chen/', gh: 'https://github.com/cc13985'});
map.set('Stephen', {description: "Stevey Stretchie", title: 'Project Lead, Developer', img: stephenProf, li:'https://www.linkedin.com/in/stephen-wu-210a96304/' ,gh: 'https://github.com/heavens-potato'});
map.set('Alexis', {description: "Post Grad Life", title: 'UI/UX Designer', img: alexisProf, li:'https://www.linkedin.com/in/alexis-giobbi/', gh: 'https://github.com/alexisgiobbi'});

function AboutCard({name}) {
    return (
        <>
            <div class="flex flex-row">
                <div> {/* Left Half */}
                    <img src={map.get(name).img} style={{ maxWidth: '20%' }}></img>
                    <h1>{name}</h1>
                    <div>
                        <button onClick={()=> window.open(map.get(name).li, "_blank")}>LinkedIn!   </button>
                        <button onClick={()=> window.open(map.get(name).gh, "_blank")}>GitHub!</button>
                    </div>
                </div>
                <div> {/* Right Half */}
                    <h2>{map.get(name).title}</h2>
                    <p>{map.get(name).description}</p>
                </div>
            </div>
        </>
    );
}

export default AboutCard;