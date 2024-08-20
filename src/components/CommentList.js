import React from "react";
import Comment from "./Comment";

const CommentList = ({ data }) => {
    if (!data?.data?.items || data.data.items.length === 0) {
        return null;
    }
    return (
        <div className="w-4/6">
        <div className="font-bold text-xl ml-12 mt-5">
            <h1>Comments</h1>
        </div>
            {data.data.items.map((item, index) => (
                <Comment key={index} comment={item} />
            ))}
        </div>
    );
};

export default CommentList;

