import React, { useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                // 로그인 성공 시 토큰 받기
                const data = await response.json();
                const { token } = data;

                // 토큰을 쿠키에 저장
                document.cookie = `jwtToken=${token}; path=/`;

                // 로그인 성공
                console.log('로그인 성공');
            } else {
                // 로그인 실패
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('네트워크 에러:', error);
            setErrorMessage('??');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">사용자 이름:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
