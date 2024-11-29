import { useNavigate } from 'react-router-dom';
import '../styles/AiaskPostBox.css';

interface AiaskPostBoxProps {
  id: number; // 글 ID 추가
  title: string;
  user: string;
  time: string;
  views: number;
  comments: number;
  text: string;
}

const AiaskPostBox: React.FC<AiaskPostBoxProps> = ({ id, title, user, time, views, comments, text }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // title 클릭 시 글 상세 페이지로 이동하는 함수
  const handleTitleClick = () => {
    navigate(`/look/${id}`); // 해당 글의 ID를 포함한 경로로 이동
  };

  return (
    <div className="aiask-post-box">
      <div className="aiask-post-box-title" onClick={handleTitleClick}>
        <div>{title}</div>
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
