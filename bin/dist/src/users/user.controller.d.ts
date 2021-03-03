import { UsersService } from './users.service';
export declare class UserController {
    private userService;
    constructor(userService: UsersService);
    addUser(user: any): Promise<any>;
    editUser(user: any): Promise<any>;
    deleteUser(user: any): Promise<{
        status: string;
    }>;
    test(req: any): Promise<{
        access_token: string;
    }>;
    testJWT(): {
        connected: boolean;
    };
}
