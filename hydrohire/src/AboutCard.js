
// Map holding descriptions
const map = new Map();
map.set('Justin', 'He\'s Cool');
map.set('Claire', 'Hi!');

function AboutCard({name}) {
    return (
        <>
            <img></img>
            <text>{name}</text>
            <text>{map.get(name)}</text>
        </>
    );
}

export default AboutCard;