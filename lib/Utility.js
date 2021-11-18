import LongestDownwardTrend from '../algorithms/LongestDownwardTrend.js';
import HighestTradingVolume from '../algorithms/HighestTradingVolume.js';
import BestTimeToSellAndBuy from '../algorithms/BestTimeToSellAndBuy.js';

const getDailyData = async (data, start_date, end_date) => {
    const differenceInDays = end_date.diff(start_date, 'days').days

    let dayPrices = null;
    if (differenceInDays === 0) {
        dayPrices = {
            price: data.prices[0],
            volume: data.total_volumes[0],
            market_cap: data.market_caps[0]
        };
    } else if (differenceInDays >= 1 && differenceInDays <= 90) {
        dayPrices = {
            price: data.prices.filter((_, index) => index % 24 === 0),
            volume: data.total_volumes.filter((_, index) => index % 24 === 0),
            market_cap: data.market_caps.filter((_, index) => index % 24 === 0)
        };
    } else {
        dayPrices = data;
    }
    return dayPrices;
}

const renderResults = async (data, resultsContainer, start_date, end_date) => {
    const dailyData = await getDailyData(data, start_date, end_date);
    const longestDownwardTrend = ''// await LongestDownwardTrend(prices);
    console.log(dailyData);
    resultsContainer.innerHTML = `
        <h3>Longest bearish trend</h3>
        <p>${longestDownwardTrend}</p>
        <h3>Highest trading volume</h3>
        <p>${HighestTradingVolume(data.total_volumes)}</p>
        <h3>Best time to sell and buy</h3>
        <p>${BestTimeToSellAndBuy(data)}</p>
    `;
}

export { getDailyData, renderResults };