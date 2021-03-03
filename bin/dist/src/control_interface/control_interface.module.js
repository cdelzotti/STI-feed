"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlInterfaceModule = void 0;
const common_1 = require("@nestjs/common");
const control_interface_controller_1 = require("./control_interface.controller");
const typeorm_1 = require("@nestjs/typeorm");
const data_entity_1 = require("../data/data.entity");
const control_interface_entity_1 = require("./control_interface.entity");
const control_interface_service_1 = require("./control_interface.service");
const user_module_1 = require("../users/user.module");
const control_interface_pipe_1 = require("./control_interface.pipe");
let ControlInterfaceModule = class ControlInterfaceModule {
};
ControlInterfaceModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([data_entity_1.EventData, control_interface_entity_1.Messages]), user_module_1.UserModule],
        controllers: [control_interface_controller_1.ControlInterfaceController],
        providers: [control_interface_service_1.ControlInterfaceService, control_interface_pipe_1.UsualPipeFunctions],
        exports: [control_interface_pipe_1.UsualPipeFunctions]
    })
], ControlInterfaceModule);
exports.ControlInterfaceModule = ControlInterfaceModule;
//# sourceMappingURL=control_interface.module.js.map