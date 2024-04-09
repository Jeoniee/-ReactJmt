import React, {useState} from "react";
import LoginView from "./view/LoginView";
import axios from "axios";
import Cookies from "js-cookie";
import {useAuthStore} from '../stores/store';

/**
 * LoginContainer
 * 데이터, 비즈니스 로직 처리
 * 상태관리, 데이터플로우, API호출
 * */
const LoginContainer = () => {
    const { username, setUsername, password, setPassword, errorMessage, setErrorMessage }
= useAuthStore();

    /**
     * /login 호출
     * @param username
     * @param password
     * */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                // 응답이 성공적으로 도착한 경우
                const data = response.data;
                const token = data.accessToken; //서버에서 받아온 accessToken

                //토큰을 쿠키에 마참내 저장
                Cookies.set('token', token,{secure:true, sameSite: 'none'});
                console.log('token,data : ' + token);
                //로그인 성공 후 secureLogin로 이동
                secureLogin(token);
            } else {
                // 응답이 실패한 경우
                console.error('응답 실패:', response.statusText);
            }
        } catch (error) {
            console.error('네트워크 에러:', error);
            setErrorMessage('틀렸어');
        }
    };

    /**
     *  /secure 호출
     *  @param token 값
     **/
    const secureLogin = async (token: string) => {
        try{
            // 헤더에 토큰 추가
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            // 서버에 GET 요청 보내기
            const response = await axios.get('http://localhost:3000/secure', { headers });

            // 요청이 성공하면 데이터 처리
            if (response.status === 200) {
                console.log('보호된 데이터:', response.data);
                console.log('오케..')
            }

        } catch (error) {
            // 요청이 실패하면 에러 처리
            console.error('보호된 데이터를 가져오는 중 에러 발생:', error);
        }
    };

    return(
        <LoginView
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}
            handleLogin={handleLogin}
        />
    );
};

export default LoginContainer;