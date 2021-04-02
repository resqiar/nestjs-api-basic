import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validateToken(payload: any): Promise<{}>{
        return { _id: payload._id, username: payload.username }
    }
}