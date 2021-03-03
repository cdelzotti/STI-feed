import { Repository } from 'typeorm';
import { Messages } from "../control_interface/control_interface.entity";
export declare class OutputService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Messages>);
    getMessages(body: any): Promise<Messages[]>;
}
