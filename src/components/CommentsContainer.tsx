import { useState, useEffect } from "react"
import { commentsData } from "../shared/data/data";
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import CommentInput from "./CommentInput";
import SingleCommentCard from "./SingleCommentCard";

function CommentsContainer() {

    const allComments = JSON.parse(localStorage.getItem("comments") as string);

    const [comments, setComments] = useState<ICommentsDetails[]>(allComments ?? commentsData);
    const [isParentComment, setIsParentComment] = useState<boolean>(false);
    const [isReplyComment, setIsReplyComment] = useState<boolean>(false);
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [parentCommentIndex, setParentCommentIndex] = useState<number>(0);
    const [replyParentIndex, setReplyParentIndex] = useState<number>(0);
    const [replyTo, setReplyTo] = useState<string>("");
    const [deleting, setDeleting] = useState<boolean>(false);
    const [replyCommentParentIndex, setReplyCommentParentIndex] = useState<number>(0);
    const [deleteReplyId, setDeleteReplyId] = useState<number>(0);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [commentTobeEdited, setCommentTobeEdited] = useState<ICommentsDetails>({} as ICommentsDetails);
    const [editedCommentParentIndex, setEditedCommentParentIndex] = useState<number>(0);
    const [editedReplyIndex, setEditedReplyIndex] = useState<number>(0);

    const addComments = (newComment: ICommentsDetails) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        localStorage.setItem("comments", JSON.stringify(comments));
    };

    const addReplies = (parentId: number, reply: ICommentsDetails) => {
        comments.forEach(comment => {
            if (comment.id === parentId) {
                comment.replies.push(reply);
            }
            setComments(comments);
            localStorage.setItem("comments", JSON.stringify(comments))
        })
    }

    const deleteComment = (type: string, id: number) => {
        let updatedComments = [...comments];
        switch (type) {
            case "main-comment": {
                updatedComments = updatedComments.filter(comment => comment.id !== id);
                setComments(updatedComments);
                return;
            }
            case "reply": {
                const updatedReplies = updatedComments[replyCommentParentIndex].replies.filter(reply => reply.id !== deleteReplyId)
                updatedComments[replyCommentParentIndex].replies = updatedReplies;
                setComments(updatedComments);
                return;
            }
            default:
                return;
        }
    }

    const updatedComments = (type: string, editedCommentContent: string) => {
        let updatedComments = [...comments]
        commentTobeEdited.content = editedCommentContent;
        switch (type) {
            case "main-comment": {
                updatedComments.splice(editedCommentParentIndex, 1, commentTobeEdited)
                setComments(updatedComments);
                break;
            }
            case "reply": {
                updatedComments[editedCommentParentIndex]?.replies?.splice(editedReplyIndex, 1, commentTobeEdited)
                setComments(updatedComments);
                break;
            }
        }
    }

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments))
    }, [comments]);


    return (
        <>
            <div className="flex-grow-1 overflow-hidden pt-5 pb-3">
                <div className="h-100 overflow-auto pe-3">
                    {
                        comments?.map((comment: ICommentsDetails, index: number) => {
                            return (
                                <div key={comment?.id}>
                                    <SingleCommentCard
                                        key={comment?.id}
                                        comment={comment}
                                        comments={comments}
                                        parentIndex={index}
                                        setIsReplying={setIsReplying}
                                        setIsParentComment={setIsParentComment}
                                        setParentCommentIndex={setParentCommentIndex}
                                        type="main-comment"
                                        setReplyTo={setReplyTo}
                                        setDeleting={setDeleting}
                                        deleting={deleting}
                                        deleteComment={deleteComment}
                                        index={index}
                                        setIsEditing={setIsEditing}
                                        setReplyCommentParentIndex={setReplyCommentParentIndex}
                                        setDeleteReplyId={setDeleteReplyId}
                                        setCommentTobeEdited={setCommentTobeEdited}
                                        setEditedCommentParentIndex={setEditedCommentParentIndex}
                                        setEditedReplyIndex={setEditedReplyIndex}
                                    />
                                    {((isReplying || isEditing) && isParentComment && parentCommentIndex === index) ? <CommentInput updatedComments={updatedComments} type="main-comment" addComments={addComments} addReplies={addReplies} isReplying={isReplying} replyTo={replyTo} setIsReplying={setIsReplying} isEditing={isEditing} setIsEditing={setIsEditing} commentTobeEdited={commentTobeEdited} /> : null}
                                    <div className="ms-5 ps-5 border-3 border-start border-warning my-4">
                                        {
                                            comment?.replies?.length > 0 && comment?.replies?.map((cmt: ICommentsDetails, i: number) => {
                                                return (
                                                    <SingleCommentCard
                                                        key={cmt?.id}
                                                        comment={cmt}
                                                        replies={comment.replies}
                                                        comments={comments}
                                                        type="reply"
                                                        setIsReplying={setIsReplying}
                                                        setIsReply={setIsReplyComment}
                                                        parentIndex={index}
                                                        setReplyParentIndex={setReplyParentIndex}
                                                        setReplyTo={setReplyTo}
                                                        setDeleting={setDeleting}
                                                        deleting={deleting}
                                                        deleteComment={deleteComment}
                                                        index={index}
                                                        setReplyCommentParentIndex={setReplyCommentParentIndex}
                                                        setDeleteReplyId={setDeleteReplyId}
                                                        setIsEditing={setIsEditing}
                                                        setCommentTobeEdited={setCommentTobeEdited}
                                                        setEditedCommentParentIndex={setEditedCommentParentIndex}
                                                        setEditedReplyIndex={setEditedReplyIndex}
                                                        replyCommentIndex={i}
                                                    />
                                                )
                                            })
                                        }
                                        {((isReplying || isEditing) && isReplyComment && (replyParentIndex === index)) ? <CommentInput updatedComments={updatedComments} type="reply" addComments={addComments} addReplies={addReplies} isReplying={isReplying} replyTo={replyTo} setIsReplying={setIsReplying} isEditing={isEditing} setIsEditing={setIsEditing} commentTobeEdited={commentTobeEdited} /> : null}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CommentInput addComments={addComments} setIsReplying={setIsReplying} setIsEditing={setIsEditing} />
        </>
    )
};

export default CommentsContainer;
