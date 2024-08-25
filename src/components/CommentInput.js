import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './CommentInput.css';

const CommentInput = ({ user }) => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [charCount, setCharCount] = useState(0);

  const handlePostComment = async () => {
    if (comment.trim() === '' || charCount > 250) return;

    let fileUrl = '';
    if (file) {
      const fileRef = ref(storage, `files/${file.name}`);
      await uploadBytes(fileRef, file);
      fileUrl = await getDownloadURL(fileRef);
    }

    await addDoc(collection(db, 'comments'), {
      text: comment,
      userId: user.uid,
      userName: user.displayName,
      userProfilePic: user.photoURL,
      fileUrl,
      taggedUsers,
      timestamp: new Date().toISOString(),
      reactions: {},
      reactionCount: 0,
    });

    setComment('');
    setFile(null);
  };

  return (
    <div className="comment-input">
      <ReactQuill
        value={comment}
        onChange={(value) => {
          setComment(value);
          setCharCount(value.replace(/<[^>]*>/g, '').length);
        }}
        placeholder="Write a comment..."
      />
      {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
      <p className="char-count">{charCount}/250 characters</p>
      <button className="post-button" onClick={handlePostComment}>Post Comment</button>
    </div>
  );
};

export default CommentInput;




