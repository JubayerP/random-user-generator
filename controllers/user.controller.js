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


// update multiple users
module.exports.updateMultipleUsers = (req, res) => {
    const users = readUsersFile();
    const userIdsToUpdate = req.body.userIds;
    const userDatas = req.body.userDatas;
    const usersToUpdate = []

    // const userToUpdate = users.filter(user => userIdsToUpdate.includes(user.id));

    //     if (userToUpdate) {
    //         userToUpdate.name = req.body.name;
    //         userToUpdate.gender = req.body.gender;
    //         userToUpdate.address = req.body.address;
    //         userToUpdate.contact = req.body.contact;
    //         userToUpdate.photoURL = req.body.photoURL;

    //         usersToUpdate.push(userToUpdate);
    //     }
    // })

    userIdsToUpdate.forEach(userId => {
        const userToUpdate = users.filter(user => userIdsToUpdate.includes(user.id))
        if (userToUpdate) {
            const updatedUserData = userDatas.find(userData => userData.id === userId)
            // userToUpdate.name = updatedUserData.name;
            // userToUpdate.gender = updatedUserData.gender;
            // userToUpdate.address = updatedUserData.address;
            // userToUpdate.contact = updatedUserData.contact;
            // userToUpdate.photoURL = updatedUserData.photoURL;
        }
    })

    // fs.writeFileSync('users.json', JSON.stringify(users), err => {
    //     if (err) throw err;
    // })

    // res.send(`${usersToUpdate.length} users updated successfully`)
}



module.exports.deleteUser = (req, res) => {
    // const users = readUsersFile();
    let usersFile = fs.readFileSync("users.json");
    let data = JSON.parse(usersFile);
    const { id } = req.params;
    if (id <= 0 || id > data.length) {
        return res.status(404).send("user not found");
    }
    data = data.filter(user => parseInt(user.id) !== parseInt(id));
    usersFile = JSON.stringify(data);
    fs.writeFile("users.json", usersFile, err => {
        if (err) throw err;
        res.send(`${id} deleted successfully`)
    });
}