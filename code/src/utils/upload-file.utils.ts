import {extname} from 'path'

/**
 * Define the name of an uploaded file
 * 
 * @param req request object
 * @param file file that must be uploaded
 * @param callback callback function handled by mutler
 */
export const handleFileName = (req, file, callback) => {
    callback(null, `${req.params.id}${extname(file.originalname)}`)
}