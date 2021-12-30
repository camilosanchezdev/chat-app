import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'db_chatapp',
            entities: [__dirname + '/../**/*.entity.js'],
            autoLoadEntities: true,
            synchronize: true,
        }),
        ContactsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
