import LongestDownwardTrend from '../algorithms/LongestDownwardTrend.js';
import HighestTradingVolume from '../algorithms/HighestTradingVolume.js';
import BestTimeToSellAndBuy from '../algorithms/BestTimeToSellAndBuy.js';

const getDailyData = async (data, start_date, end_date) => {
    const differenceInDays = end_date.diff(start_date, 'days').days

    console.log(data);

    let dayItems = [];
    if (differenceInDays === 0) {
        dayItems.push({
            date: data.prices[0][0],
            price: data.prices[0][1],
            volume: data.total_volumes[0][1],
            market_cap: data.market_caps[0][1]
        });
    } else if (differenceInDays >= 1 && differenceInDays <= 90) {
        data.prices.map((price, i) => {
            if (i % 24 === 0) {
                dayItems.push({
                    date: price[0],
                    price: price[1],
                    volume: data.total_volumes[i][1],
                    market_cap: data.market_caps[i][1]
                });
            }
        })
    } else {
        data.prices.map((item, i) => {
            dayItems.push({
                date: item[0],
                price: item[1],
                volume: data.total_volumes[i][1],
                market_cap: data.market_caps[i][1]
            });
        });
    }
    return dayItems;
}

const renderResults = async (data, resultsContainer, start_date, end_date) => {
    const dailyData = await getDailyData(data, start_date, end_date);
    const longestDownwardTrend = ''// await LongestDownwardTrend(prices);
    console.log(dailyData)
    const [time, volume] = await HighestTradingVolume(dailyData);
    console.log(dailyData);
    resultsContainer.innerHTML = `
        <h3>Longest bearish trend</h3>
        <p>${longestDownwardTrend}</p>
        <h3>Highest trading volume</h3>
        <p>${time} - ${volume}</p>
        <h3>Best time to sell and buy</h3>
        <p>${BestTimeToSellAndBuy(data)}</p>
    `;
}

export { getDailyData, renderResults };