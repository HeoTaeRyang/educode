import React, { useState, useEffect } from 'react';
import axios from 'axios';

type FreePost = {
  id: number;
  title: string;
  datetime: string;
  views: number;
  recommends: number;
  content: string;
};

const FreeLook = ({ postId }: { postId: number }) => {
  const [post, setPost] = useState<FreePost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState(''); // 본문 상태

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
      try {
          const requestData = {
            postType: "Post",
            postNumber: postId,
            content: comment,
            id: localStorage.getItem('userid'),
          };

          const response = await axios.post(
              'http://localhost:5000/comment',
              requestData,
              { headers: { 'Content-Type': 'application/json' } }
          );
          alert(response.data.answer);
          window.location.reload();
      } catch (e) {
          console.error('error:', e);
      }
  };
  
  const handleRecommend  = async () => {
    try {
        const requestData = {
          postNumber: postId,
          id: localStorage.getItem('userid'),
        };

        const response = await axios.post(
            'http://localhost:5000/recommend',
            requestData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        alert(response.data.answer);
        window.location.reload();
    } catch (e) {
        console.error('error:', e);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const requestData = {
          postNumber: postId,
        };
        const response = await axios.post(
          'http://localhost:5000/postLook',
          requestData,
          { headers: { 'Content-Type': 'application/json' } }
        ); // URL로 postId 전달
        setPost(response.data.post);
        setComments(response.data.comments);
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
          <p>작성자: {post.id} | 작성일: {post.datetime} | 조회수: {post.views} | 추천수: {post.recommends}</p>
          <div>제목:{post.title}</div>
          <div>{post.content}</div>
          <button onClick={handleRecommend}>
            추천하기
          </button>
          <div className="comments-section">
            <div className="comments-title">댓글</div>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-author">{comment.id}</div>
                  <div className="comment-datetime">{comment.datetime}</div>
                  <div className="comment-text">{comment.content}</div>
                </div>
              ))
            ) : (
              <div>댓글이 없습니다.</div>
            )}
          </div>
          <div className="comment-input-section">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="댓글을 입력하세요..."
              className="comment-input"
            />
            <button
             className="comment-submit-button"
             onClick={handleCommentSubmit}>등록</button>
          </div>
        </>
      ) : (
        <p>게시글을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default FreeLook;
