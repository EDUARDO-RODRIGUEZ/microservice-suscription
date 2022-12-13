const mongoose = require("mongoose");

const DBConexion = async () => {
    try {
        let db = process.env.MONGODB;
        console.log(db);
        await mongoose.connect(db);
        console.log("DB Connect !!!")
    } catch (error) {
        throw new Error("Error DB Conexion");
    }
}

module.exports = DBConexion;

