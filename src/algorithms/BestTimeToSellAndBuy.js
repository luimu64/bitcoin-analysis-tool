import { DateTime } from '../../lib/luxon.min.js';

const BestTimeToSellAndBuy = async (data) => {
    let maxDiff = data[1].price - data[0].price;
    let buy = data[0].date;
    let sell = data[1].date;

    for (let i = 0; i < (data.length - 1); i++) {
        for (let j = (i + 1); j < data.length; j++) {
            if ((data[j].price - data[i].price) > maxDiff) {
                maxDiff = data[j].price - data[i].price;
                buy = data[i].date;
                sell = data[j].date;
            }
        }
    }

    if (maxDiff <= 0) {
        return 'Do not buy!';
    } else {
        const formattedBuy = DateTime.fromMillis(buy).toFormat('dd/MM/yyyy');
        const formattedSell = DateTime.fromMillis(sell).toFormat('dd/MM/yyyy');
        return `${formattedBuy} - ${formattedSell}`;
    }
}

export default BestTimeToSellAndBuy;