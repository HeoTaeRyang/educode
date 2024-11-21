import React, { useState, useEffect } from 'react';
import '../styles/AiaskLook.css';
import axios from 'axios';

type AiaskPost = {
   id: number;
   title: string;
   user: string;
   time: string;
   views: number;
   comments: number;
   text: string;
};

type AiAnswer = {
  title: string;
  text: string;
};

const AiaskLook = ({ postId }: { postId: number }) => {
  const [post, setPost] = useState<AiaskPost | null>(null);
  const [aiAnswer, setAiAnswer] = useState<AiAnswer | null>(null);
  const [comments, setComments] = useState<any[]>([]); // 댓글 관련은 빈 공백으로 처리

  // 게시글 및 AI 답변 가져오기
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:5000/aiaskPost/${postId}`);
        setPost(postResponse.data.post);  // 게시글 정보
        setAiAnswer(postResponse.data.aiAnswer); // AI 답변
        setComments(postResponse.data.comments); // 댓글
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  return (
    <div className="aiask-look-container">
      {post && (
        <>
          {/* 글 제목 */}
          <div className="aiask-post-title">
            {post.title}
          </div>

          {/* 글쓴이, 작성일, 조회수, 추천수 */}
          <div className="aiask-post-info">
            <span>글쓴이: {post.user}</span>
            <span>작성일: {post.time}</span>
            <span>조회수: {post.views}</span>
            <span>추천수: {post.comments}</span>
          </div>

          {/* 글 내용 */}
          <div className="aiask-post-content">
            {post.text}
          </div>

          {/* AI 답변 제목 */}
          {aiAnswer && (
            <div className="ai-answer-title">
              {aiAnswer.title}
            </div>
          )}

          {/* AI 답변 내용 */}
          {aiAnswer && (
            <div className="ai-answer-content">
              {aiAnswer.text}
            </div>
          )}
         {/*
           댓글 영역 
          <div className="comments-section">
            <div className="comments-title">댓글</div>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-author">{comment.author}</div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              ))
            ) : (
              <div>댓글이 없습니다.</div>
            )}
          </div>  
          

          댓글 입력창 및 등록 버튼 
          <div className="comment-input-section">
            <textarea placeholder="댓글을 입력하세요..." className="comment-input" />
            <button className="comment-submit-button">등록</button>
          </div>
          */}
        </>
      )}
    </div>
  );
};

export default AiaskLook;
