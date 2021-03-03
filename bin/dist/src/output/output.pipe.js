"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRequest = void 0;
const common_1 = require("@nestjs/common");
const control_interface_pipe_1 = require("../control_interface/control_interface.pipe");
class MessageRequest {
    transform(thingReceived, metadata) {
        let allowedKey = [
            "_id",
            "dateDebut",
            "dateFin",
            "title",
            "content",
            "type",
            "published",
            "relatedEvent"
        ];
        for (const key in thingReceived) {
            if (allowedKey.includes(key)) {
                if (key == "_id") {
                    thingReceived["_id"] = control_interface_pipe_1.UsualPipeFunctions.convertID(thingReceived["_id"]);
                }
                if (key == "dateDebut" || key == "dateFin") {
                    thingReceived[key] = control_interface_pipe_1.UsualPipeFunctions.tryToParseComparativeDate(thingReceived[key]);
                }
            }
            else {
                throw new common_1.BadRequestException(`${key} is not a valid key`);
            }
        }
        return thingReceived;
    }
}
exports.MessageRequest = MessageRequest;
//# sourceMappingURL=output.pipe.js.map