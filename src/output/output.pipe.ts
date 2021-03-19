import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { UsualPipeFunctions } from '../control_interface/control_interface.pipe'


/**
 * Checks integrity of provided message structure
 */
export class MessageRequest implements PipeTransform {
    transform(thingReceived: any, metadata: ArgumentMetadata) {
        let allowedKey : string[] = [
            "_id",
            "dateDebut",
            "dateFin",
            "title",
            "content",
            "type",
            "published",
            "relatedEvent"
        ];
        for (const key in thingReceived){
            if (allowedKey.includes(key)) {
                if (key == "_id") {
                    thingReceived["_id"] = UsualPipeFunctions.convertID(thingReceived["_id"]);
                  }
                  // Check dates
                  if (key == "dateDebut" || key == "dateFin") {
                    thingReceived[key] = UsualPipeFunctions.tryToParseComparativeDate(thingReceived[key])
                  }
            } else {
                throw new BadRequestException(`${key} is not a valid key`)
            }
        }
        return thingReceived;
    }
  }