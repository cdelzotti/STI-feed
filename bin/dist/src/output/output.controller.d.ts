import { Messages } from '../control_interface/control_interface.entity';
import { OutputService } from './output.service';
export declare class OutputController {
    private readonly outputService;
    constructor(outputService: OutputService);
    getMsg(body: any): Promise<Messages[]>;
}
