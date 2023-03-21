function DeleteModel({ setDeleting, comment, type, deleteComment }: any) {

    const deleteCommentHandler = () => {
        deleteComment(type, comment?.id);
        setDeleting(false);
    }
    return (
        <div className="overlay position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25">
            <div className="content w-25 mx-auto position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center">
                <div className="bg-light p-4 rounded-4">
                    <h4 className="py-1">Delete Comment</h4>
                    <p className="text-success pb-1">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    <div className="d-flex mx-0 justify-content-between">
                        <button className="w-100 me-2 btn btn-dark text-uppercase" onClick={() => setDeleting(false)}>No,Cancel</button>
                        <button className="w-100 ms-2 btn btn-danger text-uppercase text-light" onClick={deleteCommentHandler}>Yes, Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DeleteModel;
