import { EntityRepository, Repository } from 'typeorm'
import { StatusEntity } from './status.entity'

@EntityRepository(StatusEntity)
export class StatusRepository extends Repository<StatusEntity> {}
