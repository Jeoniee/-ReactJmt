import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3000;
import dotenv from 'dotenv';
dotenv.config();

//middlewares
app.use(express.json());
// CORS 미들웨어 추가
app.use(cors());
// request 객체에 cookies 속성 부여
app.use(cookieParser());

// 토큰을 검증하는 미들웨어 함수
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; //accessToken만 추출하기 위함

    console.log(req.cookies); // 클라이언트에서 전송 된 쿠키 출력
    if (!token) {
        return res.status(401).json({message: '토큰이 없습니다.'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(403).json({message: '토큰이 유효하지 않습니다.'});
        }

        // 토큰이 유효한 경우 다음 미들웨어로 이동
        next();
    });
};

// /login 엔드포인트
app.post('/login', (req, res) => {
    try{
        console.log('값은 바로바로바로 :', req.body);
        const { username, password } = req.body;

        // 여기에 로그인 및 인증 로직을 구현합니다.
        // 예를 들어, 데이터베이스에서 아이디와 패스워드를 확인하고 인증 토큰을 생성하는 등의 작업을 수행합니다.

        console.log('사용자 아이디:', username);
        console.log('비밀번호:', password);

        // 토큰 생성
        const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: 3600 }); // 3600초 = 1시간
        const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET, { expiresIn: '1d' }); // 1일


        // 토큰을 클라이언트에게 전달
        res.cookie('refreshToken', refreshToken, {
            //쿠키 보안성을 향상시킬수 있게 설정
            httpOnly: true, // 클라이언트 스크립트에서 쿠키에 접근 불가능
            secure: true, // https 연결에서만 쿠키 전송
            sameSite: 'none' // 모든 도메인으로부터 쿠키 전송
        }).status(200).json({ message: '로그인 성공', accessToken });

    }catch(e){
        console.error('An error occurred:', e);
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

// 서버에서 쿠키 설정
app.get('/setcookie', (req, res) => {
    // 쿠키 설정
    res.cookie('username', 'john', { maxAge: 900000, httpOnly: true });
    res.send('Cookie set!');
});

// /secure 엔드포인트: 토큰을 검증하여 유효한 경우에만 요청 처리
app.get('/secure', verifyToken, (req, res) => {
    res.status(200).json({ message: '토큰이 유효합니다.' });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
