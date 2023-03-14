import { useState } from "react";

function VoteCounter({ comment, type }: any) {

    const [isVoted, setIsVoted] = useState<boolean>(comment.voted ?? false);
    const [score, setScore] = useState<number>(comment.upvotes);

    const upvoteHandler = () => {
        console.log(type);
        if (!isVoted) {
            setScore(score + 1);
            setIsVoted(true);
        }
    }

    const downVoteHandler = () => {
        if (isVoted) {
            setScore(score - 1);
            setIsVoted(false);
        }
    }

    return (
        <div className="h-100 d-flex flex-column align-items-center justify-content-center bg-info rounded-3">
            <button className="btn btn-actions fw-bold" onClick={upvoteHandler}>+</button>
            <p className="mb-0 fw-bold text-primary">{score}</p>
            <button className="btn btn-actions fw-bold" onClick={downVoteHandler}>-</button>
        </div>
    )
};

export default VoteCounter;
