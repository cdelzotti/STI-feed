import { DataService } from './data.service';
import { DataResponse } from './data.dto';
export declare class DataController {
    private readonly apRetreiver;
    constructor(apRetreiver: DataService);
    getAP(forceAwait: boolean): Promise<DataResponse>;
}
