import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../users/user.entity'

@Entity('user_contacts')
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne((_type) => UserEntity)
    @JoinColumn()
    user_contact: UserEntity

    @ManyToOne((_type) => UserEntity, (x) => x.contacts)
    user: UserEntity
}
