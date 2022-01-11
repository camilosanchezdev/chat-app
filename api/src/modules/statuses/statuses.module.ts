import { Module } from '@nestjs/common'
import { StatusesService } from './statuses.service'
import { StatusesController } from './statuses.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StatusRepository } from './status.repository'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [TypeOrmModule.forFeature([StatusRepository]), UsersModule],
    providers: [StatusesService],
    controllers: [StatusesController],
})
export class StatusesModule {}
