import React, { useState } from 'react';
import styles from './app.module.css'; // CSS 모듈을 가져옴
import axios from 'axios'; // axios를 import 함
import Cookies from 'js-cookie';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logo}>

                <h1 className={styles.title}>로그인</h1>
            </div>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="사용자 이름"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <button type="submit" className={styles.button}>로그인</button>
            </form>
            <p className={styles.signupLink}>계정이 없으신가요? <a href="#">가입하기</a></p>
        </div>
    );
};
export default Login;
