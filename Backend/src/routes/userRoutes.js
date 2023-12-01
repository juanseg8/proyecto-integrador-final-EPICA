const { viewUsers, userView, createdUser, editUser, deleteUser, findUserByUsername } = require('../controllers/userController');

const userRouter = require('express').Router();

userRouter.get('/users', viewUsers);
userRouter.get('/user/:id', userView);
userRouter.post('/user', createdUser);
userRouter.put('/user', editUser);
userRouter.delete('/user', deleteUser);
userRouter.get('/username', findUserByUsername);


module.exports = userRouter