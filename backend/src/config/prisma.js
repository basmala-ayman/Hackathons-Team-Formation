
//this line is not correct cause this was happened in the prisma versions before the current prisma version 7 
//but that was cause prisma client was automated added in the node modules but the new version in version 7 it more flexable and give you the option to mention the place the prisma client installed on it
//so when you need to require it here you need to require it from the customized folder you define it in the prisma schema file
// const PrismaClient = require('@prisma/client') 

//so this is the correct way



const { PrismaClient } = require ("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg");
const config = require("./env")

//and then making new object from the prisma client to can use it in dealing with the database

const adapter = new PrismaPg(config.db.url);

const prisma = new PrismaClient({adapter});


module.exports=prisma
//export it to be seen in all other files 