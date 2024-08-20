import React from "react";

const Comment = ({ comment }) => {
    const { textOriginal, authorDisplayName, authorProfileImageUrl } = comment.snippet.topLevelComment.snippet;
    return (
        <div className="ml-12 mt-3 flex p-1 pl-3 bg-slate-50 rounded-lg">

            <img
                className="h-8 w-8 mt-1 rounded-full"
                alt="user"
                src={authorProfileImageUrl}
            />
            <div className="ml-2 flex flex-col">
                <h2 className="font-bold">{authorDisplayName}</h2>
                <p>{textOriginal}</p>
            </div>
        </div>
    );
};
  
export default Comment  
