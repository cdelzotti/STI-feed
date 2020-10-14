import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'
import * as express from 'express'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  
  // app.use('/public-site', express.static('website/control/dist/public'));
  app.use('/control-site' ,express.static('website/control/dist/control'));
  app.use('/public-site' ,express.static('website/public/dist/control'));
  // app.setBaseViewsDir(join(__dirname, 'website'))
  // app.useStaticAssets(join(__dirname, 'website/control/dist/control/'))

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
