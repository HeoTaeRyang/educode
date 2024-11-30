import { useState, useEffect } from "react";
import "../styles/AiaskLook.css";
import axios from "axios";

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
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get<{
          post: AiaskPost;
          aiAnswer: AiAnswer;
          comments: any[];
        }>(`http://localhost:5000/aiaskPost/${postId}`);  // URL로 postId 전달
        setPost(postResponse.data.post);
        setAiAnswer(postResponse.data.aiAnswer);
        setComments(postResponse.data.comments);
      } catch (error) {
        console.error("게시글을 가져오는 중 오류 발생:", error);
      }
    };

    if (postId) {  // postId가 있을 때만 데이터 요청
      fetchPostData();
    }
  }, [postId]);  // postId가 변경될 때마다 데이터 다시 요청

  return (
    <div className="aiask-look-container">
      {!post ? (
        <div>로딩 중...</div> // 데이터 로딩 중일 때 표시
      ) : (
        <>
          <div className="aiask-post-title">{post.title}</div>
          <div className="aiask-post-info">
            <span>글쓴이: {post.user}</span>
            <span>작성일: {post.time}</span>
            <span>조회수: {post.views}</span>
            <span>추천수: {post.comments}</span>
          </div>
          <div className="aiask-post-content">{post.text}</div>
          {aiAnswer && (
            <>
              <div className="ai-answer-title">{aiAnswer.title}</div>
              <div className="ai-answer-content">{aiAnswer.text}</div>
            </>
          )}
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
          <div className="comment-input-section">
            <textarea
              placeholder="댓글을 입력하세요..."
              className="comment-input"
            />
            <button className="comment-submit-button">등록</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AiaskLook;

