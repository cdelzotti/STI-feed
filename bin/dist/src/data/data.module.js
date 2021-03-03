"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModule = void 0;
const common_1 = require("@nestjs/common");
const data_controller_1 = require("./data.controller");
const data_service_1 = require("./data.service");
const data_entity_1 = require("./data.entity");
const typeorm_1 = require("@nestjs/typeorm");
const data_middleware_1 = require("./data.middleware");
let DataModule = class DataModule {
    configure(consumer) {
        consumer.apply(data_middleware_1.DataUpdateAwaitCheck).forRoutes('/data/update-ap/');
    }
};
DataModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([data_entity_1.EventData])],
        controllers: [data_controller_1.DataController],
        providers: [data_service_1.DataService],
    })
], DataModule);
exports.DataModule = DataModule;
//# sourceMappingURL=data.module.js.map