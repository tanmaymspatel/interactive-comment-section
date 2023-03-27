import { useState } from "react";
/**
 * @returns counter to manipulate the upvotes
 */
function VoteCounter({ comment, type, updateScore }: any) {

    const [isVoted, setIsVoted] = useState<boolean>(comment.voted ?? false);
    const [score, setScore] = useState<number>(comment.upvotes);

    const upvoteHandler = () => {
        if (comment.isCurrentUSer) return;
        if (!isVoted) {
            let n = score + 1;
            setScore(n);
            updateScore(type, n, "upvote", comment?.id);
            setIsVoted(true);
        }
    }

    const downVoteHandler = () => {
        if (comment.isCurrentUSer) return;
        if (isVoted) {
            let n = score - 1;
            setScore(n);
            updateScore(type, n, "downvote", comment?.id);
            setIsVoted(false);
        }
    }

    return (
        <div className="h-100 d-flex flex-md-column align-items-center justify-content-center bg-info rounded-3">
            <button className="btn btn-actions ms-2 ms-md-0 fw-bold" onClick={upvoteHandler}>+</button>
            <p className="mb-0 fw-bold text-primary mx-1 mx-sm-4 mx-md-0">{score}</p>
            <button className="btn btn-actions me-2 me-md-0 fw-bold" onClick={downVoteHandler}>-</button>
        </div>
    )
};

export default VoteCounter;
