const express = require("express");
const userRoutes = require("./routes/user.route");
const app = express();
const port = process.env.PORT || 5000;


// middlewares
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("app is running")
})

app.all("*", (req, res) => {
    res.send("No routes found")
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})