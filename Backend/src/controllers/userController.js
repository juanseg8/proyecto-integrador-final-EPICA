const user = require('../models/userModel')
const bcrypt = require('bcrypt');

const userController = {}

userController.viewUsers = async (req, res) => {
    try {

        const listUsers = await user.find();
        return res.json(listUsers);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });

    }
}

userController.userView = async (req, res) => {
    try {

        const { id } = req.params;
        const userFound = await user.findById(id);
        return res.json(userFound);

    } catch (error) {

        let mensaje = 'Ocurrió un error interno al intentar obtener el usuario';
        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el usuario';
        }
        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}

userController.createdUser = async (req, res) => {
    try {

        const { username, password, email, avatarURL } = req.body;

        const existingUser = await user.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ mensaje: 'El nombre de usuario o correo electrónico ya está en uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            username: username,
            password: hashedPassword,
            email: email,
            avatarURL: avatarURL,
        });
        await newUser.save();
        return res.json({ mensaje: 'Usuario creado con éxito' });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear el usuario',
            error: error
        });

    }
}

userController.editUser = async (req, res) => {
    try {

        const { id, username, password, email, avatarURL } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await user.findByIdAndUpdate(
            id,
            {
                username: username,
                password: hashedPassword,
                email: email,
                avatarURL: avatarURL,
            }
        );
        return res.json({ mensaje: 'Usuario actualizado con éxito' });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el usuario',
            error: error
        });
    }
}

userController.deleteUser = async (req, res) => {
    try {

        const { id } = req.body;
        await user.findByIdAndDelete(id);
        return res.json({ mensaje: 'Usuario eliminado con éxito' });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el usuario',
            error: error
        });
    }
}

userController.findUserByUsername = async (req, res) => {

    const { username } = req.query;

    try {
        const userFound = await user.findOne({username});

        if (!userFound) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ userId: userFound._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = userController