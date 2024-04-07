import express, { Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken'; // jsonwebtoken 추가

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);


// 임의의 시크릿 키
const secretKey = 'your_secret_key';

app.use(express.json());
// 토큰을 검증하는 미들웨어 함수
// 토큰을 검증하는 미들웨어 함수
const verifyToken = (req: Request, res: Response, next: () => void) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    jwt.verify(token, secretKey, (err: VerifyErrors | null) => {
        if (err) {
            return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
        }

        // 토큰이 유효한 경우 다음 미들웨어로 이동
        next();
    });
};


// /login 엔드포인트
app.post('/login', (req: Request<unknown, unknown>, res: Response) => {
    const { username, password } = req.body;

    // 여기에 로그인 및 인증 로직을 구현합니다.
    // 예를 들어, 데이터베이스에서 아이디와 패스워드를 확인하고 인증 토큰을 생성하는 등의 작업을 수행합니다.

    console.log('사용자 아이디:', username);
    console.log('비밀번호:', password);

    // 토큰 생성
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // 토큰을 클라이언트에게 반환
    res.status(200).json({ message: '로그인 성공', token });
});

// /secure 엔드포인트: 토큰을 검증하여 유효한 경우에만 요청 처리
app.get('/secure', verifyToken, (req: Request, res: Response) => {
    res.status(200).json({ message: '토큰이 유효합니다.' });
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
