import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { UsersRepository } from './users.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
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
        const user = await this.usersRepository.findOneOrFail({ where: { username: username }, select: ['id', 'username', 'password'] })

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username }
            const accessToken = await this.jwtService.sign(payload)

            return { accessToken, username, id: user.id }
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
