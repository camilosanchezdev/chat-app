import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageRepository } from '../messages/message.repository'
import { JwtStrategy } from './jwt-strategy'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([UsersRepository, MessageRepository]),
        JwtModule.register({
            secret: 'topSecret51',
            // signOptions: {
            //     expiresIn: 3600,
            // },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
