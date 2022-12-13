const { request, response } = require("express");
const mongoose = require("mongoose");
const Stripe = require("stripe");
const { addDay } = require("../helpers/helper");
const Suscription = require("../model/model.suscription");
const Suscriptor = require("../model/model.suscriptor");

const controller = "Controller Suscriptor: ";

const create = async (req = request, res = response) => {

    const { id, suscriptorId, suscriptionId } = req.body;

    if (!mongoose.isValidObjectId(suscriptionId)) {
        return res.status(400).json({
            ok: false,
            message: "id no valido"
        });
    }

    try {

        //Verificando si es q tiene una suscripcion valida
        const suscriptor = await Suscriptor.find({ suscriptor: suscriptorId, expire: false });

        if (suscriptor.length > 0) {
            return res.status(200).json({
                ok: false,
                message: "Ya tienes una suscription activa !!!",
                data: suscriptor
            });
        }

        // Verificando si existe esa suscription
        const suscription = await Suscription.findById(suscriptionId);

        if (suscription == null) {
            return res.status(404).json({
                ok: false,
                message: "Not Found Documents"
            });
        }

        let fechaInicio = new Date();
        let fechaFin = addDay(fechaInicio, suscription.cantDay);

        let newSuscriptor = new Suscriptor({
            suscriptor: suscriptorId,
            fechaInicio,
            fechaFin,
            suscription: suscriptionId
        });

        let paymentCorrect = await createPayment(id, suscription.precio);

        if (!paymentCorrect) {
            return res.status(201).json({
                ok: true,
                message: "Error al crear el pago"
            })
        }

        await newSuscriptor.save();

        return res.status(201).json({
            ok: true,
            data: newSuscriptor
        })

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
        const suscriptorAll = await Suscriptor.find();
        return res.status(200).json({
            ok: true,
            data: suscriptorAll
        })
    } catch (error) {
        console.log(`${controller} error ${error}`);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        });
    }

}

const listBySuscriptor = async (req = request, res = response) => {

    const { suscriptorId } = req.params;

    try {
        const MySuscriptions = await Suscriptor.find({ suscriptor: suscriptorId });
        return res.status(200).json({
            ok: true,
            data: MySuscriptions
        })
    } catch (error) {
        console.log(`${controller} error ${error}`);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        });
    }

}

const listBySuscriptorActive = async (req = request, res = response) => {

    const { suscriptorId } = req.params;

    try {
        const suscription = await Suscriptor.findOne({ suscriptor: suscriptorId, expire: false });
        if (suscription == null) {
            return res.status(200).json({
                ok: true,
                data: null
            })
        }

        let now = new Date();

        if (now > suscription.fechaFin) {
            suscription.expire = true;
            suscription.save();
            return res.status(200).json({
                ok: true,
                data: null
            })
        }

        return res.status(200).json({
            ok: true,
            data: suscription
        })
    } catch (error) {
        console.log(`${controller} error ${error}`);
        return res.status(500).json({
            ok: false,
            message: "Server Error"
        });
    }

}

const createPayment = async (id, monto) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let amount = monto * 100;
    try {
        await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Suscription",
            payment_method: id,
            confirm: true
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    create,
    list,
    listBySuscriptor,
    listBySuscriptorActive
}