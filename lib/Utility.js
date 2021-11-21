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

const formatDataDisplay = (data) => {
    const tableRows = [
        `<tr>
            <th>Date</th>
            <th>Price</th>
            <th>Volume</th>
        </tr>`
    ];

    for (const dataEntry of data) {
        tableRows.push(`<tr>
            <td>${DateTime.fromMillis(dataEntry.date).toFormat('dd/MM/yyyy')}</td>
            <td>${Math.round(dataEntry.price)}€</td>
            <td>${Math.round(dataEntry.volume)}€</td>
        </tr>`);
    }
    return tableRows.join('');
}

const renderResults = (processedData) => {
    const results = document.getElementsByClassName('result');

    results[0].innerHTML = processedData.trend + ' days';
    results[1].innerHTML = processedData.dates;
    results[2].innerHTML = `${processedData.time} - ${processedData.volume}€`;
    results[3].innerHTML = `${formatDataDisplay(processedData.all)}`;
}

const loading = {
    start: () => {
        document.getElementById('loading_icon').style.display = 'block';
    },
    stop: () => {
        document.getElementById('loading_icon').style.display = 'none';
    }
}

export { getDailyData, renderResults, loading };