import LongestDownwardTrend from './src/algorithms/LongestDownwardTrend.js';
import HighestTradingVolume from './src/algorithms/HighestTradingVolume.js';
import BestTimeToSellAndBuy from './src/algorithms/BestTimeToSellAndBuy.js';
import { getDailyData, formatDataDisplay, loading } from "./src/Utility.js";
import { DateTime } from './lib/luxon.min.js';
import api from './src/Api.js';

const renderResults = (processedData) => {
    const results = document.getElementsByClassName('result');

    results[0].innerHTML = processedData.trend + ' days';
    results[1].innerHTML = processedData.dates;
    results[2].innerHTML = `${processedData.time} - ${processedData.volume}€`;
    results[3].innerHTML = `${formatDataDisplay(processedData.all)}`;
}

/*
function that handles the whole process after pressing Analyze.
First it initializes the date objects, then it calls the api to get the data.
Then it calls the algorithms to process the data and finally it renders the results.
Loading animation is shown while the data is being fetched and processed.
*/
const main = async (start_date, end_date) => {
    const startDate = DateTime.fromFormat(start_date, "yyyy-MM-dd");
    const endDate = DateTime.fromFormat(end_date, "yyyy-MM-dd");
    const data = await api.getRange(startDate, endDate);
    loading.start();
    const dailyData = await getDailyData(data, startDate, endDate);
    const trend = await LongestDownwardTrend(dailyData);
    const [time, volume] = await HighestTradingVolume(dailyData);
    const dates = await BestTimeToSellAndBuy(dailyData);

    renderResults({
        all: dailyData,
        dates: dates,
        time: time,
        volume: volume,
        trend: trend
    });
    loading.stop();
}

export default main;