
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { EventData } from '../data/data.entity';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

@Injectable()
/**
 * Middle where that transforms the request so that it returns the events 
 * starting after dateDebut and before dateFin.
 */
export class EventExtractorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.body.dateDebut != undefined){
      req.body.dateDebut = MoreThanOrEqual(req.body.dateDebut);
    }
    if (req.body.dateFin != undefined){
      req.body.dateFin = LessThanOrEqual(req.body.dateFin);
    }
      next();
  }
}