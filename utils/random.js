
exports.generateRandomIdBetween = (floor, ceiling) => {
    return Math.floor(Math.random() * ceiling) + floor;
};
