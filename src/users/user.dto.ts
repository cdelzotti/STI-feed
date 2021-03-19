import { ObjectID } from 'typeorm'

// Defines a structure for syntax completion

export class UserDTO{
    _id? : ObjectID;
    username? : string;
    password? : string;
}