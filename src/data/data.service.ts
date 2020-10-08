import { Injectable } from '@nestjs/common';
import {Workbook, Worksheet} from 'exceljs';
import { Repository } from 'typeorm';
import { EventData } from './data.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataResponse } from './data.dto'

@Injectable()
export class APRetreiver {
  
    constructor(
        // Set the variable needed to access the database
        @InjectRepository(EventData)
        private eventRepository : Repository<EventData>
    ){}

    /**
     * Fetch the "Arrétés de Police" and store them into the database. This function doesn't wait for the end of the storage to return response.
     * 
     * @param path : path to an excel file containing every AP.
     * @requires path must be a valid path
     * @returns a DataResponse file independently of the storage sucess
     */
    async APextract(path : string) : Promise<DataResponse> {
        // Get Excel content
        const workbook = new Workbook();
        await workbook.xlsx.readFile(path);
        let worksheet : Worksheet = workbook.worksheets[0];

        // For each row that might contains something
        for (let row = 2; row < worksheet.actualRowCount; row++) {
            // If the D column isn't null, the row should be valid
            if (worksheet.getCell(`D${row}`).value != null) {
                // Get row data
                let currentEvent : EventData = new EventData();
                currentEvent.localisation = worksheet.getCell(`C${row}`).value as string;
                currentEvent.type = "AP";
                currentEvent.impact = worksheet.getCell(`E${row}`).value as string;
                currentEvent.dateDebut = worksheet.getCell(`F${row}`).value as Date;
                currentEvent.dateFin = worksheet.getCell(`G${row}`).value as Date;
                currentEvent.source = worksheet.getCell(`H${row}`).value as string;
                currentEvent.info = worksheet.getCell(`N${row}`).value as string;
                currentEvent.relevant = false;

                // Insert into database
                this.eventRepository.insert(currentEvent).catch((reason : any) => {
                    console.log("BD AP update : record failed")
                }).then((result : any) => {
                    console.log("BD AP update : record saved")
                });
            }
        }

        return {
            update : "AP",
            status : "Thanks for launching an update",
            error : false,
        }
    }
}
