import { useEffect, useState } from "react";

function VoteCounter({ comment, type, parentIndex, updateScore }: any) {

    const [isVoted, setIsVoted] = useState<boolean>(comment.voted ?? false);
    const [score, setScore] = useState<number>(comment.upvotes);

    const upvoteHandler = () => {
        if (!isVoted) {
            setScore(prev => prev + 1);
            setIsVoted(true);
        }
    }

    // useEffect(() => {
    //     updateScore(type, score, isVoted, parentIndex);
    // }, [score, isVoted, type, updateScore, parentIndex]);

    const downVoteHandler = () => {
        if (isVoted) {
            setScore(prev => prev - 1);
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
