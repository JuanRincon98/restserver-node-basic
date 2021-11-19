const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    //Hacer dos consultas al mismo tiempo
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde)),
    ]);

    res.json({
        total, 
        usuarios
    })
}

const usersPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    })
};

const usersPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
};

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controlador',
    })
};


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
};