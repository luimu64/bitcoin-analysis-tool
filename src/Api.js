const baseUrl = `https://api.coingecko.com/api/v3/coins/bitcoin`;

const api = {
    getRange: async (start, end) => {
        const start_timestamp = start.toMillis() / 1000;
        const end_timestamp = end.plus({ hours: 1 }).toMillis() / 1000;
        const url = `/market_chart/range?vs_currency=eur&from=${start_timestamp}&to=${end_timestamp}`;
        const range = await fetch(baseUrl + url);
        return range.json();
    }
}

export default api;