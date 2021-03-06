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
  
  // Serve websites
  app.use('/control-site' ,express.static('website/control/dist/control'));
  app.use('/public-site' ,express.static('website/public/dist/control'));
  // Serve static ressources for websites
  app.use('/pictures' ,express.static('static/img'));
  // Serve uploaded files for control site
  app.use('/cloud' ,express.static('static/cloud'));
  // Serve TinyMCE for WYSIWYG editor in control site
  app.use('/tinymce' ,express.static('static/tinymce'));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
