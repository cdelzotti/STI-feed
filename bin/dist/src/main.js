"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/control-site', express.static('website/control/dist/control'));
    app.use('/public-site', express.static('website/public/dist/control'));
    app.use('/pictures', express.static('static/img'));
    app.use('/cloud', express.static('static/cloud'));
    app.use('/tinymce', express.static('static/tinymce'));
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map