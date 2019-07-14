
exports.generateRandomIdBetween = (floor, ceiling) => {
    return Math.floor(Math.random() * ceiling) + floor;
};

exports.shuffle = (array) => array.sort(() => Math.random() - 0.5);