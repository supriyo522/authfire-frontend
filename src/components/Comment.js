import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import './Comment.css';

const Comment = ({ comment }) => {
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState(comment.replies || []);

  const handleReaction = async (type) => {
    const commentRef = doc(db, 'comments', comment.id);
    await updateDoc(commentRef, {
      [`reactions.${type}`]: increment(1),
      reactionCount: increment(1),
    });
  };

  const handleReply = async () => {
    const newReply = {
      text: reply,
      userId: comment.userId,
      userName: comment.userName,
      timestamp: new Date().toISOString(),
    };
    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    setReply('');

    const commentRef = doc(db, 'comments', comment.id);
    await updateDoc(commentRef, {
      replies: updatedReplies,
    });
  };

  return (
    <div className="comment">
      <img src={comment.userProfilePic} alt={comment.userName} className="comment-profile-pic" />
      <div className="comment-body">
        <h4>{comment.userName}</h4>
        <p>
          {showMore || comment.text.split('\n').length <= 5 ? (
            <span dangerouslySetInnerHTML={{ __html: comment.text }}></span>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: comment.text.split('\n').slice(0, 5).join('\n') + '...' }}></span>
          )}
        </p>
        {comment.text.split('\n').length > 5 && (
          <button className="comment-toggle" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
        {comment.fileUrl && (
          <div className="comment-file">
            <img src={comment.fileUrl} alt="attachment" className="comment-file-img" />
          </div>
        )}
        <p className="comment-timestamp">{formatDistanceToNow(new Date(comment.timestamp))} ago</p>
        <div className="comment-reactions">
          <button onClick={() => handleReaction('like')}>Like ({comment.reactions?.like || 0})</button>
          <button onClick={() => handleReaction('dislike')}>Dislike ({comment.reactions?.dislike || 0})</button>
        </div>
        <div className="comment-replies">
          {replies.map((reply, index) => (
            <div key={index} className="comment-reply">
              <h5>{reply.userName}</h5>
              <p>{reply.text}</p>
              <p className="comment-timestamp">{formatDistanceToNow(new Date(reply.timestamp))} ago</p>
            </div>
          ))}
          {replies.length < 2 && (
            <div className="comment-reply-input">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply..."
              />
              <button onClick={handleReply}>Reply</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;



