/**
 * BOOSTERS
 */
const client = require("../index");

console.log(`[🔑 PRIVATE] Loaded the Private-Event: Boosters`.blue.bold)  
  client.on("guildMemberUpdate", async (oM, nM) => {
    
    
    
      //if he/she starts boosting    
      if(!oM.premiumSince && nM.premiumSince) {
        nM.send(`<:tick:1017432631689871360> **Thanks for Boosting Developer Tech!** <:tick:1017432631689871360>\n**Claim Your Perks: <#1083054509594521630>**`).catch(() => {});
      }
      //if he/she boosts again
      if(oM.premiumSince && oM.premiumSinceTimestamp != nM.premiumSinceTimestamp) {
        nM.send(`<:tick:1017432631689871360> **Thanks for Boosting Developer Tech again!** <:tick:1017432631689871360>\n**Claim More Perks: <#1083054509594521630>**`).catch(() => {});
      }
  //if he/she stops boosting
  if(oM.premiumSince && !nM.premiumSince) {
        nM.send(`<:arrow:1047956343966937128> **It's sad to see you nolonger boosting us!**`).catch(console.warn)
      } 
    



    
      let boostLogChannel = nM.guild.channels.cache.get("1091635745447489556");
      if(!boostLogChannel) boostLogChannel = await nM.guild.channels.fetch("1091635745447489556").catch(()=>{}) || false;
      if(!boostLogChannel) return;
      

          
      //if he/she stops boosting
      if(oM.premiumSince && !nM.premiumSince) {
        return boostLogChannel.send(`<:arrow:1047956343966937128> **${nM.user} has stopped boosting us! Sad times...**`).catch(console.warn)
      } 
      //if he/she starts boosting
      if(!oM.premiumSince && nM.premiumSince) {
        return boostLogChannel.send(`<:tick:1017432631689871360> **${nM.user} Thanks for boosting us!**`).catch(console.warn);
      }
      //if he/she starts boosting
      if(oM.premiumSince && oM.premiumSinceTimestamp != nM.premiumSinceTimestamp) {
        return boostLogChannel.send(`<:tick:1017432631689871360> **${nM.user} Boosted us again!**`).catch(console.warn);
      }
  });