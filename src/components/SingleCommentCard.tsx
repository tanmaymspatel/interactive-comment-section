import utilityServices from "../shared/services/utilityServices";
import reply from "../assets/images/icon-reply.svg"

function SingleCommentCard({ upvotes, userName, commentingDate, content, profilePicture }: any) {

    const { commentPostedTime } = utilityServices;
    const commentDate = new Date(commentingDate);
    const currentDate = new Date();
    const commentTimeInMiliSeconds = currentDate.getTime() - commentDate.getTime();

    return (
        <div className="card rounded-3 my-4 p-4">
            <div className="row">
                <div className="col-1">
                    <div className="upvote-counter d-flex flex-column align-items-center bg-info rounded-3">
                        <button className="btn text-primary">+</button>
                        <p className="mb-0">{upvotes}</p>
                        <button className="btn text-primary">-</button>
                    </div>
                </div>
                <div className="col-11">
                    <div className="header row">
                        <div className="col-6 d-flex align-items-center">
                            <img src={profilePicture} alt="profile" className="profile-image" />
                            <p className="mx-3 mb-0">{userName}</p>
                            <p className="mx-3 mb-0">{`${commentPostedTime(commentTimeInMiliSeconds)} ago`}</p>
                        </div>
                        <div className="col-6">
                            <div className="text-end">
                                <div className="cursor-pointer text-primary fw-bold">
                                    <img src={reply} alt="reply" />
                                    <span className="mx-1">Reply</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
};

export default SingleCommentCard;