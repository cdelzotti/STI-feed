"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const assert = require("assert");
let CloudService = class CloudService {
    async deleteFile(name) {
        assert(name != "", "name cannot be empty");
        fs_1.unlink(`./static/cloud/${name}`, () => { });
    }
    async getFilesList() {
        return fs_1.readdirSync('./static/cloud/');
    }
    async checkFile(name) {
        assert(name != "", "name cannot be empty");
        return {
            link: `cloud/${name}`
        };
    }
};
CloudService = __decorate([
    common_1.Injectable()
], CloudService);
exports.CloudService = CloudService;
//# sourceMappingURL=cloud.service.js.map