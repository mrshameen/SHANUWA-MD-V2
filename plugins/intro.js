

const { smd, Config,smdBuffer,  prefix } = require('../lib')


var surl = 'https://github.com/mrshameen/SHANUWA-MD-V2' // Source URL
const number = '94724389699'
var name = ' SHANUWA MIND'
var body = '𝑇𝛩𝑈𝐶𝛨 𝛨𝛯𝑅𝛯'
var image = 'https://telegra.ph/file/2368f1b5d6ff724ae0c51.jpg'
let text = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
│       「 SHANUWA MIND INFO  」
│ Name      : Shanuwa 
│ Place       : Asia/Galle
│ Gender    :  Male
│ Age          : 17
│ education : Central 
│ Phone     : wa.me/94724389699
│ Youtube   : https://www.youtube.com/@SL_Shanuwa
│ GitHub    : https://github.com/mrshameen

╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄`





 //---------------------------------------------------------------------------
 smd({
             pattern: "intro",
             alias: ["shanuwa","badar"],
             desc: "Show intro of user",
             category: "fun",
             filename: __filename,
             use: '<group link.>',
         },
         async(message) => {
    try{
          let media ;try{ media = await smdBuffer(image) }catch{media = log0}
           const q =await message.bot.fakeMessage("contact",{},name) 
           let contextInfo = {...(await message.bot.contextInfo(name,body,media,1,surl, 2) )}
           await message.send(text, {contextInfo : contextInfo },"suhail",  q )
    }catch(e){ await message.error(`${e}\n\ncommand: intro`,e,false)}


 })
