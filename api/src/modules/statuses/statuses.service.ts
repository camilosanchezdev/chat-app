import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StatusRepository } from './status.repository'

@Injectable()
export class StatusesService {
    constructor(@InjectRepository(StatusRepository) private statusRepository: StatusRepository) {}

    getAll(): Promise<any> {
        return this.statusRepository.find()
    }
}
