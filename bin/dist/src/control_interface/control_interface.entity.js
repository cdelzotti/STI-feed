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
exports.Messages = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Messages = class Messages {
};
__decorate([
    class_validator_1.IsString(),
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Messages.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Messages.prototype, "dateDebut", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Messages.prototype, "dateFin", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Messages.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Messages.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Messages.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Messages.prototype, "published", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Messages.prototype, "relatedEvent", void 0);
Messages = __decorate([
    typeorm_1.Entity("Messages")
], Messages);
exports.Messages = Messages;
//# sourceMappingURL=control_interface.entity.js.map