export declare class CloudService {
    deleteFile(name: string): Promise<void>;
    getFilesList(): Promise<any>;
    checkFile(name: string): Promise<{
        link: string;
    }>;
}
