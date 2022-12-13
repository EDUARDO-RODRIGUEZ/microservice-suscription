const { request, response } = require("express");
const mongoose = require("mongoose");
const Suscription = require("../model/model.suscription");


const controller = "Controller Suscription: ";

const create = async (req = request, res = response) => {
    const { nombre, precio, cantDay } = req.body;
    const suscription = new Suscription({ nombre, precio, cantDay });
    try {
        await suscription.save();
        return res.status(201).json({
            ok: true,
            data: suscription
        });
    } catch (error) {
        console.log(`${controller} error ${error}`);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        });
    }
}

const update = async (req = request, res = response) => {
    const { id, nombre, precio, cantDay } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            ok: false,
            message: "id no valido"
        });
    }

    try {
        const suscription = await Suscription.findById(id);
        if (suscription == null) {
            return res.status(404).json({
                ok: false,
                message: "Not Found Suscription"
            });
        }
        suscription.nombre = nombre;
        suscription.precio = precio;
        suscription.cantDay = cantDay;
        await suscription.save();
        return res.status(200).json({
            ok: true,
            data: suscription
        });
    } catch (error) {
        console.log(`${controller} error ${error}`);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        });
    }
}

const remove = async (req = request, res = response) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            ok: false,
            message: "id no valido"
        });
    }

    try {
        const suscription = await Suscription.findById(id);
        if (suscription == null) {
            return res.status(404).json({
                ok: false,
                message: "Not Found Suscription"
            });
        }

        await suscription.remove();

        return res.status(200).json({
            ok: true,
            data: suscription
        });

    } catch (error) {
        console.log(`${controller} error ${error}`);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        });
    }
}

const list = async (req = request, res = response) => {
    try {
        const suscriptionAll = await Suscription.find();
        return res.status(200).json({
            ok: true,
            data: suscriptionAll
        })
    } catch (error) {
        console.log(`${controller} error ${error}`);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        });
    }
}

module.exports = {
    create,
    update,
    remove,
    list
}