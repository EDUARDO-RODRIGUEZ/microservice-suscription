const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const DBConexion = require("./src/config/DBConexion");
const routerSuscription = require("./src/route/route.suscription");
const routerSuscriptor = require("./src/route/route.suscriptor");

dotenv.config();
DBConexion();

// middleware
app.use(cors())
app.use(express.json());

app.use("/api/suscription", routerSuscription);
app.use("/api/suscriptor", routerSuscriptor);

app.listen(process.env.PORT, () => {
    console.log("Server Up !!!");
});
