const { likeJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const getLike = async (req, res) => {
    const { userId } = req;
    const { boardId } = req.params;
    if (!boardId) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

    const boardNumId = Number(boardId);
    if (!util.checkIsInRange(boardNumId)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_FORMAT,
                ),
            );
    }

    try {
        const isLiked = await likeJson.getLike(userId, boardNumId);
        res.status(statusCode.OK).send(
            util.success(
                statusCode.OK,
                responseMessage.GET_LIKES_SUCCESS,
                isLiked,
            ),
        );
    } catch (err) {
        console.error(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                responseMessage.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

module.exports = getLike;