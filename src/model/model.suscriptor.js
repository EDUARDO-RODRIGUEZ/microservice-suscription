const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const SuscriptorSchema = new Schema({
    suscriptor: {
        required: true,
        type: SchemaTypes.Number
    },
    fechaInicio: {
        required: true,
        type: SchemaTypes.Date,
    },
    fechaFin: {
        required: true,
        type: SchemaTypes.Date,
    },
    suscription: {
        type: SchemaTypes.ObjectId,
        ref: 'suscription'
    },
    expire: {
        type: SchemaTypes.Boolean,
        default: false
    }
});

const Suscriptor = model("suscriptor", SuscriptorSchema);

module.exports = Suscriptor;