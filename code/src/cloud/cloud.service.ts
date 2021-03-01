import { Injectable } from '@nestjs/common';
import { unlink, readdirSync } from "fs"
import * as assert from 'assert';

@Injectable()
export class CloudService {

    /**
     * Delete `name`
     * 
     * @param name file name
     */
    async deleteFile(name : string) : Promise<void>{
        assert(name != "", "name cannot be empty");
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
        assert(name != "", "name cannot be empty");
        return {
            link : `cloud/${name}`
        }
    }
}
