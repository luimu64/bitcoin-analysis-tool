import LongestDownwardTrend from './src/algorithms/LongestDownwardTrend.js';
import HighestTradingVolume from './src/algorithms/HighestTradingVolume.js';
import BestTimeToSellAndBuy from './src/algorithms/BestTimeToSellAndBuy.js';
import { getDailyData, renderResults, loading } from "./src/Utility.js";
import { DateTime } from './lib/luxon.min.js';
import api from './src/Api.js';

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