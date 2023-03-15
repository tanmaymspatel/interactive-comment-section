import { useState, useEffect } from "react"
import { commentsData } from "../shared/data/data";
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import SingleCommentCard from "./SingleCommentCard";
import currentUSer from "../assets/images/avatars/image-juliusomo.png"


function CommentsContainer() {

    const [comments, setComments] = useState<ICommentsDetails[]>(commentsData);

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
                                        type="main-comment"
                                    />
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
                                                        parentIndex={index}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="card new-comment rounded-3 p-4">
                <div className="row justify-content-between">
                    <figure className="col-1 mb-0">
                        <img src={currentUSer} alt="current-user" className="profile-image" />
                    </figure>
                    <div className="col-9">
                        <textarea className="comment-box w-100 p-2" name="comment" id="comment" rows={3}></textarea>
                    </div>
                    <div className="col-2">
                        <button className="w-100 col-2 btn btn-primary">SEND</button>
                    </div>
                </div>
            </div>

        </>
    )
};

export default CommentsContainer;
