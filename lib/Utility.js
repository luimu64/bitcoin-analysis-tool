import LongestDownwardTrend from '../algorithms/LongestDownwardTrend.js';
import HighestTradingVolume from '../algorithms/HighestTradingVolume.js';
import BestTimeToSellAndBuy from '../algorithms/BestTimeToSellAndBuy.js';
import { DateTime } from '../lib/luxon.min.js';

const normalizeData = (data) => {
    if (data.prices.length < data.total_volumes.length) {
        const diff = data.total_volumes.length - data.prices.length;
        for (let i = 0; i < diff; i++) {
            data.prices.unshift([null, null]);
        }
    } else if (data.prices.length > data.total_volumes.length) {
        const diff = data.prices.length - data.total_volumes.length;
        for (let i = 0; i < diff; i++) {
            data.total_volumes.unshift([null, null]);
        }
    }
    return data;
}

const getDailyData = async (data, start_date, end_date) => {
    const differenceInDays = end_date.diff(start_date, 'days').days;

    normalizeData(data);

    let dayItems = [];
    if (differenceInDays === 0) {
        dayItems.push({
            date: data.prices[0][0],
            price: data.prices[0][1],
            volume: data.total_volumes[0][1]
        });
    } else if (differenceInDays >= 1 && differenceInDays <= 90) {
        for (let i = 0; i < data.prices.length; i++) {
            if (i % 24 === 0) {
                dayItems.push({
                    date: data.prices[i][0],
                    price: data.prices[i][1],
                    volume: data.total_volumes[i][1]
                });
            }
        };
    } else {
        for (let i = 0; i < data.prices.length; i++) {
            dayItems.push({
                date: data.prices[i][0],
                price: data.prices[i][1],
                volume: data.total_volumes[i][1]
            });
        };
    }
    return dayItems;
}

const renderResults = async (data, resultsContainer, start_date, end_date) => {
    const dailyData = await getDailyData(data, start_date, end_date);
    const longestDownwardTrend = await LongestDownwardTrend(dailyData);
    const [time, volume] = await HighestTradingVolume(dailyData);
    const dates = await BestTimeToSellAndBuy(dailyData);

    resultsContainer.children[1].innerHTML = longestDownwardTrend + ' days';
    resultsContainer.children[3].innerHTML = dates;
    resultsContainer.children[5].innerHTML = `${time} - ${volume}€`;
}

export { getDailyData, renderResults };