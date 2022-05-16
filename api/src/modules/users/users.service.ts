import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { UsersRepository } from './users.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { UserEntity } from './user.entity'
import { ChangeAvatarDto } from './dto/change-avatar.dto'
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository, private jwtService: JwtService) {}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
        const { username, password } = signUpCredentialsDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.usersRepository.create({ username, password: hashedPassword })
        try {
            await this.usersRepository.save(user)
            return await this.signIn(signUpCredentialsDto)
        } catch (error) {
            console.log(error)
        }
    }
    async logout(user: UserEntity): Promise<any> {
        try {
            user.isOnline = false
            await this.usersRepository.save(user)
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto
        const user = await this.usersRepository.findOneOrFail({
            where: { username: username },
            relations: ['status'],
            select: ['id', 'username', 'password', 'status', 'avatar'],
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username }
            const accessToken = await this.jwtService.sign(payload)
            user.isOnline = true
            await this.usersRepository.save(user)
            return { accessToken, username, id: user.id, avatar: user.avatar }
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
    async getAllOnline(user: UserEntity): Promise<any> {
        // TODO: remove literal query

        const query = await this.usersRepository.query(`
        SELECT 
            r.id,
            r.avatar,
            r.statusId,
            r.isOnline,
            r.username,
            COUNT(*) > 1 AS unread_messages
        FROM
            (SELECT 
                *,
                    IF(((readed = 0 AND t.id_message IS NULL)
                        OR (readed = 1 AND t.id_message IS NOT NULL)), 0, 1) AS unread_messages
            FROM
                (SELECT 
                u.id,
                    u.avatar,
                    u.statusId,
                    u.isOnline,
                    u.username,
                    IF(m.readed_at IS NULL, 0, 1) AS readed,
                    m.id AS id_message
            FROM
                db_chatapp.user AS u
            LEFT JOIN db_chatapp.messages AS m ON u.id = m.senderId AND m.receiverId = ${user.id}) AS t
            GROUP BY t.id , unread_messages
            HAVING t.id != ${user.id}) AS r
        GROUP BY r.id
        ;
        `)

        return query
    }

    async changeAvatar(user: UserEntity, avatar: ChangeAvatarDto): Promise<any> {
        const editUser = await this.usersRepository.findOne(user.id)
        if (!editUser) {
            throw new NotFoundException()
        }
        try {
            return await this.usersRepository.save({ ...editUser, avatar: avatar.avatar })
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
