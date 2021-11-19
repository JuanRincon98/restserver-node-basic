const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey } = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
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

const usersPut = (req, res) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
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