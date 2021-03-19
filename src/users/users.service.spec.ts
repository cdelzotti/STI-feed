import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UserController } from './user.controller'
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import DBModule from '../dbMock'
import { jwtConstants } from './constants';

describe('usersService tests', () => {
    let userService : UsersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports : [
                DBModule({
                    name: (new Date().getTime() * Math.random()).toString(16), // <-- This is to have a "unique" name for the connection
                  }),
                TypeOrmModule.forFeature([User]),
                JwtModule.register({
                    secret: jwtConstants.secret,
                    signOptions: { expiresIn: '600s' },
                  })
            ],
            controllers : [UserController],
            providers : [UsersService]
        }).compile();
        userService = module.get<UsersService>(UsersService);
    });

    it("should be able to make basics operations", async () => {
                // Add user
                const responseAdd = await userService.createUser({
                    username : "test",
                    password : "test"
                });
                // Retrieve user
                let responseGet = await userService.getUser(responseAdd);
                expect(responseGet.username).toBe("test")
                // Delete user
                const responseDelete = await userService.deleteUser(responseAdd);
                expect(responseDelete.status).toBe("deleted");
                // try to retrieve user
                responseGet = await userService.getUser({
                    username : "test"
                });
                expect(responseGet).toBe(undefined); 
    })
});