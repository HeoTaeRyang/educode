import React from 'react';
import { Link } from 'react-router-dom'; // Link 임포트 추가
import '../styles/OfferPostBox.css';

interface OfferPostBoxProps {
  postId: number;
  title: string;
  header: string;
  user: string;
  time: string;
  views: number;
  comments: number;
}

const OfferPostBox: React.FC<OfferPostBoxProps> = ({ postId, title, header, user, time, views, comments}) => {
  return (
    <div className="aiask-post-box">
      <div className="aiask-post-box-title">
        <Link to={`/offer/${postId}`} className="aiask-post-link">
          {title}
        </Link>
      </div>
      <div className="aiask-post-bottom-box">
        <div className="aiask-post-user">{user}</div>
        <div className="aiask-post-time">{time}</div>
        <div className="eye">
          <img src="/Eye.png" alt="aiask" />
        </div>
        <div className="aiask-post-watch">{views}</div>
        <div className="eye">
          <img src="/comment.png" alt="aiask" />
        </div>
        <div className="aiask-post-comment">{comments}</div>
      </div>
    </div>
  );
};

export default OfferPostBox;
