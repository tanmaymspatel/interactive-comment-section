import { useState, useEffect } from "react"
import { commentsData } from "../shared/data/data";
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import CommentInput from "./CommentInput";
import SingleCommentCard from "./SingleCommentCard";



function CommentsContainer() {

    const [comments, setComments] = useState<ICommentsDetails[]>(commentsData);
    // const [isReplying, setIsReplying] = useState<boolean>(false);
    const [isParentComment, setIsParentComment] = useState<boolean>(false);
    const [isReplyComment, setIsReply] = useState<boolean>(false);
    const [parentCommentIndex, setParentCommentIndex] = useState<number>(0);
    const [replyCommentIndex, setReplyCommentIndex] = useState<number>(0);

    // const updateScore = (score: number, type: string, id: number, isVoted: boolean) => {
    //     let updatedComments = [...comments]

    //     if (type === "main-comment") {
    //         updatedComments.forEach(data => {
    //             data.upvotes = score;
    //             data.voted = isVoted;
    //         })
    //     } else if (type === "reply") {
    //         updatedComments.forEach((comment) => {
    //             comment.replies.forEach((data) => {
    //                 if (data.id === id) {
    //                     data.upvotes = score;
    //                     data.voted = isVoted;
    //                 }
    //             });
    //         });
    //     }
    //     setComments(updatedComments);
    //     console.log({ comments });

    // }

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments))
    }, [comments]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("comments") as string);
        if (data.length > 0) setComments(data);
    }, [setComments]);

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
                                        setIsParentComment={setIsParentComment}
                                        setParentCommentIndex={setParentCommentIndex}
                                        type="main-comment"
                                    />
                                    {(isParentComment && parentCommentIndex === index) ? <CommentInput /> : null}
                                    <div className="ms-5 ps-5 border-3 border-start border-warning my-4">
                                        {
                                            comment?.replies?.length > 0 && comment.replies.map((cmt: ICommentsDetails, i: number) => {
                                                return (
                                                    <SingleCommentCard
                                                        key={cmt?.id}
                                                        comment={cmt}
                                                        replies={comment.replies}
                                                        comments={comments}
                                                        type="reply"
                                                        setIsReply={setIsReply}
                                                        parentIndex={index}
                                                        replyIndex={i}
                                                        setReplyCommentIndex={setReplyCommentIndex}
                                                    />
                                                )
                                            })
                                        }
                                        {(isReplyComment) ? <CommentInput /> : null}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CommentInput />
        </>
    )
};

export default CommentsContainer;
