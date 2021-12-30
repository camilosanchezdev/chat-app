import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersRepository]),
        JwtModule.register({
            secret: 'secretKey',
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
