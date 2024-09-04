import React from 'react';
import './CommentsComponent.css';

type CommentsProps = {
  comments: string[];
  loggedIn: boolean;
  newComment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddComment: () => void;
};

const CommentsComponent: React.FC<CommentsProps> = ({
  comments, loggedIn, newComment, onChange, onAddComment
}) => {
  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index} className="comment-item">{comment}</li>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </ul>
      {loggedIn && (
        <>
          <textarea
            name="newComment"
            value={newComment}
            onChange={onChange}
            placeholder="Add a comment"
            className="comment-input"
          />
          <button onClick={onAddComment} className="comment-button">Add Comment</button>
        </>
      )}
    </div>
  );
};

export default CommentsComponent;
