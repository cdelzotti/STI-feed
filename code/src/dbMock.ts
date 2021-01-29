// Huge thanks to Enrique Arrieta who helped me setting up my tests with his nice blog !
// https://earrieta.dev/mocking-our-mongodb-while-testing-in-nestjs-ck1a316df00izjfs1adaw9li6
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { EventData } from './data/data.entity'
import { Messages } from './control_interface/control_interface.entity'


const mongod = new MongoMemoryServer();

export default (customOpts: any = {}) => TypeOrmModule.forRootAsync({
    useFactory: async () => {
      const port = await mongod.getPort();
      const database = await mongod.getDbName();
  
      return {
        type: 'mongodb',
        host: '127.0.0.1',
        port,
        database,
        useUnifiedTopology: true,
        entities: [
            EventData,
            Messages
        ],
        ...customOpts,
      };
    },
  });