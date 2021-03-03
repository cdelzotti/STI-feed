"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const data_entity_1 = require("./data/data.entity");
const control_interface_entity_1 = require("./control_interface/control_interface.entity");
const users_entity_1 = require("./users/users.entity");
const mongod = new mongodb_memory_server_1.MongoMemoryServer();
exports.default = (customOpts = {}) => typeorm_1.TypeOrmModule.forRootAsync({
    useFactory: async () => {
        const port = await mongod.getPort();
        const database = await mongod.getDbName();
        return Object.assign({ type: 'mongodb', host: '127.0.0.1', port,
            database, useUnifiedTopology: true, entities: [
                data_entity_1.EventData,
                control_interface_entity_1.Messages,
                users_entity_1.User
            ] }, customOpts);
    },
});
//# sourceMappingURL=dbMock.js.map