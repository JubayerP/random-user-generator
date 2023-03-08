const fs = require("fs");

module.exports.getRandomUser = (req, res) => {
    const data = fs.readFileSync("users.json");
    let users = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * users.length)
    let randomUser = users[randomIndex];
    res.json(randomUser)
}