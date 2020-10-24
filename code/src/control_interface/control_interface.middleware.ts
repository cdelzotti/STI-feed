
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { EventData } from '../data/data.entity';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

@Injectable()
/**
 * Middleware that transforms the request so that it returns the events 
 * starting after dateDebut and before dateFin.
 */
export class EventExtractorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // Parse dateDebut
    if (req.body.dateDebut != undefined){
      if (req.body.dateDebut[0] == "more"){
        req.body.dateDebut = {$gte: new Date(req.body.dateDebut[1])};
      } else if (req.body.dateDebut[0] == "less") {
        req.body.dateDebut = {$lte: new Date(req.body.dateDebut[1])};
      } else {
        throw new BadRequestException("Could not parse dateDebut. Is it really a list ?")
      }
    }
    // Parse dateFin
    if (req.body.dateFin != undefined){
      if (req.body.dateFin[0] == "more"){
        req.body.dateFin = {$gte: new Date(req.body.dateFin[1])};
      } else if (req.body.dateFin[0] == "less"){
        req.body.dateFin = {$lte: new Date(req.body.dateFin[1])};
      } else {
        throw new BadRequestException("Could not parse dateFin. Is it really a list ?")
      }
    }
    next();
    }
}