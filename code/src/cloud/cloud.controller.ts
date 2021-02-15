import { Body, Controller, Delete, Get, Post, Res, Req, Put, UseInterceptors, UploadedFile, Param, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { handleFileName } from '../utils/upload-file.utils'
import { CloudService } from './cloud.service'
import { JwtAuthGuard } from "../users/jwt-auth.guard"


@Controller('cloud')
export class CloudController {

    constructor(private cloudService : CloudService){}
  
  /**
   * Add a file and serve it in static access
   * 
   * The file must be served in a form-data under de 'file' key
   */
  @Post("")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage : diskStorage({
      destination : './static/cloud',
      filename : handleFileName
    })
  }))
  async uploadAttached(@UploadedFile() file) {
    return this.cloudService.checkFile(file.filename);
  }

  /**
   * Delete a file
   * 
   * @param name file name
   */
  @Delete("")
  @UseGuards(JwtAuthGuard)
  async removeAttached(@Body("name") name : string) {
    this.cloudService.deleteFile(name);
    return {
        fileDeleted : true
    }
  }

  /**
   * Show every uploaded images
   * 
   * @returns The name of every file uploaded 
   */
  @Get("")
  @UseGuards(JwtAuthGuard)
  async uploadList() : Promise<String[]>{
    return this.cloudService.getFilesList();
  }
}
