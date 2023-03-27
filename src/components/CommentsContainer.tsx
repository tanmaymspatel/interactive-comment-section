import { useState, useEffect, useRef } from "react"
import { commentsData } from "../shared/data/data";
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import CommentInput from "./CommentInput";
import SingleCommentCard from "./SingleCommentCard";
/**
 * @returns interactive comment section
 */
function CommentsContainer() {

    const autoScroll = useRef<any>(null);
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
    /**
     * @name addComments
     * @description Addition of a new comment
     * @param newComment the comment which is to be added
     * 
     */
    const addComments = (newComment: ICommentsDetails) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
    };
    /**
     * @name addReplies
     * @description Additon of a new reply
     * @param reply the reply which is to be added
     */
    const addReplies = (reply: ICommentsDetails) => {
        let updatedComments = [...comments]
        updatedComments[replyCommentParentIndex].replies.push(reply);
        setComments(comments);
    }
    /**
     * @name deleteComment
     * @description Delete the comment
     * @param type type of comment, whether main-comment or reply in comment
     * @param id Id of the comment
     */
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
    /**
     * @name updatedComments 
     * @description Update thecomment 
     * @param type type of comment, whether main-comment or reply in comment
     * @param editedCommentContent the content of the comment which is edited
     */
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
    /**
     * @name updateScore
     * @description For updating the upvote score when upvoting/downvoting is clicked
     * @param type type of comment, whether main-comment or reply in comment
     * @param score updated value of the upvotes
     * @param method whether upvoting or downvoting
     * @param commentId Id of the comment
     */
    const updateScore = (type: string, score: number, method: string, commentId: number) => {
        let updatedComments = [...comments];
        switch (type) {
            case "main-comment": {
                updatedComments.forEach((comment) => {
                    if (comment.id === commentId) {
                        comment.upvotes = score;
                        comment.voted = method === "upvote" ? true : false;
                    }
                });
                setComments(updatedComments);
                break;
            }
            case "reply": {
                updatedComments.forEach((comment) => {
                    comment.replies.forEach((data) => {
                        if (data.id === commentId) {
                            data.upvotes = score;
                            data.voted = method === "upvote" ? true : false;
                        }
                    });
                });
                setComments(updatedComments);
                break;
            }
        }
    }
    // store the value of the comments in after the change in the comments array
    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments));
    }, [comments]);

    useEffect(() => {
        autoScroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [comments]);

    return (
        <>
            <div className="flex-grow-1 overflow-hidden pt-0 pt-md-5 pb-3">
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
                                        updateScore={updateScore}
                                    />
                                    {((isReplying || isEditing) && isParentComment && parentCommentIndex === index) ? <CommentInput updatedComments={updatedComments} type="main-comment" addComments={addComments} addReplies={addReplies} isReplying={isReplying} replyTo={replyTo} setIsReplying={setIsReplying} isEditing={isEditing} setIsEditing={setIsEditing} commentTobeEdited={commentTobeEdited} /> : null}
                                    <div className="ms-1 ps-2 ms-md-5 ps-md-5 border-3 border-start border-warning my-4">
                                        {
                                            comment?.replies?.length > 0 && comment?.replies?.map((cmt: ICommentsDetails, i: number) => {
                                                return (
                                                    <SingleCommentCard
                                                        key={cmt?.id}
                                                        comment={cmt}
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
                                                        updateScore={updateScore}
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
                <div ref={autoScroll}></div>
            </div>
            <CommentInput addComments={addComments} setIsReplying={setIsReplying} setIsEditing={setIsEditing} />
        </>
    )
};

export default CommentsContainer;
