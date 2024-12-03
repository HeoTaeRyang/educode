import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FreePostBox.css';

type FreePostBoxProps = {
  postId: number;   // 게시글 ID
  title: string;    // 제목
  author: string;   // 작성자
  date: string;     // 작성일
  views: number;    // 조회수
  comments: number; // 댓글 수
  recommends: number; //추천 수
};

const FreePostBox: React.FC<FreePostBoxProps> = ({ postId, title, author, date, views, comments, recommends }) => {
  return (
    <div className="free-post-box">
      <div className="free-post-box-title">
        <Link to={`/free/${postId}`} className="free-post-link">
          {title}
        </Link>
      </div>
       <div className="free-post-bottom-box">
        <div className="free-post-user">{author}</div>
        <div className="free-post-time">{date}</div>
        <div className="like">
          <img src="/like.png" alt="aiask" />
        </div>
        <div className="free-post-recommends">{recommends}</div>
        <div className="eye">
          <img src="/Eye.png" alt="aiask" />
        </div>
        <div className="free-post-watch">{views}</div>
        <div className="eye">
          <img src="/comment.png" alt="aiask" />
        </div>
        <div className="free-post-comment">{comments}</div>
        </div>
       </div>
  );
};

export default FreePostBox;
