import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return null;
    }
    return (
        <div className="w-full mx-auto">
            <div className="font-bold text-xl mt-5">
                <h1>Comments</h1>
            </div>
            {comments.map((item, index) => (
                <Comment key={index} comment={item} />
            ))}
        </div>
    );
};

export default CommentList;

