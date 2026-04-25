module.exports = {
 debug: true, // Boolean
 whitelist_enabled: false,
 allowed_ips: ["::ffff:59.149.31.198"], // Array with IP's
 bot: {
  type: ["Ticket", "Chat"],
  statustype: ["Online", "Dnd", "Idle"],
 },
 teams: [
  {
   name: "Critical_DevX",
   avatar: "masterious.png",
   description: "Founder",
   whatheis: "Founder",
  },
   {
  name: "NickCodez",
  avatar: "nickcodez.jpeg",
  description: "Developer & Owner",
  whatheis: "Owner of Milenium",
   },
 {
  name: "DpdxGamer",
  avatar: "dpdx.png",
  description: "Fixes Bugs and stuff",
  whatheis: "Owner of DpdxGamer Botshop",
   },
 ],
};
