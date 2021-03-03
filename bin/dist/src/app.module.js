"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const control_interface_module_1 = require("./control_interface/control_interface.module");
const user_module_1 = require("./users/user.module");
const data_module_1 = require("./data/data.module");
const output_module_1 = require("./output/output.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const data_entity_1 = require("./data/data.entity");
const control_interface_entity_1 = require("./control_interface/control_interface.entity");
const users_entity_1 = require("./users/users.entity");
const platform_express_1 = require("@nestjs/platform-express");
const cloud_module_1 = require("./cloud/cloud.module");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            control_interface_module_1.ControlInterfaceModule,
            data_module_1.DataModule,
            platform_express_1.MulterModule.register({
                dest: './static/img'
            }),
            output_module_1.OutputModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mongodb",
                host: "localhost",
                database: "stifeed",
                port: 27017,
                synchronize: true,
                username: "stiuser",
                password: "root",
                entities: [
                    data_entity_1.EventData,
                    control_interface_entity_1.Messages,
                    users_entity_1.User,
                ],
                useUnifiedTopology: true
            }), cloud_module_1.CloudModule,
        ],
        controllers: [],
        providers: [],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map