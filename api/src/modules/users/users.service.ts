import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { UsersRepository } from './users.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository, private jwtService: JwtService) {}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
        return this.usersRepository.createUser(signUpCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto

        const user = await this.usersRepository.findOne({ username })

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = await this.jwtService.sign(username)
            return { accessToken }
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
