import {extname} from 'path'
import {readdirSync} from 'fs'
import { BadRequestException } from "@nestjs/common"

/**
 * Define the name of an uploaded file
 * 
 * @param req request object
 * @param file file that must be uploaded
 * @param callback callback function handled by mutler
 */
export const handleFileName = (req, file, callback) => {
    let date = new Date();
    let format : string = file.originalname;
    format = format.split(".").pop();
    callback(null, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}.${format}`);
}