import { DateTime } from '../lib/luxon.min.js';

const compare = (a, b) => {
    if (a.volume < b.volume) return 1;
    if (a.volume > b.volume) return -1;
    return 0;
};

const HighestTradingVolume = (data) => {
    const sortedByVolumes = data.sort(compare);
    const highestVolumeValue = sortedByVolumes[0].volume * sortedByVolumes[0].price;
    const time = DateTime.fromMillis(sortedByVolumes[0].date).toFormat('dd/MM/yyyy');
    return [time, highestVolumeValue];
}

export default HighestTradingVolume;