import { Injectable } from '@nestjs/common';
import { unlink, readdirSync } from "fs"

@Injectable()
export class CloudService {

    /**
     * Delete `name`
     * 
     * @param name file name
     */
    async deleteFile(name : string) : Promise<void>{
        unlink(`./static/cloud/${name}`, () => {})
    }

    /**
     * Returns a list of every file available in storage
     */
    async getFilesList() : Promise<any>{
        return  readdirSync('./static/cloud/');
    }

    /**
     * Returns the link corresponding to a file name
     * 
     * @param name file name
     */
    async checkFile(name : string){
        return {
            link : `cloud/${name}`
        }
    }
}
