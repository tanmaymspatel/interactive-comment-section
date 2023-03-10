import { useState, useEffect } from "react"
import { commentsData } from "../shared/data/data";
import { ICommentsDetails } from "../shared/models/CommentsDetails";


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
        <div className="my-5">
            {
                comments.map((comment: ICommentsDetails) => {
                    return (
                        <div className="card rounded-3 my-3 p-3" key={comment?.id}>
                            <div className="row">
                                <div className="col-2">{comment?.upvotes}</div>
                                <div className="col-10">
                                    <div className="header row">
                                        <div className="col-6 d-flex align-items-center">
                                            <p>profile-picture</p>
                                            <p>{comment?.userName}</p>
                                            <p>{comment.commentingDate}</p>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-end">
                                                <p>Reply</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
};

export default CommentsContainer;
