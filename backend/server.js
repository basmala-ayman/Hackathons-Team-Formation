require("dotenv").config();

const app = require("./app");
const prisma = require ("./src/config/prisma")

const PORT = process.env.PORT || 3000;


// there is a note related to the prisma that it is lazy connection that means it will connect and ensure that the connection is correct in the first query called 
const startServer = async () =>{
  try {
    //connect the database
    await prisma.$connect();
    console.log("postgreSQL connected via prisma 🔥 ");

    //make the server
    app.listen(PORT, ()=>{
      console.log(`server running on port ${PORT} 🚀`)
    });

  }catch (error){
    console.log("DB connection falied ",error);
    process.exit(1);
  }
}


//and then just call the function to start the things
startServer();