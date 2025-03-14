import Comment from "../MODELS/comment.model.js";
import errorMessage from "../UTILS/error.js";

export const createComment = async (req,res,next) => {
    try {
        const {content , postId , userId} = req.body;
        if(userId!=req.user.id){
            return next(errorMessage(403,'You are not allowed to Comment'));
        }

        const newComment = new Comment({
            content,
            postId,
            userId,
        });

        await newComment.save();
        res.status(200).json(newComment);

    } catch (error) {
        next(error);
    }
}