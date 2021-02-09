import { Injectable, BadRequestException } from '@nestjs/common';
import { unlink, readdirSync } from "fs"

@Injectable()
export class CloudService {

    async deleteFile(name : string) : Promise<void>{
        unlink(`./static/cloud/${name}`, () => {})
    }

    async getFilesList() : Promise<any>{
        return  readdirSync('./static/cloud/');
    }

    async checkFile(name : string){
        return {
            link : `/cloud/${name}`
        }
    }
}
