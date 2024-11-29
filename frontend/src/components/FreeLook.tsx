import React, { useState, useEffect } from 'react';
import axios from 'axios';

type FreePost = {
  id: number;
  title: string;
  user: string;
  time: string;
  views: number;
  text: string;
};

const FreeLook = ({ postId }: { postId: number }) => {
  const [post, setPost] = useState<FreePost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/freeposts/${postId}`);
        setPost(response.data.post);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="freelook-container">
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>작성자: {post.user} | 작성일: {post.time} | 조회수: {post.views}</p>
          <div>{post.text}</div>
        </>
      ) : (
        <p>게시글을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default FreeLook;
