import React from 'react';
import { Link } from 'react-router-dom'; // Link 임포트 추가
import '../styles/AiaskPostBox.css';

interface AiaskPostBoxProps {
  postId: number;
  title: string;
  user: string;
  time: string;
  views: number;
  comments: number;
  text: string;
}

const AiaskPostBox: React.FC<AiaskPostBoxProps> = ({ postId, title, user, time, views, comments, text }) => {
  return (
    <div className="aiask-post-box">
      <div className="aiask-post-box-title">
        <Link to={`/aiask/${postId}`} className="aiask-post-link">
          {title}
        </Link>
      </div>
      <div className="aiask-post-box-text">{text}</div>
      <div className="aiask-post-bottom-box">
        <div className="aiask-post-user">{user}</div>
        <div className="aiask-post-time">{time}</div>
        <div className="eye">
          <img src="/Eye.png" alt="aiask" />
        </div>
        <div className="aiask-post-watch">{views}</div>
        <div className="comment">
          <img src="/comment.png" alt="aiask" />
        </div>
        <div className="aiask-post-comment">{comments}</div>
      </div>
    </div>
  );
};

export default AiaskPostBox;
