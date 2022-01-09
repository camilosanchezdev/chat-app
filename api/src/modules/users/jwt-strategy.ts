import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserEntity } from './user.entity'
import { UsersRepository } from './users.repository'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository) {
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload: any): Promise<UserEntity> {
        const { username } = payload
        const user: UserEntity = await this.usersRepository.findOne({ username })

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
