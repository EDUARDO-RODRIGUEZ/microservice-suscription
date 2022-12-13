const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const SuscriptionSchema = new Schema({
    nombre: {
        required: true,
        type: SchemaTypes.String,
    },
    cantDay: {
        required: true,
        type: SchemaTypes.Number
    },
    precio: {
        required: true,
        type: SchemaTypes.Number
    },
});

const Suscription = model("suscription", SuscriptionSchema);
module.exports = Suscription;