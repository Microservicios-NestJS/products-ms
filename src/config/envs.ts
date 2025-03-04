
import 'dotenv/config';
import * as joi  from 'joi';


interface EnvVars{
    PORT:number;
    DATABASE_URL:string;
}

const envScherma= joi.object({
    PORT:joi.number().required(),
    DATABASE_URL:joi.string().required(),
})
.unknown(true);


const {error,value} =envScherma.validate(process.env);

if(error){
    throw new Error(`config validation error ${error.message } `);

}

const envVars: EnvVars= value;

export const envs= {
    port:envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
}