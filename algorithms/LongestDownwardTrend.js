const LongestDownwardTrend = async (data) => {
    let highest = 0;

    let i = 0;
    while (i < data.length - 1) {
        let streak = 0;

        if (data[i][1] > data[i + 1][1]) {
            while (data[i][1] > data[i + 1][1] && i < data.length - 1) {
                streak++;
                i++;
            }
        } else i++;

        if (streak > highest) highest = streak;
    }
    return highest;
}

export default LongestDownwardTrend;