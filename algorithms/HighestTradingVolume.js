import { DateTime } from '../lib/luxon.min.js';

const compare = (a, b) => {
    if (a.volume < b.volume) return 1;
    if (a.volume > b.volume) return -1;
    return 0;
};

const HighestTradingVolume = async (data) => {
    let sortedByVolumes = [...data].sort(compare);
    const time = DateTime.fromMillis(sortedByVolumes[0].date).toFormat('dd/MM/yyyy');
    const volume = Math.round(sortedByVolumes[0].volume);
    return [time, volume];
}

export default HighestTradingVolume;