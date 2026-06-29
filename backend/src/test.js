const { prisma } = require("./src/config/db");

async function test() {
  const users = await prisma.user.findMany();
  console.log(users);
}

test();