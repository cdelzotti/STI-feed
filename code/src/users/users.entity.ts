import { Entity, Column, ObjectID, ObjectIdColumn} from 'typeorm';
import { IsString} from 'class-validator';


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