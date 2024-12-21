import Post from "../MODELS/post.model.js";
import errorMessage from "../UTILS/error.js"

export const createPost = async (req , res , next) => {
    if(!req.user.isAdmin){
        return next(errorMessage(403,'You are not allowed to create a post'));
    }
    if(!req.body.title || !req.body.content) {
        return next(errorMessage(403,'Please provide all required fields'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
    const newPost = new Post({
        ...req.body,
        slug,
        userId : req.user.id,
    });
    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    } catch (error) {
        next(error);
    }
};

export const getPost = async (req, res , next) => {
    try {
        //  to keep the count of a post 
        const startIndex = parseInt(req.query.startIndex) || 0;
        // to keep number of posts visible in the front page (9)
        {/*const limit = parseInt(res.query.limit) || 9;*/}
        // 1 ascending & -1 descending
        const sortDirection  = req.query.order === 'asc' ? 1 : -1;
        // code to search in the search query
        const posts = await Post.find ({
            // search user id
            ...(req.query.userId && {
                userId : req.query.userId
            }),
            // search category
            ...(req.query.category && {
                category : req.query.category
            }),
            // search slug
            ...(req.query.slug && {
                slug : req.query.slug
            }),
            // search post id
            // ...(req.query.postId && {
            //     _id : req.query.postId
            // }),
            // search anything on the search bar
            ...(req.query.searchTerm && {
                $or : [
                    // $options : 'i' means uppercase or lowercase is not requried
                    {title : { $regex : req.query.searchTerm, $options : 'i'}},
                    {content : { $regex : req.query.searchTerm, $options : 'i'}},
                ],
            }),
        }).sort({updatedAt : sortDirection}).skip(startIndex).limit(9);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt : {$gte : oneMonthAgo},
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });

    } catch (error) {
        next(error);
    }
}