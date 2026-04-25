const BASE_URL = "https://api.discordz.xyz/discord/v1/user?id=";
const fetch = require("node-fetch");
async function getdcname(botid) {
 await fetch(BASE_URL + botid)
  .then((res) => res.json())
  .then((body) => console.log(body))
  .catch((e) => console.log(e));
}
module.exports = getdcname;
// the hell is this?

//I don't know anything about this BASE_URLhmm do you wana use notsaksh method for botcreation?
//try 
//make a directory like the template in code
// ? i got some bot templates ill call a folder servicebots all the templates will be in there?
//well we should first try with one bot code yea ill make one folder with one code
//ok