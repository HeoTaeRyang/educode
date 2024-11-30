import { useState, useEffect } from "react";
import "../styles/AiaskLook.css";
import axios from "axios";

type AiaskPost = {
  title: string;
  id: string;
  datetime: string;
  views: number;
  question: number;
  answer: string;
};

const AiaskLook = ({ postId }: { postId: number }) => {
  const [post, setPost] = useState<AiaskPost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState(''); // 본문 상태

  const fetchPostData = async () => {
    try {
      const requestData = {
        postNumber: postId,
      };

      const response = await axios.post(
        'http://localhost:5000/aiaskPostLook',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      ); // URL로 postId 전달
      setPost(response.data.post);
      setComments(response.data.comments);
    } catch (error) {
      console.error("게시글을 가져오는 중 오류 발생:", error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
      try {
          const requestData = {
            postType: "AI_Post",
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

  useEffect(() => {
    fetchPostData();
  }, [postId]);  // postId가 변경될 때마다 데이터 다시 요청

  return (
    <div className="aiask-look-container">
      {!post ? (
        <div>로딩 중...</div> // 데이터 로딩 중일 때 표시
      ) : (
        <>
          <div className="aiask-post-title">{post.title}</div>
          <div className="aiask-post-info">
            <span>글쓴이: {post.id}</span>
            <span>작성일: {post.datetime}</span>
            <span>조회수: {post.views}</span>
          </div>
          <div className="aiask-post-content">{post.question}</div>
          {(
            <>
              <div className="ai-answer-content">{post.answer}</div>
            </>
          )}
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
      )}
    </div>
  );
};

export default AiaskLook;

