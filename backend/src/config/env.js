
//the variables we need to geet them from the ,env file 
const requiredEnvVars = [
    "DATABASE_URL",
    "PORT",
    "NODE_ENV",
    "EMAIL_USER",
    "EMAIL_PASS",
    "BASE_URL",
];

//and then loop for each of this needed variables and making validation for them to make fast failure if there is missing in one of them and detect them from the start

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(` Missing required environment variable: ${key}`);
        process.exit(1);
    }
});


//and then building the config object to can export it and call it in another files

/**
 * here we group all the needed things and the needed variables in the same object togather and that why we define the config object
 * and here we define the db as object cause when the project will be grown there is will be existed more variables here extra to the url so thats why we need to make the db as object
 */
const config = {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT) || 3000,
    db: {
        url: process.env.DATABASE_URL,
    },

    email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  baseUrl: process.env.BASE_URL,
};


module.exports=config;