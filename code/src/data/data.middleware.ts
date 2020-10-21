
import { Injectable, NestMiddleware,BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class DataUpdateAwaitCheck implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.body.await != true && req.body.await != false) {
      throw new BadRequestException("Await badly specified");
    }
    next();
  }
}