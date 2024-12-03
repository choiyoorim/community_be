const express = require('express');

const getAllBoard = require('../../controllers/board/getAllBoard');
const getBoard = require('../../controllers/board/getBoard');
const postBoard = require('../../controllers/board/postBoard');
const putBoard = require('../../controllers/board/putBoard');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllBoard);
router.post('/', authMiddleware, postBoard);
router.get('/:boardId', authMiddleware, getBoard);
router.put('/:boardId', authMiddleware, putBoard);
module.exports = router;
