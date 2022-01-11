import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../users/user.entity'

@Entity('user_status')
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany((_type) => UserEntity, (x) => x.status)
    @JoinTable()
    user: UserEntity[]
}
