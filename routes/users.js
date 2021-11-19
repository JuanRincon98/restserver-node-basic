const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');

const { usersGet,
    usersPut,
    usersPost,
    usersDelete } = require('../controllers/users.controllers');

const { esRoleValido, correoExiste } = require('../helpers/db-validators');

const router = Router();

//RUTAS
router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 carácteres').isLength({ min: 6 }),
    check('correo', 'El correo es inválido').isEmail(),
    check('correo').custom(correoExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usersPost);

router.delete('/', usersDelete);

module.exports = router;