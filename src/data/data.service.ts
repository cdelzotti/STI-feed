import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

                // Get alike elements stored
                let dbContent : EventData[] = await this.eventRepository.find({
                    type : currentEvent.type,
                    localisation : currentEvent.localisation,
                    impact : currentEvent.impact,
                    source : currentEvent.source,
                    info : currentEvent.info,
                })
                // Check dates
                let matches : number = this.workAroundForDates(currentEvent, dbContent); // Alike event counter

                // Insert into database
                if (matches == 0){
                    await this.eventRepository.insert(currentEvent).catch((reason : any)=>{
                        console.log("Adding AP failed");
                        throw new InternalServerErrorException("Something went wrong while retreiving events");
                    }).then(() => {
                        console.log("AP added");
                    });
                }
            }
        }

        return {
            update : "AP",
            status : "Thanks for launching an update",
            error : false,
        }
    }

    /**
     * An alternative to classic date comparison
     * 
     * @param currentEvent : And event
     * @param dbContent : An list of events
     * 
     * @returns the number of times an event with the same dates as currentEvent has been found in
     * dbContent
     */
    workAroundForDates(currentEvent : EventData, dbContent : EventData[]) : number {
         // Check dates
         let matches : number = 0; // Alike event counter
         // Get currentEvent dates in a nice list
         try{
            var currentEventStart : number[] = [
                currentEvent.dateDebut.getFullYear(),
                currentEvent.dateDebut.getMonth(),
                currentEvent.dateDebut.getDate()
            ]
            var currentEventEnd : number[] = [
                currentEvent.dateFin.getFullYear(),
                currentEvent.dateFin.getMonth(),
                currentEvent.dateFin.getDate()
            ]
         } catch (e) {
            console.log("Couldn't parse date, is there a null date ?")
            return 1;
         }
         for (let index = 0; index < dbContent.length; index++) {
             // Get dbContent[index] dates in a nice list
             let startDate : number[] = [
                 dbContent[index].dateDebut.getFullYear(),
                 dbContent[index].dateDebut.getMonth(),
                 dbContent[index].dateDebut.getDate()
             ];
             let endDate : number[] = [
                 dbContent[index].dateFin.getFullYear(),
                 dbContent[index].dateFin.getMonth(),
                 dbContent[index].dateFin.getDate()
            ]
             // Count matches
             if (this.arrayEquals(startDate, currentEventStart) && this.arrayEquals(endDate,currentEventEnd)) {
                 matches++;
             }
         }
         return matches;
    }

    /**
     * Check if two arrays are equals
     * @param a1 an array
     * @param a2 an other array
     * @returns true if a1 contains the same thing in the same order that a2, false otherwise
     */
    arrayEquals(a1, a2) : boolean{
        // TODO : assert a1 and a2 are arrays
        if (a1.length == a2.length) {
            for (let index = 0; index < a1.length; index++) {
                if (a1[index] != a2[index]) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }
}
