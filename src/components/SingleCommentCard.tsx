import utilityServices from "../shared/services/utilityServices";
import reply from "../assets/images/icon-reply.svg"
import VoteCounter from "./VoteCounter";
import deleteIcon from "../assets/images/icon-delete.svg"
import editIcon from "../assets/images/icon-edit.svg"
import DeleteModel from "./DeleteModel";

function SingleCommentCard({ comment, replies, comments, type, parentIndex, setIsParentComment, setIsReply, setParentCommentIndex, setReplyParentIndex, setIsReplying, setReplyTo, setDeleting, deleting, deleteComment, index, setReplyCommentParentIndex, setDeleteReplyId, setIsEditing, setCommentTobeEdited, setEditedCommentParentIndex, setEditedReplyIndex, replyCommentIndex, updateScore }: any) {
    const { userName, commentingDate, content, profilePicture } = comment;

    const { commentPostedTime } = utilityServices;
    const commentDate = new Date(commentingDate);
    const currentDate = new Date();
    const commentTimeInMiliSeconds = currentDate.getTime() - commentDate.getTime();

    const replyHandler = () => {
        setIsReplying((prev: boolean) => !prev);
        setReplyTo(`@${comment?.userName}`);
        setReplyCommentParentIndex(index);
        switch (type) {
            case "main-comment":
                setIsParentComment((prev: boolean) => !prev);
                setParentCommentIndex(parentIndex)
                return;
            case "reply":
                setIsReply((prev: boolean) => !prev);
                setReplyParentIndex(parentIndex);
                return;
            default:
                return;
        }
    }

    const deleteCommentHandler = () => {
        setReplyCommentParentIndex(index);
        setDeleteReplyId(comment.id);
        setDeleting(true);
    };

    const editCommentHandler = () => {
        setEditedCommentParentIndex(index);
        setEditedReplyIndex(replyCommentIndex);
        setIsEditing(true);
        replyHandler();
        setIsReplying(false);
        setCommentTobeEdited(comment);
    }

    const deleteEditText = <div className="w-75 text-end d-flex align-items-center justify-content-between me-1 me-sm-3">
        <p className="text-danger d-flex align-items-center fw-bold mb-0 cursor-pointer transition opacity-hover" onClick={deleteCommentHandler}>
            <img src={deleteIcon} alt="delete-comment" />
            <span className="mx-1">Delete</span>
        </p>
        <p className="text-primary d-flex align-items-center fw-bold mb-0 cursor-pointer transition opacity-hover ms-1 ms-sm-3" onClick={editCommentHandler}>
            <img src={editIcon} alt="edit-comment" />
            <span className="mx-1">Edit</span>
        </p>
    </div>

    const replyText = <div className="w-100 text-end">
        <div className="cursor-pointer text-primary fw-bold"
            onClick={replyHandler}
        >
            <img src={reply} alt="reply" />
            <span className="mx-1">Reply</span>
        </div>
    </div>


    return (
        <>
            <div className="card rounded-3 mb-4 p-3 p-md-4">
                <div className="row position-relative">
                    <div className="vote-counter col-5 col-md-1 mt-3 mt-md-0">
                        <VoteCounter comment={comment} type={type} comments={comments} parentIndex={parentIndex} updateScore={updateScore} />
                    </div>
                    <div className="col-md-11">
                        <div className="header row">
                            <div className="col-md-8 d-flex align-items-center">
                                <img src={profilePicture} alt="profile" className="profile-image" />
                                <p className="mx-1 mx-md-3 mb-0 fw-bold">{userName}</p>
                                {comment.isCurrentUSer && <p className=" mb-0 px-3 py-1 text-light bg-primary rounded-1">you</p>}
                                <p className="mx-2 mb-0 text-nowrap text-truncate" title={`${commentPostedTime(commentTimeInMiliSeconds)} ago`}>{`${commentPostedTime(commentTimeInMiliSeconds)} ago`}</p>
                            </div>
                            <div className="col-action col-7 col-sm-4 d-flex align-items-center justify-content-end">
                                {comment.isCurrentUSer ? deleteEditText : replyText}
                            </div>
                        </div>
                        <p className="mb-0 pt-2">{content}</p>
                    </div>
                </div>
            </div>
            {deleting ? <DeleteModel setDeleting={setDeleting} type={type} comment={comment} deleteComment={deleteComment} /> : null}
        </>
    )
};

export default SingleCommentCard;