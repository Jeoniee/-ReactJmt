import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
// CORS 미들웨어 추가
app.use(cors());
// request 객체에 cookies 속성 부여
app.use(cookieParser());

// 토큰을 검증하는 미들웨어 함수
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; //accessToken만 추출하기 위함
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

/**
 * login 엔드포인트
 * 로그인, 인증 로직 구현
 * TODO : db에서 아이디, 패스워드 확인 후 인증 토큰을 생성 하게 해야 함.
 * */
app.post('/login', (req, res) => {
    try{
        const { username } = req.body;
        console.log('값은 바로바로바로 :', req.body);

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

// secure 엔드포인트: 토큰을 검증하여 유효한 경우에만 요청 처리
app.get('/secure', verifyToken, (req, res) => {
    console.log('/secure start');
    res.status(200).json({ message: '토큰이 유효합니다.' });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
