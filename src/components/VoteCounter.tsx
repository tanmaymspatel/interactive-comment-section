import { useState } from "react";

function VoteCounter({ comment, type, replies, comments, parentIndex }: any) {

    const [isVoted, setIsVoted] = useState<boolean>(comment.voted ?? false);
    const [score, setScore] = useState<number>(comment.upvotes);

    const upvoteHandler = () => {
        console.log({ type }, { comment }, { replies }, { comments }, { parentIndex });
        if (!isVoted) {
            let n = score + 1;
            setScore(n);
            console.log(score);

            setIsVoted(true);
            if (type === "reply") console.log(comments[parentIndex].replies);

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
