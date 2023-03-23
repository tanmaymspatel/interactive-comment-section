import { useEffect, useState } from "react";
import currentUSer from "../assets/images/avatars/image-juliusomo.png"
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import profilePicture from "../assets/images/avatars/image-juliusomo.png"

function CommentInput({ isReplying, addComments, addReplies, replyTo, setIsReplying, parentId, isEditing, setIsEditing, commentTobeEdited }: any) {

    const replyingToUser = isReplying ? replyTo : "";
    const [commentContent, setCommentContent] = useState<string>(replyingToUser);

    useEffect(() => {
        console.log(commentTobeEdited);
    }, [commentTobeEdited])


    const submitHandler = () => {
        console.log({ isEditing }, { isReplying });
        if (commentContent === "" || commentContent === " ") return;

        const newComment: ICommentsDetails = {
            id: Math.floor(Math.random() * 100) + 5,
            content: commentContent,
            commentingDate: new Date().toString(),
            upvotes: 0,
            userName: "juliusomo",
            profilePicture: profilePicture,
            isCurrentUSer: true,
            replies: [],
        };

        (isReplying && !isEditing) ? addReplies(parentId, newComment) : addComments(newComment);
        setCommentContent("");
        setIsReplying(false);
        setIsEditing(false);
        console.log({ isEditing }, { isReplying });
    }

    const contentString = commentTobeEdited?.content;

    useEffect(() => {
        isEditing ? setCommentContent(contentString) : setCommentContent(replyingToUser);
    }, [isEditing, contentString, replyingToUser])
    return (
        <div className="card new-comment rounded-3 p-4">
            <div className="row justify-content-between">
                <figure className="col-1 mb-0">
                    <img src={currentUSer} alt="current-user" className="profile-image" />
                </figure>
                <div className="col-9">
                    <textarea
                        className="comment-box w-100 p-2"
                        name="comment" id="comment" rows={3} autoFocus
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    ></textarea>
                </div>
                <div className="col-2">
                    <button type="submit" className="w-100 col-2 btn btn-primary" onClick={submitHandler}>{isReplying ? "REPLY" : (isEditing ? "UPDATE" : "SEND")}</button>
                </div>
            </div>
        </div>
    )
};

export default CommentInput;
