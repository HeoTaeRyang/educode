// import React from 'react'; // 필요하지 않으므로 삭제합니다.
import '../styles/AiaskPostBox.css';

interface AiaskPostBoxProps {
  title: string;
  user: string;
  time: string;
  views: number;
  comments: number;
  text: string;
}

const AiaskPostBox: React.FC<AiaskPostBoxProps> = ({ title, user, time, views, comments, text }) => {
  return (
    <div className="aiask-post-box">
      <div className="aiask-post-box-title">
        <div>{title}</div>
      </div>
      <div className="aiask-post-user">{user}</div>
      <div className="aiask-post-time">{time}</div>
      <div className="aiask-post-watch">{views}</div>
      <div className="aiask-post-comment">{comments}</div>
      <div className="aiask-post-box-text">{text}</div>
      <img src="/Eye.png" alt="aiask" />
      <img src="/comment.png" alt="aiask" />
      
    </div>
  );
};

export default AiaskPostBox;
