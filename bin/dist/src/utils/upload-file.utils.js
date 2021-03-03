"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileName = void 0;
exports.handleFileName = (req, file, callback) => {
    let date = new Date();
    let format = file.originalname;
    format = format.split(".").pop();
    callback(null, `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}.${format}`);
};
//# sourceMappingURL=upload-file.utils.js.map