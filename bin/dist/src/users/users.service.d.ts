import { User } from './users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    createUser(user: any): Promise<any>;
    getUser(user: any): Promise<User>;
    editUser(user: any): Promise<any>;
    deleteUser(user: any): Promise<{
        status: string;
    }>;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
