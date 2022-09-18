import { expressjwt, Request as JWTRequest} from "express-jwt";
import { Secret } from "jsonwebtoken";


async function isRevoked(req: JWTRequest, token: any){
    console.log(req.url)
    return !token.payload.isAdmin ? true : false;
}

export const AuthJWT = () => {
    const SECRET = process.env['SECRET'] as Secret;
    return expressjwt({
        secret: SECRET,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    })
    .unless({
        path: [
            {
                url: /\/products(.*)/, 
                methods: ['GET', 'OPTIONS',]
                
            },
            {
                url: '/category', 
                methods: ['GET', 'OPTIONS']
            },
            {
                url: '/countries', 
                methods: ['GET', 'OPTIONS']
            },
            {
                url: '/brand', 
                methods: ['GET', 'OPTIONS']
            },
            {
                url:  /\/user(.*)/, 
                methods: ['GET', 'OPTIONS',]
            },
            {
                url: '/role', 
                methods: ['GET', 'OPTIONS']
            },
            {
                url: /\/orders(.*)/,
                methods: ['POST', 'OPTIONS']
            },
            '/user/register',
            '/user/login',
        ]
    })
}