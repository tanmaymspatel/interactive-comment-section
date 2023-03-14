import utilityServices from "../shared/services/utilityServices";
import reply from "../assets/images/icon-reply.svg"
import VoteCounter from "./VoteCounter";

function SingleCommentCard({ comment, replies, comments, type }: any) {
    const { userName, commentingDate, content, profilePicture } = comment;

    const { commentPostedTime } = utilityServices;
    const commentDate = new Date(commentingDate);
    const currentDate = new Date();
    const commentTimeInMiliSeconds = currentDate.getTime() - commentDate.getTime();

    // console.log({ replies }, { comments }, { type });

    return (
        <div className="card rounded-3 mb-4 p-4">
            <div className="row">
                <div className="col-1">
                    <VoteCounter comment={comment} type={type} />
                </div>
                <div className="col-11">
                    <div className="header row">
                        <div className="col-8 d-flex align-items-center">
                            <img src={profilePicture} alt="profile" className="profile-image" />
                            <p className="mx-3 mb-0 fw-bold">{userName}</p>
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