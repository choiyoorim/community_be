const { commentJson } = require('../../models');
const statusCode = require('../../constants/statusCode');
const responseMessage = require('../../constants/responseMessage');
const util = require('../../libs/util');

const patchComment = async (req, res) => {
    const { userId } = req;
    const { content } = req.body;
    const { commentId } = req.params;

    // ACTION: MISSING_FIELD
    if (!content || !commentId) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISSING_FIELD,
                ),
            );
    }

    // ACTION: INVALID_FORMAT
    const commentNumId = Number(commentId);
    if (!util.checkIsInRange(commentNumId)) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.INVALID_FORMAT,
                ),
            );
    }

    // ACTION: ACCESS_DENIED
    const commentOwner = await commentJson.getCommentOwnerId(commentNumId);
    if (commentOwner !== userId) {
        return res
            .status(statusCode.FORBIDDEN)
            .send(
                util.fail(statusCode.FORBIDDEN, responseMessage.ACCESS_DENIED),
            );
    }

    try {
        const putData = {
            content,
        };
        await commentJson.editComment(commentNumId, putData);
        return res
            .status(statusCode.OK)
            .send(
                util.success(
                    statusCode.OK,
                    responseMessage.EDIT_COMMENT_SUCCESS,
                ),
            );
    } catch (error) {
        console.log(error);
        return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(
                util.fail(
                    statusCode.INTERNAL_SERVER_ERROR,
                    responseMessage.INTERNAL_SERVER_ERROR,
                ),
            );
    }
};

module.exports = patchComment;