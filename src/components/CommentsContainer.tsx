import { useState, useEffect } from "react"
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import CommentInput from "./CommentInput";
import SingleCommentCard from "./SingleCommentCard";

function CommentsContainer() {

    const allComments = JSON.parse(localStorage.getItem("comments") as string)

    const [comments, setComments] = useState<ICommentsDetails[]>(allComments);
    const [isParentComment, setIsParentComment] = useState<boolean>(false);
    const [isReplyComment, setIsReply] = useState<boolean>(false);
    const [isReplying, setISReplying] = useState<boolean>(false);
    const [parentCommentIndex, setParentCommentIndex] = useState<number>(0);
    const [replyParentIndex, setReplyParentIndex] = useState<number>(0);

    const addComments = (newComment: ICommentsDetails) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        localStorage.setItem("comments", JSON.stringify(comments));
    };

    useEffect(() => {
        console.log(comments);
        localStorage.setItem("comments", JSON.stringify(comments))
    }, [comments]);


    return (
        <>
            <div className="flex-grow-1 overflow-hidden pt-5 pb-3">
                <div className="h-100 overflow-auto pe-3">
                    {
                        comments.map((comment: ICommentsDetails, index: number) => {
                            return (
                                <div key={comment?.id}>
                                    <SingleCommentCard
                                        key={comment?.id}
                                        comment={comment}
                                        comments={comments}
                                        mainIndex={index}
                                        setISReplying={setISReplying}
                                        setIsParentComment={setIsParentComment}
                                        setParentCommentIndex={setParentCommentIndex}
                                        type="main-comment"
                                    />
                                    {(isParentComment && parentCommentIndex === index) ? <CommentInput isReplying={isReplying} /> : null}
                                    <div className="ms-5 ps-5 border-3 border-start border-warning my-4">
                                        {
                                            comment?.replies?.length > 0 && comment.replies.map((cmt: ICommentsDetails) => {
                                                return (
                                                    <SingleCommentCard
                                                        key={cmt?.id}
                                                        comment={cmt}
                                                        replies={comment.replies}
                                                        comments={comments}
                                                        type="reply"
                                                        setISReplying={setISReplying}
                                                        setIsReply={setIsReply}
                                                        parentIndex={index}
                                                        setReplyParentIndex={setReplyParentIndex}
                                                    />
                                                )
                                            })
                                        }
                                        {(isReplyComment && (replyParentIndex === index)) ? <CommentInput isReplying={isReplying} /> : null}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CommentInput addComments={addComments} />
        </>
    )
};

export default CommentsContainer;
