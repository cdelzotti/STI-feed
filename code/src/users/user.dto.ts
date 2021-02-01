import { ObjectID } from 'typeorm'

export class UserDTO{
    _id? : ObjectID;
    username? : string;
    password? : string;
}