import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { ChangeAvatarDto } from './dto/change-avatar.dto'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { GetUser } from './get-user.decorator'
import { UserEntity } from './user.entity'
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
    @Get()
    @UseGuards(AuthGuard())
    getAllOnline(@GetUser() user: UserEntity): Promise<any> {
        return this.usersService.getAllOnline(user)
    }

    @Put('/avatar')
    @UseGuards(AuthGuard())
    changeAvatar(@GetUser() user: UserEntity, @Body() avatar: ChangeAvatarDto): Promise<any> {
        return this.usersService.changeAvatar(user, avatar)
    }
}
