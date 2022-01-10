import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { GetUser } from './get-user.decorator'
import { UserEntity } from './user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard())
    getAllOnline(@GetUser() user: UserEntity): Promise<any> {
        return this.usersService.getAllOnline(user)
    }
    @Post('/signup')
    signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<any> {
        return this.usersService.signUp(signUpCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
        return this.usersService.signIn(authCredentialsDto)
    }
}
