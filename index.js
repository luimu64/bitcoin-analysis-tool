import LongestDownwardTrend from '../algorithms/LongestDownwardTrend.js';
import HighestTradingVolume from '../algorithms/HighestTradingVolume.js';
import BestTimeToSellAndBuy from '../algorithms/BestTimeToSellAndBuy.js';
import { getDailyData, renderResults, loading } from "./lib/Utility.js";

const main = async (data, start_date, end_date) => {
    loading.start();
    const dailyData = await getDailyData(data, start_date, end_date);
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