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
exports.CloudController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const upload_file_utils_1 = require("../utils/upload-file.utils");
const cloud_service_1 = require("./cloud.service");
const jwt_auth_guard_1 = require("../users/jwt-auth.guard");
let CloudController = class CloudController {
    constructor(cloudService) {
        this.cloudService = cloudService;
    }
    async uploadAttached(file) {
        return this.cloudService.checkFile(file.filename);
    }
    async removeAttached(name) {
        this.cloudService.deleteFile(name);
        return {
            fileDeleted: true
        };
    }
    async uploadList() {
        return this.cloudService.getFilesList();
    }
};
__decorate([
    common_1.Post(""),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './static/cloud',
            filename: upload_file_utils_1.handleFileName
        })
    })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudController.prototype, "uploadAttached", null);
__decorate([
    common_1.Delete(""),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CloudController.prototype, "removeAttached", null);
__decorate([
    common_1.Get(""),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CloudController.prototype, "uploadList", null);
CloudController = __decorate([
    common_1.Controller('cloud'),
    __metadata("design:paramtypes", [cloud_service_1.CloudService])
], CloudController);
exports.CloudController = CloudController;
//# sourceMappingURL=cloud.controller.js.map