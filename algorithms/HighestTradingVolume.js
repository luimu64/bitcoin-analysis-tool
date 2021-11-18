import { DateTime } from '../lib/luxon.min.js';

const compare = (a, b) => {
    if (a.total_volumes < b.total_volumes) {
        return 1;
    }
    if (a.total_volumes > b.total_volumes) {
        return -1;
    }
    return 0;
};

const HighestTradingVolume = async (data) => {
    const highestVolume = data.sort(compare);
    console.log(highestVolume);
    const time = DateTime.fromMillis(highestVolume[0]).toFormat('dd/MM/yyyy');
    const volume = highestVolume[1] * data + "€";
    return [time, volume];
}

export default HighestTradingVolume;