import { CloudService } from './cloud.service';
export declare class CloudController {
    private cloudService;
    constructor(cloudService: CloudService);
    uploadAttached(file: any): Promise<{
        link: string;
    }>;
    removeAttached(name: string): Promise<{
        fileDeleted: boolean;
    }>;
    uploadList(): Promise<String[]>;
}
