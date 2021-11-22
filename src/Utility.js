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
        const date = DateTime.fromMillis(dataEntry.date).toFormat('dd/MM/yyyy');
        const price = Math.round(dataEntry.price);
        const volume = dataEntry.volume === 0 || dataEntry.volume === null ? 'No data' : Math.round(dataEntry.volume) + '€';

        tableRows.push(`
        <tr>
            <td>${date}</td>
            <td>${price}€</td>
            <td>${volume}</td>
        </tr>`);
    }
    return tableRows.join('');
}

const loading = {
    start: () => {
        document.getElementById('loading_icon').style.display = 'block';
    },
    stop: () => {
        document.getElementById('loading_icon').style.display = 'none';
    }
}

const checkValidity = (input) => {
    //check whether the dates are given
    if (input.start_date.value && input.end_date.value) {
        const start_date = DateTime.fromFormat(input.start_date.value, 'yyyy-MM-dd').toMillis();
        const end_date = DateTime.fromFormat(input.end_date.value, 'yyyy-MM-dd').toMillis();
        //check whether start date is same or smaller as end date, same in case of a single day
        if (start_date < end_date || start_date === end_date) return undefined;
        else return 'Start date has to be before end date.';
    } else return 'Please provide both dates.';
}

export { getDailyData, formatDataDisplay, loading, checkValidity };