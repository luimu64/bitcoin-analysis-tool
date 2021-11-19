import { DateTime } from '../lib/luxon.min.js';

const compare = (a, b) => {
    if (a.price < b.price) return 1;
    if (a.price > b.price) return -1;
    return 0;
};

const BestTimeToSellAndBuy = (data) => {
    const sortedByPrices = data.sort(compare);
    const buyTime = DateTime.fromMillis(sortedByPrices.pop().date).toFormat('dd/MM/yyyy');
    const sellTime = DateTime.fromMillis(sortedByPrices.shift().date).toFormat('dd/MM/yyyy');
    return [buyTime, sellTime];
}

export default BestTimeToSellAndBuy;