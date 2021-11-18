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
    return dayPrices;
}

export { getDayPrices };