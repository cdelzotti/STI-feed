import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb'

class UsualFunctions{


  static convertID(id : string){
    try {
      return new ObjectID(id);
    } catch (error) {
      throw new BadRequestException(`${id} is not a valid ID`)
    }
  }

  static forceIDImportanceCompliance(thing, idImportance : Number){
    // Checks id
    if (thing["_id"] != undefined && idImportance == 0) {
      throw new BadRequestException("_id cannot be provided for this request")
    }
    if (thing["_id"] == undefined && idImportance == 2) {
      throw new BadRequestException("_id must be provided for this request")
    }
  }

    /**
   * Try to parse `thingReceived[key]` into a date object. Returns a BadRequestException
   * if it can't.
   * 
   * @param date a string representing an ISO-formated date.
   * @returns a Date objet, or throws an error.
   */
  static tryToParseDate(date : string) : Date {
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
  static tryToParseComparativeDate(dateField : Array<string>){
    try {
      let quantificator : string;
      let date : Date;
      // Check structure
      for (let field in dateField) {
        // Check quantificator
        if (field == '0') {
          // The first item must be 'more' or 'less'
          let comparativeType : Array<string> = ["more", "less"];
          if (!comparativeType.includes(dateField[field])){
            throw new BadRequestException(`${dateField[field]} is not valid date quantificator`);
          }
          quantificator = dateField[field];
        // Check date
        } else if (field == '1') {
          date = this.tryToParseDate(dateField[field])
        } else {
          throw new BadRequestException("Something is wrong with your dates's array length")
        }
      }
      // return structure
      if (quantificator == "more") {
        return {
          $gte : date
        };
      } else {
        return {
          $lte : date
        }
      }
    } catch {
      throw new BadRequestException("Something is wrong with your dates");
    }
  }
}

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
    // Check IDs
    UsualFunctions.forceIDImportanceCompliance(thingReceived, idImportance);
    // Check ID and relevant
    for (const key in thingReceived) {
      if (this.allowedKey.includes(key)) {
        if (key == "_id") {
          thingReceived["_id"] = UsualFunctions.convertID(thingReceived["_id"]);
        }
        // Check dates
        if (key == "dateDebut" || key == "dateFin") {
            if (dateComparative){
              thingReceived[key] = UsualFunctions.tryToParseComparativeDate(thingReceived[key])
            } else {
              thingReceived[key] = UsualFunctions.tryToParseDate(thingReceived[key])
            }
        }
      } else {
        throw new BadRequestException(`${key} is not a valid key`)
      }
    }
    return thingReceived;
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
    return UsualFunctions.convertID(thingReceived.id);
  }
}

@Injectable()
/**
 * Ensures that the given input is a valid Messages representation
 * 
 * 
 */
export class MessagePipe implements PipeTransform {

  idImportance : number;
  dateComparison: boolean;

  /**
   * Builds a pipe for messages
   * 
   * @param idImportance An integer that tells how important the id is (0 = forbidden, 1 = allowed, 2 = required)
   * @param dateComparison Tells if date must be in comparative form
   */
  constructor(idImportance : number, dateComparison : boolean){
    this.dateComparison = dateComparison;
    this.idImportance = idImportance;
  }

  transform(thingReceived: any, metadata: ArgumentMetadata) : ObjectID {
    let allowedKeys : string[] = ["_id", "dateDebut", "dateFin", "title", "content", "type", "relatedEvent"]
    UsualFunctions.forceIDImportanceCompliance(thingReceived, this.idImportance);
    for (const key in thingReceived) {
      if ( !allowedKeys.includes(key)) {
        throw new BadRequestException(`${key} is not a valid key`)
      }
      if (key == "_id") {
        thingReceived[key] = UsualFunctions.convertID(thingReceived[key]);
      }
      if (key == "relatedEvent") {
        // Just check it, no convertion
        UsualFunctions.convertID(thingReceived[key])
      }
      if (key == "dateDebut" || key == "dateFin"){
        if (this.dateComparison) {
          thingReceived[key] = UsualFunctions.tryToParseComparativeDate(thingReceived[key]);
        } else {
          thingReceived[key] = UsualFunctions.tryToParseDate(thingReceived[key])
        }
      }
    }
    return thingReceived;
  }
}