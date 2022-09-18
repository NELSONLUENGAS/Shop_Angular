import './db';
import express from 'express';
import router from './Routes/index';
import cors from 'cors';
import 'dotenv/config';
import { AuthJWT } from './Services/JWT';
import morgan from 'morgan';

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use('/public/upload', express.static(__dirname + '/public/upload'));
server.use(cors())
// server.use(cors({
//         origin: 'http://localhost:54229',
//         methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE', 'HEAD', 'PATCH'],
//         allowedHeaders: ['Content-Type', 'Authorization'],
//         credentials: true
// }));
server.use(AuthJWT());
server.use(morgan('tiny'));
server.use('/', router); 

server.use((err: any, req: any, res: any, next: any) => {
        if (err.name === "UnauthorizedError") {
                res.status(401).send({msg: 'You are not Authenticated', });
        } else {
                console.log(req.url);
                next(err);
        }
});


server.listen(process.env.PORT || 3001, async ()=> {
        console.log('Server is runnig in Port 3001')
});
