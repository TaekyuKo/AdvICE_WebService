import React, { useEffect , useState} from 'react';
import '../css/MainPage/MainPage.css';
 
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { getMypageRequest} from '../../shared/api/AuthApi.js';

const HomePage = () => {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const handleMoreClick = () => {
    navigate('/article-main');  
  };
  const handlereservationClick = () => {
    window.location.href = 'https://open.kakao.com/o/giOS427b';  
  };
  const handlefeedbackClick = () => {
    window.location.href = 'https://open.kakao.com/o/swnIYgKg';  
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!cookies.accessToken && !cookies.refreshToken) {
        navigate('/');
        return;
      }

      const data = await getMypageRequest(cookies.accessToken, cookies.refreshToken, setCookie, navigate);
      
      if (data) {
        setUserData(data);
      } else {
        console.error("❌ [유저 데이터 불러오기 실패]");
        navigate('/');
      }
    };

    fetchData();
  }, [cookies.accessToken, cookies.refreshToken, navigate, setCookie]);

  const handlecodingzone = () => {
      navigate(`/coding-zone`);
  };

  return (
    <div className="main-container">
      <div className="header">
        <h1>AdvICE</h1>
        <p className="department-info">
  This is an integrated service for students in the Department of Information and Communication Engineering.<br />
  Try the coding zone reservation, anonymous bulletin board, and study room reservation service for the Department of Information and Communication Engineering.
  <br />Try your best rather than be the best.
</p>
      </div>
      <div className="buttons-container">
        <div className="service-box coding-box">
          <p>정보통신공학과에서 운영하는 <br />코딩존 예약/관리 시스템 입니다.</p>
          <button onClick={handlecodingzone} className="btn coding">Coding Zone</button>
        </div>
        <div className="service-box icebreaker-box">
          <p>ICEbreaker 익명게시판을 통해<br /> 학과 사람들과 소통해 보세요.</p>
          <button onClick={handleMoreClick} className="btn icebreaker">ICEbreaker</button>
        </div>
        <div className="service-box study-box">
          <p>정보통신공학과 스터디룸<br /> 예약 오픈채팅방 입니다.</p>
          <button onClick={handlereservationClick} className="btn study">Study Room</button>
        </div>
      </div>
      <div className='feedback-container'>
        <button onClick={handlefeedbackClick} className="feedback-btn">서비스 이용하시는데 불편한 점이나 요청사항이 있으신가요?</button>
      </div>
    </div>
  );
}

export default HomePage;












