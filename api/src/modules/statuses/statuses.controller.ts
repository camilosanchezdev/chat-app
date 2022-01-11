import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { StatusesService } from './statuses.service'

@Controller('statuses')
@UseGuards(AuthGuard())
export class StatusesController {
    constructor(private statusesService: StatusesService) {}
    @Get()
    getAll(): Promise<any> {
        return this.statusesService.getAll()
    }
}
