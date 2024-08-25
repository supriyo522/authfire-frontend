import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Comment from './Comment';
import './CommentsList.css';

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, 'comments'),
        orderBy(sortOption === 'latest' ? 'timestamp' : 'reactionCount', 'desc'),
        limit(8)
      );
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    };

    fetchComments();
  }, [sortOption]);

  return (
    <div className="comments-list">
      <select className="sort-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="popular">Popular</option>
      </select>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;


