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
    <div className="freepost-box">
      <div className="freepost-box-title">
        <Link to={`/free/${postId}`} className="freepost-link">
          {title}
        </Link>
      </div>
      <div className="freepost-box-details">
        <p>작성자: {author}</p>
        <p>작성일: {date}</p>
        <div className="freepost-stats">
          <div className="freepost-views">
            <img src="/eye-icon.png" alt="조회수" />
            <span>{views}</span>
          </div>
          <div className="freepost-comments">
            <img src="/comment-icon.png" alt="댓글 수" />
            <span>{comments}</span>
          </div>
          <div className="freepost-comments">
            <img src="/comment-icon.png" alt="추천 수" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreePostBox;
