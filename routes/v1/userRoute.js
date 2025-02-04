const express = require('express');

const postUser = require('../../controllers/user/postUser');
const loginUser = require('../../controllers/user/loginUser');
const getUser = require('../../controllers/user/getUser');
const patchUser = require('../../controllers/user/patchUser');
const patchUserPassword = require('../../controllers/user/patchUserPassword');
const deleteUser = require('../../controllers/user/deleteUser');
const { authMiddleware } = require('../../middlewares/auth');
const upload = require('../../middlewares/multer');
const logoutUser = require('../../controllers/user/logoutUser');
const morganUserAPILogger = require('../../utils/morganLogger/morganUserAPILogger');

const router = express.Router();

router.use(morganUserAPILogger);
router.post('/', upload.single('profile_image'), postUser);
router.get('/', authMiddleware, getUser);
router.patch('/', authMiddleware, upload.single('profile_image'), patchUser);
router.delete('/', authMiddleware, deleteUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.patch('/password', authMiddleware, patchUserPassword);

module.exports = router;
