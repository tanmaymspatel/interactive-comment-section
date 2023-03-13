import { useState, useEffect } from "react"
import { commentsData } from "../shared/data/data";
import { ICommentsDetails } from "../shared/models/CommentsDetails";
import SingleCommentCard from "./SingleCommentCard";


function CommentsContainer() {

    const [comments, setComments] = useState<ICommentsDetails[]>([]);

    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(commentsData))
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("comments") as string);
        if (data.length > 0) setComments(data);
    }, [setComments]);

    return (
        <div className="py-5">
            {
                comments.map((comment: ICommentsDetails) => {
                    return (
                        <div key={comment?.id}>
                            <SingleCommentCard
                                key={comment?.id}
                                upvotes={comment?.upvotes}
                                userName={comment?.userName}
                                profilePicture={comment?.profilePicture}
                                commentingDate={comment?.commentingDate}
                                content={comment?.content}
                            />
                            <div className="ms-5 ps-5 border-3 border-start border-warning my-4">
                                {
                                    comment?.replies?.length > 0 && comment.replies.map((comment: ICommentsDetails) => {
                                        return (
                                            <SingleCommentCard
                                                key={comment?.id}
                                                upvotes={comment?.upvotes}
                                                userName={comment?.userName}
                                                profilePicture={comment?.profilePicture}
                                                commentingDate={comment?.commentingDate}
                                                content={comment?.content}
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
    )
};

export default CommentsContainer;
