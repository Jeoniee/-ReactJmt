import React, { useState } from 'react';
import styles from './app.module.css'; // CSS 모듈을 가져옴
import axios from 'axios'; // axios를 import 함

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
                document.cookie = `token=${token}; Secure; SameSite=None`;

                console.log(token);
                console.log(data);
            } else {
                // 응답이 실패한 경우
                console.error('응답 실패:', response.statusText);
            }
        } catch (error) {
            console.error('네트워크 에러:', error);
            setErrorMessage('틀렸어');
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
