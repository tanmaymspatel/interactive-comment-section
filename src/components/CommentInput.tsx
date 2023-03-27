import { useEffect, useState } from "react";
import currentUSer from "../assets/images/avatars/image-juliusomo.png"
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import profilePicture from "../assets/images/avatars/image-juliusomo.png"

function CommentInput({ isReplying, addComments, addReplies, replyTo, setIsReplying, isEditing, setIsEditing, commentTobeEdited, type, updatedComments }: any) {

    const replyingToUser = isReplying ? `${replyTo}, ` : "";
    const [commentContent, setCommentContent] = useState<string>(replyingToUser);
    const [editedCommentContent, setEditedCommentContent] = useState<string>("")

    const onChangeHandler = (e: any) => {
        setCommentContent(e.target.value)
        isEditing ? setEditedCommentContent(e.target.value) : setEditedCommentContent("")
    }

    const submitHandler = () => {
        if (commentContent === "" || commentContent === " ") return;

        const newComment: ICommentsDetails = {
            id: Math.floor(Math.random() * 100) + 5,
            content: replyingToUser + commentContent.replace(replyingToUser, ""),
            commentingDate: new Date().toString(),
            upvotes: 0,
            userName: "juliusomo",
            profilePicture: profilePicture,
            isCurrentUSer: true,
            replies: [],
        };


        (isReplying && !isEditing) ? addReplies(newComment) : (isEditing ? updatedComments(type, editedCommentContent) : addComments(newComment));
        setIsReplying(false);
        setIsEditing(false);
        setCommentContent("");
    }

    const contentString = commentTobeEdited?.content + " ";

    useEffect(() => {
        (isEditing && !isReplying) ? setCommentContent(contentString) : setCommentContent(replyingToUser);
    }, [isEditing, contentString, replyingToUser, isReplying]);

    return (
        <div className="card new-comment rounded-3 p-4">
            <div className="row justify-content-between">
                <figure className="col-3 col-md-1 mb-0">
                    <img src={currentUSer} alt="current-user" className="profile-image" />
                </figure>
                <div className="col-md-9 comment-textarea mb-3 mb-md-0">
                    <textarea
                        className="comment-box w-100 p-2"
                        name="comment" id="comment" rows={3}
                        autoFocus={!isEditing && !isReplying ? true : false}
                        value={commentContent}
                        onChange={(e) => onChangeHandler(e)}
                    ></textarea>
                </div>
                <div className="col-9 col-md-2 text-end">
                    <button type="submit" className="comment-input-btn col-2 btn btn-primary" onClick={submitHandler}>{isReplying ? "REPLY" : (isEditing ? "UPDATE" : "SEND")}</button>
                </div>
            </div>
        </div>
    )
};

export default CommentInput;
