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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
let DataController = class DataController {
    constructor(apRetreiver) {
        this.apRetreiver = apRetreiver;
    }
    async getAP(forceAwait) {
        let path = "static/AP.xlsx";
        if (forceAwait) {
            return this.apRetreiver.APextract(path);
        }
        else {
            this.apRetreiver.APextract(path);
            return {
                update: "AP",
                status: "",
                error: false
            };
        }
    }
};
__decorate([
    common_1.Post("update-ap/"),
    __param(0, common_1.Body("await", new common_1.ParseBoolPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getAP", null);
DataController = __decorate([
    common_1.Controller("data/"),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DataController);
exports.DataController = DataController;
//# sourceMappingURL=data.controller.js.map