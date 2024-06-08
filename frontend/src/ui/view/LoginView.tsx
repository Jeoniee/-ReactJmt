import React, { useState } from 'react';
import styles from '../css/app.module.scss'; // CSS 모듈을 가져옴

/**
 * TODO :
 * */
interface LoginViewProps {
    username: string;
    password: string;
    errorMessage: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    handleLogin:(e: React.FormEvent) => void;
}

/**
 * LoginView
 * 사용자 인터페이스 렌더링
 * JSX 사용, 화면 구성, 사용자 액션 처리하는 이벤트 핸들러 정의
 * */
const LoginView: React.FC<LoginViewProps> = ({
    username,password,errorMessage,setUsername,setPassword,handleLogin
}) => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.logo}>
                <h1 className={styles.title}>REACT JMT</h1>
            </div>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="you name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
                <button type="submit" className={styles.button}>Login</button>
            </form>
            <p className={styles.signupLink}>Don't have an account? <a href="#" className={styles.signupLink}>Sign up</a></p>
        </div>
    );
};
export default LoginView;
