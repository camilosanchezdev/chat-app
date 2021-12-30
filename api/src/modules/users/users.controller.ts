import { Body, Controller, Post } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
        return this.usersService.signUp(signUpCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
        return this.usersService.signIn(authCredentialsDto)
    }
}
