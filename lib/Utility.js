import LongestDownwardTrend from '../algorithms/LongestDownwardTrend.js';
import HighestTradingVolume from '../algorithms/HighestTradingVolume.js';
import BestTimeToSellAndBuy from '../algorithms/BestTimeToSellAndBuy.js';

const getDayPrices = async (data, start_date, end_date) => {
    let dayPrices = [];

    const differenceInDays = end_date.diff(start_date, 'days').days

    if (differenceInDays === 0) {
        dayPrices.push(data[0]);
    } else if (differenceInDays >= 1 && differenceInDays <= 90) {
        dayPrices.push(data.filter((_, index) => index % 24 === 0));
    } else {
        dayPrices = data;
    }
    return dayPrices[0];
}

const renderResults = async (data, resultsContainer, start_date, end_date) => {
    const prices = await getDayPrices(data.prices, start_date, end_date);
    const longestDownwardTrend = "dummy data"; //await LongestDownwardTrend(prices);
    resultsContainer.innerHTML = `
        <h3>Longest bearish trend</h3>
        <p>${longestDownwardTrend}</p>
        <h3>Highest trading volume</h3>
        <p>${HighestTradingVolume(data.total_volumes)}</p>
        <h3>Best time to sell and buy</h3>
        <p>${BestTimeToSellAndBuy(data)}</p>
    `;
}

export { getDayPrices, renderResults };