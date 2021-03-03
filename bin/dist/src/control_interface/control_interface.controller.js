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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlInterfaceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../users/jwt-auth.guard");
const control_interface_service_1 = require("./control_interface.service");
const control_interface_pipe_1 = require("./control_interface.pipe");
const mongodb_1 = require("mongodb");
let ControlInterfaceController = class ControlInterfaceController {
    constructor(controlInterfaceService) {
        this.controlInterfaceService = controlInterfaceService;
    }
    async getEvents(body) {
        return this.controlInterfaceService.getEvents(body);
    }
    async editEvent(event) {
        return this.controlInterfaceService.editEvent(event["_id"], event);
    }
    async deleteEvent(event) {
        return this.controlInterfaceService.deleteEvent(event);
    }
    async addEvent(event) {
        return this.controlInterfaceService.addEvent(event);
    }
    async getMsg(msg) {
        return this.controlInterfaceService.getMessages(msg);
    }
    async addMsg(msg) {
        return this.controlInterfaceService.addMessage(msg);
    }
    async deleteMessage(id) {
        return this.controlInterfaceService.deleteMessage(id);
    }
    async editMessage(msg) {
        return this.controlInterfaceService.editMessage(msg);
    }
    async getEventMessages(eventID) {
        return this.controlInterfaceService.getEventMessage(eventID);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post("select-event/"),
    __param(0, common_1.Body(new control_interface_pipe_1.EventWithCompDatePipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "getEvents", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put("event/"),
    __param(0, common_1.Body(new control_interface_pipe_1.EventWithIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "editEvent", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete("event/"),
    __param(0, common_1.Body(new control_interface_pipe_1.NormalEventPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "deleteEvent", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post("event/"),
    __param(0, common_1.Body(new control_interface_pipe_1.EventWithoutIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "addEvent", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post("getMsg/"),
    __param(0, common_1.Body(new control_interface_pipe_1.MessagePipe(1, true))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "getMsg", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post("msg/"),
    __param(0, common_1.Body(new control_interface_pipe_1.MessagePipe(0, false))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "addMsg", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete("msg/:id"),
    __param(0, common_1.Param(new control_interface_pipe_1.ObjectIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "deleteMessage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put("msg/"),
    __param(0, common_1.Body(new control_interface_pipe_1.MessagePipe(2, false))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "editMessage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get("eventmsg/:id"),
    __param(0, common_1.Param(new control_interface_pipe_1.ObjectIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControlInterfaceController.prototype, "getEventMessages", null);
ControlInterfaceController = __decorate([
    common_1.Controller("control/"),
    __metadata("design:paramtypes", [control_interface_service_1.ControlInterfaceService])
], ControlInterfaceController);
exports.ControlInterfaceController = ControlInterfaceController;
//# sourceMappingURL=control_interface.controller.js.map