import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private static instance: MongooseService;
    private count = 0;
    private config = { useNewUrlParser: true,  useUnifiedTopology: true  };
    constructor() {
        this.connectWithRetry();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new MongooseService();
        }
        return this.instance;
    }

    getMongoose(){
        return mongoose;
    }

    connectWithRetry() {
        log('MongoDB connection with retry');
        mongoose.connect("mongodb://localhost:27017/api-db",  this.config).then(() => {
            log('MongoDB is connected')
        }).catch(err => {
            log(`MongoDB connection unsuccessful, retry after 5 seconds. ${++this.count}`);
            setTimeout(this.connectWithRetry, 5000)
        })
    };
}
export default MongooseService.getInstance();