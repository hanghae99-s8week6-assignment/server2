
const PostService = require('../services/posts.service');

class PostsController {
    postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.


    //일정 조회
    getPost = async (req, res, next) => {
        const { postId } = req.params;
        const posts = await this.postService.findPost(postId);
        res.status(200).json({ data: posts })
    }

    //일정 생성
    createPost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user
            const { title, day: [cardNum, [placeName, locate, content]] } = req.body;
            const createPostData = await this.postService.createPost({ nickname, title, day: [cardNum, [placeName, locate, content]] });

            res.status(201).json({ data: createPostData });

        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }
    }

    //일정 수정
    updatepost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user
            const { postId }= req.params;
            const { title, day: [cardNum, [placeName, locate, content]] } = req.body;
            const updateData = await this.postService.updatepost({  postId, nickname, title, day: [cardNum, [placeName, locate, content]] });
            res.status(201).json({ message: updateData });
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }

    }

    //일정 삭제
    deletepost = async (req, res, next) => {
        try {
            const { nickname } = res.locals.user
            const postId = req.params.postId;
            const deleteData = await this.postService.deletepost({ postId, nickname })
            res.status(201).json({ message: deleteData });
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            console.log(message);
            res.status(400).json({ message });
        }


    }
}

module.exports = PostsController;