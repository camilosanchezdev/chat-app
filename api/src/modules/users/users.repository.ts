import { EntityRepository, Repository } from 'typeorm'
import { SignUpCredentialsDto } from './dto/signup-credentials.dto'
import { UserEntity } from './user.entity'
import * as bcrypt from 'bcrypt'

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
    async createUser(signUpCredentialsDto: SignUpCredentialsDto) {
        const { username, password } = signUpCredentialsDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({ username, password: hashedPassword })
        try {
            await this.save(user)
        } catch (error) {
            console.log(error)
        }
    }
}
