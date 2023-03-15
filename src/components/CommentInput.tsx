import currentUSer from "../assets/images/avatars/image-juliusomo.png"

function CommentInput() {
    return (
        <div className="card new-comment rounded-3 p-4">
            <div className="row justify-content-between">
                <figure className="col-1 mb-0">
                    <img src={currentUSer} alt="current-user" className="profile-image" />
                </figure>
                <div className="col-9">
                    <textarea className="comment-box w-100 p-2" name="comment" id="comment" rows={3}></textarea>
                </div>
                <div className="col-2">
                    <button className="w-100 col-2 btn btn-primary">SEND</button>
                </div>
            </div>
        </div>
    )
};

export default CommentInput;
