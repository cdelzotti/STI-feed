import { Entity, Column, ObjectID, ObjectIdColumn} from 'typeorm';
import { IsString} from 'class-validator';

// The user object that will be stored in DB

@Entity("Users")
export class User{
    @IsString()
    @ObjectIdColumn()
    _id? : ObjectID;

    @IsString()
    @Column()
    username? : string;

    @Column()
    @IsString()
    password? : string;
}