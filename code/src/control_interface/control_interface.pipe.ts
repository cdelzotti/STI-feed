import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb'

class EventChecker{
  allowedKey : string[] = [
    "_id",
    "localisation",
    "impact",
    "dateDebut",
    "dateFin",
    "source",
    "relevant",
    "message",
    "type",
    "info"
  ];

  /**
   * Checks if an given thing is a valid event Representation
   * 
   * @param thingReceived 
   * @param dateComparative Tells if the date must be in comparative form
   * @param idImportance Tells how important `_id` is, {0 : Cannot be provided, 1 : can be provided, 2 : must be provided}
   */
  checkEvent(thingReceived, dateComparative : boolean, idImportance : Number){
    // Checks id
    if (thingReceived["_id"] != undefined && idImportance == 0) {
      throw new BadRequestException("_id cannot be provided for this request")
    }
    if (thingReceived["_id"] == undefined && idImportance == 2) {
      throw new BadRequestException("_id must be provided for this request")
    }
    // Checks dates
    if (dateComparative) {
      this.tryToParseComparativeDate(thingReceived);
    } else {
      if (thingReceived.dateDebut != undefined) {
        thingReceived.dateDebut = this.tryToParseDate(thingReceived["dateDebut"])
      } 
      if (thingReceived.dateFin != undefined) {
        thingReceived.dateFin = this.tryToParseDate(thingReceived["dateFin"])
      } 
    }
    // Check ID and relevant
    for (const key in thingReceived) {
      if (this.allowedKey.includes(key)) {
        switch (key) {
          case "_id": {
            try {
              thingReceived._id = new ObjectID(thingReceived._id) 
            } catch (error) {
              throw new BadRequestException("Could not parse ID.")
            }
            break;
          }
          case "relevant" : {
            if (thingReceived.relevant != true && thingReceived.relevant != false) {
              throw new BadRequestException("Relevant must be a boolean value.")
            }
            break;
          }
          default:
            break;
        }
      } else {
        throw new BadRequestException(`${key} is not a valid key`)
      }
    }
    return thingReceived;
  }

  /**
   * Try to parse `thingReceived[key]` into a date object. Returns a BadRequestException
   * if it can't.
   * 
   * @param date a string representing an ISO-formated date.
   * @returns a Date objet, or throws an error.
   */
  tryToParseDate(date : string) : Date {
    try {
      return new Date(date)
    } catch (error) {
      throw new BadRequestException(`Could not parse ${date}, is it a well formed ISO string date?`)
    }
  }

  /**
   * Try to parse dates from thingReceived in
   * a comparative manner
   * 
   * @param thingReceived
   * @returns edits thingReceived dateDebut and dateFin keys, or throw BadRequest error
   * if parsing failed 
   */
  tryToParseComparativeDate(thingReceived){
    let keys : string[] = ["dateDebut", "dateFin"]
    try {
      for (const key in keys) {
        let dateKey : string = keys[key]
        if (thingReceived[dateKey] != undefined){
          let date : Date = new Date(thingReceived[dateKey][1])
          // Checks if ISO string is valid
          if (Number.isNaN(date.getTime())) {
            throw new BadRequestException(`${dateKey} isn't a valid ISO string`)
          }
          if (thingReceived[dateKey][0] == "more"){
            thingReceived[dateKey] = {$gte: date};
          } else if (thingReceived[dateKey][0] == "less") {
            thingReceived[dateKey] = {$lte: date};
          } else {
            throw new BadRequestException(`${keys[key]} doesn't start neither with more nor less. Is it really a list ?`)
          }
        } 
      }
    } catch (error) {
     throw new BadRequestException("Something isn't right in your date formats") 
    }
  }
}


@Injectable()
/**
 * Ensures that the given input is a valid Event representation
 */
export class EventWithoutIDPipe implements PipeTransform {

  transform(thingReceived: any, metadata: ArgumentMetadata) {
    let eventChecker : EventChecker = new EventChecker()
    return eventChecker.checkEvent(thingReceived, false, 0)
  }
}
@Injectable()
/**
 * Ensures that the given input is a valid Event representation
 */
export class EventWithIDPipe implements PipeTransform {

  transform(thingReceived: any, metadata: ArgumentMetadata) {
    let eventChecker : EventChecker = new EventChecker()
    return eventChecker.checkEvent(thingReceived, false, 2)
  }
}
/**
 * Ensures that the given input is a valid Event representation
 */
export class EventWithCompDatePipe implements PipeTransform {

  transform(thingReceived: any, metadata: ArgumentMetadata) {
    let eventChecker : EventChecker = new EventChecker()
    return eventChecker.checkEvent(thingReceived, true, 1)
  }
}
/**
 * Ensures that the given input is a valid Event representation
 */
export class NormalEventPipe implements PipeTransform {

  transform(thingReceived: any, metadata: ArgumentMetadata) {
    let eventChecker : EventChecker = new EventChecker()
    return eventChecker.checkEvent(thingReceived, false, 1)
  }
}

@Injectable()
/**
 * Ensures that the given input is a valid Event representation
 */
export class ObjectIDPipe implements PipeTransform {

  transform(thingReceived: any, metadata: ArgumentMetadata) : ObjectID {
    try {
      thingReceived = new ObjectID(thingReceived.id);
    } catch (error) {
      throw new BadRequestException(`Could not parse ${thingReceived.id} into a mongodb ObjectID`)
    }
    return thingReceived;
  }
}

@Injectable()
/**
 * Ensures that the given input is a valid link representation
 * 
 * A valid link representation is a list of links containing dictionaries
 * with only `name` and `link` as keys.
 */
export class LinkListPipe implements PipeTransform {

  transform(thingReceived: any, metadata: ArgumentMetadata) : ObjectID {
    let allowedKeys : string[] = ["name", "link"]
    let hasKeys : boolean = false;
    
      for (const link in thingReceived) {
        for (const key in thingReceived[link]) {
          if (!allowedKeys.includes(key)){
            throw new BadRequestException(`${key} key isn't allowed`)
          }
          hasKeys = true
        }
      }
    
    if (!hasKeys) {
      throw new BadRequestException("Couldn't find any keys, is it really a dict ?")
    }
    return thingReceived;
  }
}