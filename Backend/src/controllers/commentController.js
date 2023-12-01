const comment = require('../models/commentModel')
const { addComment } = require('../utils/addComment');
const desencriptar = require('../utils/token');

const commentController = {}

commentController.viewComments = async (req, res) => {
    try {

        const listComments = await comment.find().populate('autor');
        return res.json(listComments);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });

    }
}

commentController.commentView = async (req, res) => {
    try {

        const { id } = req.params;
        const commentFound = await comment.findById(id).populate('autor');
        return res.json(commentFound);

    } catch (error) {

        let mensaje = 'Ocurrió un error interno al intentar obtener el comment';
        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el comment';
        }
        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}

commentController.createdComment = async (req, res) => {

    try {
        const { description, post } = req.body;

        const { token } = req.headers;

        const tokenValido = desencriptar(token)

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'Token no valido',
            });
        }

        const autor = tokenValido.id

        const newComment = new comment({
            autor: autor,
            description: description,
            post: post,
        });

        await newComment.save();

        addComment(newComment, post)

        return res.json({ mensaje: 'Comment creado con éxito' });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear el comment',
            error: error
        });

    }
}

commentController.editComment = async (req, res) => {
    try {

        const { id, description } = req.body;
        const { token } = req.headers;

        const tokenValido = desencriptar(token)


        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'Token no valido',
            });
        }

        const userId = tokenValido.id
        const commentFound = await comment.findById(id)

        if (commentFound.autor.toString() !== userId) {
            return res.status(500).json({
                mensaje: 'El autor no es el mismo'
            });
        }

        await comment.findByIdAndUpdate(
            id,
            {
                description: description,
            }
        );
        return res.json({ mensaje: 'Comment actualizado con éxito' });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el comment',
            error: error
        });
    }
}

commentController.deleteComment = async (req, res) => {
    try {

        const { idComentario } = req.body;
        const { token } = req.headers;

        const tokenValido = desencriptar(token)

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'Token no valido',
            });
        }

        const userId = tokenValido.id
        const commentFound = await comment.findById(idComentario)


        if (commentFound.autor.toString() !== userId) {
            return res.status(500).json({
                mensaje: 'El autor no es el mismo'
            });
        }

        await comment.findByIdAndDelete(idComentario);
        return res.json({ mensaje: 'Post eliminada con éxito' });

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el post',
            error: error
        });

    }
}

module.exports = commentController;