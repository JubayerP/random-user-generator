const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());


app.all("*", (req, res) => {
    res.send("No route found!")
})

app.listen(port, () => {
    console.log("app is listening to port on", port);
})