import utilityServices from "../shared/services/utilityServices";
import reply from "../assets/images/icon-reply.svg"
import VoteCounter from "./VoteCounter";

function SingleCommentCard({ comment, replies, comments, type, parentIndex, updateScore }: any) {
    const { userName, commentingDate, content, profilePicture } = comment;

    const { commentPostedTime } = utilityServices;
    const commentDate = new Date(commentingDate);
    const currentDate = new Date();
    const commentTimeInMiliSeconds = currentDate.getTime() - commentDate.getTime();

    return (
        <div className="card rounded-3 mb-4 p-4">
            <div className="row">
                <div className="col-1">
                    <VoteCounter comment={comment} type={type} replies={replies} comments={comments} parentIndex={parentIndex} updateScore={updateScore} />
                </div>
                <div className="col-11">
                    <div className="header row">
                        <div className="col-8 d-flex align-items-center">
                            <img src={profilePicture} alt="profile" className="profile-image" />
                            <p className="mx-3 mb-0 fw-bold">{userName}</p>
                            {comment.isCurrentUSer && <p className=" mb-0 px-3 py-1 text-light bg-primary rounded-1">you</p>}
                            <p className="mx-2 mb-0">{`${commentPostedTime(commentTimeInMiliSeconds)} ago`}</p>
                        </div>
                        <div className="col-4">
                            <div className="text-end">
                                <div className="cursor-pointer text-primary fw-bold">
                                    <img src={reply} alt="reply" />
                                    <span className="mx-1">Reply</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="mb-0 pt-2">{content}</p>
                </div>
            </div>
        </div>
    )
};

export default SingleCommentCard;