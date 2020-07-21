import water from '../images/water.png';
import rock from '../images/stone.png';
import grass from '../images/grass.png';
import bug from '../images/Bug.png';
import ele from '../images/ele.png';
import flying from '../images/flying.png';
import fire from '../images/Fire.png';

const getType = (type) => {
    if(type === 'fire') {
        return fire;
    } else if(type === 'grass') {
        return grass;
    } else if (type === "water") {
        return water;
    } else if (type === 'flying') {
        return flying;
    } else if (type === 'rock') {
        return rock;
    } else if (type === 'bug') {
        return bug;
    } else if (type === 'electric') {
        return ele;
    }
}

export default getType;