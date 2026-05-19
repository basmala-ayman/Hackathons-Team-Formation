//here we will make the mapping between the database models ids and the integer ones to can use and send them to the ai model

const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");


//now here this function will return the integer id
const getOrCreateAIId = async (entityId, entityType) => {
    //just the first thing we need to check if this mapping happended before or no and that by using the index we make in the model 
    let mapping = await prisma.aIIdentityMap.findUnique({
        where: {
            entityId_entityType: {
                entityId,
                entityType
            }
        }
    });

    //and if we already find mapping so we just need to send them back no need for make new mapping 
    if (mapping) return mapping.id;

    //otherwise make new one and return the id back 
    mapping = await prisma.aIIdentityMap.create({
        data: {
            entityId,
            entityType
        }
    });

    return mapping.id;
};


//the note here that the returned id is the one will can be used easily with the ai model which is the integer id one 



//we will also will need to make another function that will reverse mapping so after the ai model return the members integer ids i will need to
//to reverse them back to their original string uuid to can use them 
const getRealEntityId = async (aiId) => {
    const mapping = await prisma.aIIdentityMap.findUnique({
        where: {
            id: aiId
        }
    });

    if (!mapping) {
        throw new AppError("AI Mapping Not Found", 404);
    }

    //just returning the uuid id only 
    return mapping?.entityId;;
};



module.exports = {
    getOrCreateAIId,
    getRealEntityId
};