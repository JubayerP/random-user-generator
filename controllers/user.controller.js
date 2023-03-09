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
    let users = JSON.parse(data);
    const limit = req.query.limit || users.length;

    if (limit <= users.length) {
        const selectedUser = users.slice(0, limit);
        res.send(selectedUser)
    } else {
        res.status(404).send("user limit bigger then users!")
    }
}

// save a user

module.exports.saveAUser = async (req, res) => {
    const oldUsers = fs.readFileSync("users.json");
    const user = req.body;
    const parseOldUsers = JSON.parse(oldUsers);
    user.id = parseOldUsers.length + 1;
    parseOldUsers.push(user);
    fs.writeFile("users.json", JSON.stringify(parseOldUsers), err => {
        if (err) throw err;
    })
    res.status(200).send(`Hey ${user.name} you saved successfully!`)
}


// update a specefic user using id

function readUsersFile() {
    const usersFile = fs.readFileSync("users.json");
    return JSON.parse(usersFile);
}

module.exports.updateUser = (req, res) => {
    const users = readUsersFile();
    const { id } = req.params;
    const updatedUser = req.body;
    // find the index of the user;
    if (id <= 0 || id > users.length) {
        return res.status(404).send("user not found");
    }
    const updateToUser = users.find(user => parseInt(user.id) === parseInt(id));
    
    // update the user's information
    updateToUser.name = updatedUser.name;
    updateToUser.gender = updatedUser.gender;
    updateToUser.address = updatedUser.address;
    updateToUser.contact = updatedUser.contact;
    updateToUser.photoURL = updatedUser.photoURL;

    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) throw err;
    })

    res.send("data updated!")
}