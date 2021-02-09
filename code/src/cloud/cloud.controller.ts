import { Body, Controller, Delete, Get, Post, Res, Req, Put, UseInterceptors, UploadedFile, Param, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { handleFileName } from '../utils/upload-file.utils'
import { ObjectID } from 'mongodb';

import { CloudService } from './cloud.service'
import { get } from 'http';

@Controller('cloud')
export class CloudController {

    constructor(private cloudService : CloudService){}
/**
   * Add and image
   */
  @Post("")
  @UseInterceptors(FileInterceptor('file', {
    storage : diskStorage({
      destination : './static/cloud',
      filename : handleFileName
    })
  }))
  async uploadAttached(@UploadedFile() file) {
    return this.cloudService.checkFile(file.filename);
  }


  @Delete("")
  async removeAttached(@Body("name") name : string) {
    this.cloudService.deleteFile(name);
    return {
        fileDeleted : true
    }
  }

  @Get("")
  async uploadList(){
    return this.cloudService.getFilesList();
  }
}
