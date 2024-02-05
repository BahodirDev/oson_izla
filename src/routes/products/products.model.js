const {BadUserInput} = require("../../utils/HttpErrors");

async function getPoroductsModel({body}){
    console.log({body});
    if(body && !body.id){
        throw new BadUserInput("id inctance is required","handling name in products getModel")
    }
    return `${body.id} was executed`
}

module.exports = {getPoroductsModel};