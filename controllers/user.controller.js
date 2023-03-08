const fs = require("fs");


// get random user
module.exports.getRandomUser = (req, res) => {
    const data = fs.readFileSync("users.json");
    let users = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * users.length)
    let randomUser = users[randomIndex];
    res.json(randomUser)
}


// get all random users
module.exports.getAllUsers = (req, res) => {
    const data = fs.readFileSync("users.json");
    const users = JSON.parse(data);
    res.json(users);
}