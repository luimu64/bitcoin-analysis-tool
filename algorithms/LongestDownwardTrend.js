const LongestDownwardTrend = async (data) => {
    let highest = 1;
    let streak = 1;

    for (let i = 0; i < (data.length - 1); i++) {
        if (data[i].price > data[i + 1].price) {
            streak++;
            if (streak > highest) highest = streak;
        } else streak = 1;
    }

    return highest;
}

export default LongestDownwardTrend;