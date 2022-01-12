import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { UsersRepository } from './users.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { NotFoundError } from 'rxjs'
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

            return { accessToken, username, id: user.id, status: user.status.id, avatar: user.avatar }
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
    async getAllOnline(user: UserEntity): Promise<any> {
        const users = await this.usersRepository.createQueryBuilder('user').where('user.id != :id', { id: user.id }).getMany()
        if (!users) {
            throw new NotFoundException()
        }
        return users
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
