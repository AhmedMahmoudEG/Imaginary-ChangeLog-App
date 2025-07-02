import merge from 'lodash.merge';
import lodash from 'lodash.merge'

//if procss enviroment exist keep it as it as if not set it to developemnt (default)
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || 'local'

let envConfig
if(stage == 'production'){
    envConfig = require('./prod').default
}else if(stage == 'testing'){
    envConfig = require('./testing').default
}else{
    envConfig = require('./dev').default
}

export default merge ({
    stage,
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    secrets:{
        jwt:process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    },
    logging:false
},envConfig)