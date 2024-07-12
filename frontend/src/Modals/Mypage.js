import React, { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getMypageRequest,updateMypageUserRequest,deleteUserRequest } from '../apis/index.js';
import MyModal from '../MyModal'; // 모달 컴포넌트 추가
import FindpasswordForm from '../Modals/findpassword';
import './modules.css';



const MypageForm = ({ handleLogout }) => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        studentNum: '',
        name: ''
    }); // 사용자 정보를 저장할 상태
    const [editMode, setEditMode] = useState(false); // 수정 모드 상태
    const [cookies, setCookie] = useCookies(['accessToken']); // 쿠키에서 accessToken 읽기
    const token = cookies.accessToken; // 토큰을 변수에 저장
    const [modalOpenfind, setModalOpenfind] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (token) { // 토큰이 존재할 때만 API 호출
                try {
                    const response = await getMypageRequest(token);
                    if (response) { // 응답이 정상적으로 있는 경우
                        setUserDetails({ // 상태 업데이트
                            email: response.email,
                            studentNum: response.studentNum,
                            name: response.name
                        });
                    } else {
                        console.error('No data returned from getMypageRequest');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }else {
                // 토큰이 없는 경우 사용자 정보를 초기화
                setUserDetails({ email: '', studentNum: '', name: '' });
            }
        };
        fetchUserDetails();
    }, [token]); // token이 변경될 때마다 실행

    const handleDeleteAccount = async () => {
        if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
            const result = await deleteUserRequest(token);
            switch (result.code) {
                case "SU":
                    alert("계정이 성공적으로 삭제되었습니다.");
                    handleLogout(); // 로그아웃 처리 후 로그인 페이지로 리다이렉트한다고 가정
                    break;
                case "NU":
                    alert("해당 사용자가 존재하지 않습니다.");
                    break;
                case "VF":
                    alert("유효성 검증에 실패했습니다.");
                    break;
                case "DBE":
                    alert("데이터베이스 오류가 발생했습니다.");
                    break;
                default:
                    alert("알 수 없는 오류가 발생했습니다.");
                    break;
            }
        }
    };

    const handleUpdateUserDetails = async () => {
        const result = await updateMypageUserRequest(userDetails, token);
        if (result.code === "SU") {
            alert("정보가 성공적으로 업데이트 되었습니다.");
            setEditMode(false); // 수정 모드 종료
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    const handleFindpassword = (e) => {
        e.preventDefault(); // 폼 제출 방지 // 로그인 모달 닫기
        setModalOpenfind(true); // 회원가입 정보 모달 열기
      };
      
    const handleNumberInput = (e) => {
        const value = e.target.value;
        setUserDetails({...userDetails, studentNum: value.replace(/[^0-9]/g, '')});
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="loginHeaderContainer">
                <img src="header-name.png" alt="로그인 로고" style={{ width: '220px', height: 'auto' }} />
            </div>   
            <div className="mypage_icelogo">
                <img src="favicon.png" alt="정보통신공학과 로고" style={{ width: '150px', height: 'auto' }} />
            </div> 
            <div className="mypage_component">
                <p>메일: {userDetails.email}</p>
                <p>학번: {userDetails.studentNum}</p>
                <p>이름: {userDetails.name}</p>
            </div>
            <button className="findPasswordButton" onClick={handleFindpassword}>비밀번호 재설정</button>
            <div className="mypage_buttons">
            <button type="button" onClick={() => setEditMode(true)}>정보 수정</button>
                <button type="button" onClick={handleLogout}>로그아웃</button>
            </div>
            <button className="delete_user" onClick={handleDeleteAccount}>회원탈퇴</button>
            {editMode && (
                <MyModal open={editMode} onCancel={() => setEditMode(false)} footer={[]}>
                    <div>
                        <label>이름:</label>
                        <input type="text" value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} />
                        <label>학번:</label>
                        <input type="text" value={userDetails.studentNum} onChange={handleNumberInput} />
                        <button type="button" className="mypage_update-button" onClick={handleUpdateUserDetails}>수정 완료</button> 
                    </div>
                </MyModal>
                
                 )}

            <MyModal //비밀번호 찾기
                    open={modalOpenfind}
                        width={500} //모달 넓이 이게 적당 한듯
                        header={[]}
                        onCancel={e => setModalOpenfind(false) } //x 버튼
                        footer={[]}
                    >
                    <FindpasswordForm onLogin={handleFindpassword} onClose={() => setModalOpenfind(false)} />
                    
                </MyModal>
        </form>
    );
};

export default MypageForm;