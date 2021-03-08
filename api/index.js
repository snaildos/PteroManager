const express = require("express");
const app = express();

// Setup express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

app.use((req, res, next) => {
    let realip = req.headers["x-real-ip"];
    console.log(`[${req.method}] request on ${req.originalUrl} from ${realip || req.ip.split(":").pop()}`);
    next();
});
app.use("/", require("./routes"));

app.all("*", (req, res) => {
    res.status(404).json({ error: "invalid route" });
});

app.listen(global.config.get("web.port", 8080), () => {
    console.log(`Server running on: ${global.config.get("web.host", "localhost")}:${global.config.get("web.port", 8080)}`);
});

module.exports = app;