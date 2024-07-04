const {
  groupdb,
  smd,
  getBuffer,
  tlang,
  prefix
} = require("../lib");
const eco = require("discord-mongoose-economy");
let ty = false;
try {
  if (isMongodb) {
    ty = eco.connect(mongodb);
    console.log("Connected with discord economy!!");
  }
} catch (_0x50a159) {
  ty = false;
}
if (ty) {
  smd({
    'pattern': "daily",
    'desc': "daily gold.",
    'category': "economy",
    'filename': __filename
  }, async ({
    reply: _0x122b74,
    chat: _0x34d35b,
    isGroup: _0x4de5d4,
    sender: _0x4d1059,
    error: _0x42f0c2
  }) => {
    try {
      let _0x27a939 = (await groupdb.findOne({
        'id': _0x34d35b
      })) || {};
      if (_0x27a939?.["economy"] == "false") {
        return _0x122b74("*🚦Economy* is not active in current group.");
      }
      if (!_0x4de5d4) {
        return _0x122b74(tlang().group);
      }
      const _0x127855 = await eco.daily(_0x4d1059, "Asta", 500);
      if (_0x127855.cd) {
        return await _0x122b74("🧧 You already claimed daily for today, come back in " + _0x127855.cdL + '🫡');
      } else {
        _0x122b74("you claimed daily " + _0x127855.amount + " 🪙 for today🎉.");
      }
    } catch (_0x19d717) {
      _0x42f0c2(_0x19d717 + "\n\ncommand: daily", _0x19d717);
    }
  });
  smd({
    'pattern': "resetwallet",
    'desc': "reset wallet of quoted user.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async _0x293528 => {
    try {
      let _0x308470 = (await groupdb.findOne({
        'id': _0x293528.chat
      })) || (await groupdb["new"]({
        'id': _0x293528.chat
      }));
      let _0x24f192 = _0x308470.economy || "false";
      if (_0x24f192 == "false") {
        return _0x293528.reply("*🚦Economy* is not active in current group.");
      }
      if (!isCreator) {
        return _0x293528.reply(tlang().owner);
      }
      let _0x2df11a = _0x293528.mentionedJid ? _0x293528.mentionedJid[0] : _0x293528.msg.contextInfo.participant || false;
      if (!_0x2df11a) {
        return _0x293528.reply("Please give me user.");
      }
      const _0x4d4e37 = await eco.balance(_0x2df11a, "Asta");
      await eco.deduct(_0x2df11a, "Asta", _0x4d4e37.wallet);
      return await _0x293528.reply("⛩️ User: @" + _0x2df11a.split('@')[0] + " \n *🧧 @" + _0x2df11a.split('@')[0] + " lost all 🪙 in wallet.*\n_Now live with that poverty.🫡_", {
        'mentions': [_0x2df11a]
      });
    } catch (_0x409352) {
      _0x293528.error(_0x409352 + "\n\ncommand: resetwallet", _0x409352);
    }
  });
  smd({
    'pattern': "capacity",
    'desc': "update capacity.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async (_0x2bbae4, _0x2906d4) => {
    try {
      let _0x4e2bdc = (await groupdb.findOne({
        'id': _0x2bbae4.chat
      })) || (await groupdb["new"]({
        'id': _0x2bbae4.chat
      }));
      let _0x2c02b1 = _0x4e2bdc.economy || "false";
      if (_0x2c02b1 == "false") {
        return _0x2bbae4.reply("*🚦Economy* is not active in current group.");
      }
      if (!_0x2bbae4.isGroup) {
        return _0x2bbae4.reply(tlang().group);
      }
      if (!_0x2906d4) {
        return _0x2bbae4.reply("💴 *Bank-capacity* 💳\n\n1 | *1000 sp* = 🪙100\n\n2 | *100000 sp* = 🪙1000\n\n3 | *10000000 sp* = 🪙10000000\n\nExample- " + prefix + "capacity 1 OR " + prefix + "bankupgrade 1000");
      }
      let _0x39947b = _0x2bbae4.mentionedJid ? _0x2bbae4.mentionedJid[0] : _0x2bbae4.msg.contextInfo.participant || false;
      let _0x7367a1 = _0x2906d4.trim();
      let _0x3df779 = parseInt(_0x7367a1);
      const _0x154dd8 = await eco.balance(_0x39947b, "Asta");
      switch (_0x7367a1) {
        case "1000":
        case '1':
          if (_0x3df779 > _0x154dd8.wallet) {
            return _0x2bbae4.reply("*_You need to pay 🪙100 to increase bank capacity ~ 1000 sp_*");
          }
          return await _0x2bbae4.reply("*1000 🪙diamond storage has been added in " + _0x2bbae4.senderName + " bank*");
          break;
        case "100000":
        case '2':
          if (_0x3df779 < _0x154dd8.wallet) {
            return _0x2bbae4.reply("*You need to pay 🪙1000 to increase bank capacity ~ 100000 sp*");
          }
          return await _0x2bbae4.reply("*100000 🪙diamond storage has been added in " + _0x2bbae4.pushName + " bank*");
          break;
        case "10000000":
        case '3':
          if (_0x3df779 < _0x154dd8.wallet) {
            return _0x2bbae4.reply("You need to pay 🪙10000 to increase bank capacity ~ 1000 sp");
          }
          return await _0x2bbae4.reply("*10000000 🪙diamond storage has been added in " + _0x2bbae4.pushName + "'s bank*");
          break;
        default:
          await _0x2bbae4.reply("*What are you trying to do📉*.");
      }
    } catch (_0x2e945b) {
      _0x2bbae4.error(_0x2e945b + "\n\ncommand: capacity", _0x2e945b);
    }
  });
  smd({
    'pattern': "deposit",
    'desc': "deposit gold.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async (_0xb45ba0, _0x3db99c) => {
    try {
      let _0xf820a4 = (await groupdb.findOne({
        'id': _0xb45ba0.chat
      })) || {};
      let _0x484684 = _0xf820a4.economy || "false";
      if (_0x484684 == "false") {
        return _0xb45ba0.reply("*🚦Economy* is not active in current group.");
      }
      if (!_0x3db99c) {
        return _0xb45ba0.reply("Baka!! Provide the 💰amount you want to deposit!");
      }
      let _0x350eac = parseInt(_0x3db99c);
      const _0x4f2bb0 = await eco.deposit(_0xb45ba0.sender, "Asta", _0x350eac);
      if (_0x4f2bb0.noten) {
        return _0xb45ba0.reply("You can't deposit what you don't have💰.");
      }
      return await _0xb45ba0.reply("⛩️ Sender: " + _0xb45ba0.pushName + "\n🍀Successfully 💰Deposited 🪙" + _0x4f2bb0.amount + " to your bank.Upgrade your bank capacity to add more money📈.");
    } catch (_0x4ba489) {
      _0xb45ba0.error(_0x4ba489 + "\n\ncommand: deposit", _0x4ba489);
    }
  });
  smd({
    'pattern': 'lb',
    'desc': "check leaderboard.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async _0x123b57 => {
    try {
      let _0x2d18d9 = await eco.lb("Asta", 10);
      let _0x129e5b = "*Top " + _0x2d18d9.length + " users with more money in wallet.*\n";
      let _0x10cbc3 = [];
      for (let _0x25dbc1 = 0; _0x25dbc1 < _0x2d18d9.length; _0x25dbc1++) {
        var _0x429201 = _0x123b57.bot.getName(_0x2d18d9[_0x25dbc1].userID);
        _0x129e5b += '*' + (_0x25dbc1 + 1) + "*\n╭─────────────◆\n│ *Name:-* _" + _0x429201 + "_\n│ *User:-* _@" + _0x2d18d9[_0x25dbc1].userID.split('@')[0] + "_\n│ *Wallet:-* _" + _0x2d18d9[_0x25dbc1].wallet + "_\n│ *Bank Amount:-* _" + _0x2d18d9[_0x25dbc1].bank + "_\n│ *Bank Capacity:-* _" + _0x2d18d9[_0x25dbc1].bankCapacity + "_\n╰─────────────◆\n\n";
        _0x10cbc3.push(_0x2d18d9[_0x25dbc1].userID);
      }
      await _0x123b57.reply(_0x129e5b, {
        'mentions': _0x10cbc3
      });
    } catch (_0x19f0a9) {
      _0x123b57.error(_0x19f0a9 + "\n\ncommand: lb", _0x19f0a9);
    }
  });
  smd({
    'pattern': "transfer",
    'desc': "transfer gold.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async (_0x1ae6b4, _0x2734e2) => {
    try {
      let _0x36733f = (await groupdb.findOne({
        'id': _0x1ae6b4.chat
      })) || {};
      let _0x4199f6 = _0x36733f.economy || "false";
      if (_0x4199f6 == "false") {
        return _0x1ae6b4.reply("*🚦Economy* is not active in current group.");
      }
      let _0x19535c = _0x2734e2.trim().split(" ");
      if (_0x19535c[0] === '') {
        return _0x1ae6b4.reply("Use " + prefix + "transfer 100 @user");
      }
      let _0x5bc1f8 = _0x1ae6b4.mentionedJid ? _0x1ae6b4.mentionedJid[0] : _0x1ae6b4.msg.contextInfo.participant || false;
      if (!_0x5bc1f8) {
        return _0x1ae6b4.reply("Please give me any user🤦‍♂️.");
      }
      const _0x13ea26 = _0x1ae6b4.sender;
      const _0x1cf381 = _0x19535c[0];
      let _0x380364 = parseInt(_0x1cf381);
      if (!_0x380364) {
        return _0x1ae6b4.reply("check your text plz u r using the command in a wrong way👀");
      }
      const _0x4f3006 = await eco.balance(_0x13ea26, "Asta");
      let _0x4416b2 = _0x4f3006.wallet < parseInt(_0x1cf381);
      if (_0x4416b2 == true) {
        return _0x1ae6b4.reply("you dont have sufficient money to transfer👎");
      }
      return await _0x1ae6b4.reply("*📠 Transaction successful of " + _0x19535c[0] + " 💰*");
    } catch (_0x4b4c76) {
      _0x1ae6b4.error(_0x4b4c76 + "\n\ncommand: transfer", _0x4b4c76);
    }
  });
  smd({
    'pattern': "wallet",
    'desc': "shows wallet.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async _0x2e8ce0 => {
    try {
      let _0x4debc9 = (await groupdb.findOne({
        'id': _0x2e8ce0.chat
      })) || (await groupdb["new"]({
        'id': _0x2e8ce0.chat
      }));
      let _0x196c25 = _0x4debc9.economy || "false";
      if (_0x196c25 == "false") {
        return _0x2e8ce0.reply("*🚦Economy* is not active in current group.");
      }
      const _0x3d55c0 = await eco.balance(_0x2e8ce0.sender, "Asta");
      return await _0x2e8ce0.reply("*👛 " + _0x2e8ce0.pushName + "'s Purse:*\n\n_🪙" + _0x3d55c0.wallet + '_');
    } catch (_0x4d67a5) {
      _0x2e8ce0.error(_0x4d67a5 + "\n\ncommand: wallet", _0x4d67a5);
    }
  });
  smd({
    'pattern': "give",
    'desc': "Add money in wallet.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async (_0x436903, _0x30f2ff) => {
    try {
      if (!_0x436903.isCreator) {
        return _0x436903.reply("*_Hey Master, only my owner can give money!_*");
      }
      let _0x276bf1 = _0x436903.mentionedJid ? _0x436903.mentionedJid[0] : _0x436903.msg?.["contextInfo"]?.["participant"] || false;
      if (!_0x276bf1) {
        return _0x436903.reply("Please give me user to add money.");
      }
      await eco.give(_0x276bf1, "Asta", parseInt(_0x30f2ff.split(" ")[0]));
      return await _0x436903.bot.sendMessage(_0x436903.chat, {
        'text': "Added 📈 " + parseInt(_0x30f2ff.split(" ")[0]) + " to @" + _0x276bf1.split('@')[0] + " wallet🛸.",
        'mentions': [_0x276bf1]
      }, {
        'quoted': _0x436903
      });
    } catch (_0x2d005c) {
      _0x436903.error(_0x2d005c + "\n\ncommand: give", _0x2d005c);
    }
  });
  smd({
    'pattern': "bank",
    'desc': "shows bank amount.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async _0x180872 => {
    try {
      let _0x583b68 = (await groupdb.findOne({
        'id': _0x180872.chat
      })) || (await groupdb["new"]({
        'id': _0x180872.chat
      }));
      let _0x556a6d = _0x583b68.economy || "false";
      if (_0x556a6d == "false") {
        return _0x180872.reply("*🚦Economy* is not active in current group.");
      }
      const _0x413119 = await eco.balance(_0x180872.sender, "Asta");
      return await _0x180872.reply("🍀User: " + _0x180872.pushName + "\n\n_🪙" + _0x413119.bank + '/' + _0x413119.bankCapacity + '_');
    } catch (_0x1d4d5c) {
      _0x180872.error(_0x1d4d5c + "\n\ncommand: bank", _0x1d4d5c);
    }
  });
  smd({
    'pattern': "rob",
    'desc': "rob bank amount.",
    'category': "economy",
    'filename': __filename
  }, async _0x45c264 => {
    try {
      let _0x41ecfc = (await groupdb.findOne({
        'id': _0x45c264.chat
      })) || (await groupdb["new"]({
        'id': _0x45c264.chat
      }));
      let _0x2216f1 = _0x41ecfc.economy || "false";
      if (_0x2216f1 == "false") {
        return _0x45c264.reply("*🚦Economy* is not active in current group.");
      }
      let _0x25ffd1 = _0x45c264.mentionedJid ? _0x45c264.mentionedJid[0] : _0x45c264.msg.contextInfo.participant || false;
      if (!_0x25ffd1) {
        return _0x45c264.reply("Please give me user to rob.");
      }
      const _0x57244c = _0x45c264.sender;
      const _0x55eec5 = await eco.balance(_0x57244c, "Asta");
      const _0x1c7d6a = await eco.balance(_0x25ffd1, "Asta");
      const _0x24cdc8 = ["ran", "rob", "caught"];
      const _0x1dbda8 = _0x24cdc8[Math.floor(Math.random() * _0x24cdc8.length)];
      if (1000 > _0x55eec5.wallet) {
        return _0x45c264.reply("*☹️ You don't have enough money to pay incase you get caught*");
      }
      if (1000 > _0x1c7d6a.wallet) {
        return _0x45c264.reply("*Sorry, your victim is too poor 🤷🏽‍♂️ let go🫤.*");
      }
      switch (_0x1dbda8) {
        case "ran":
          await _0x45c264.reply("*Your victim escaped, be more scary next time🫰.*");
          break;
        case "rob":
          const _0x5a1ebf = Math.floor(Math.random() * 1000);
          await eco.deduct(_0x25ffd1, "Asta", _0x5a1ebf);
          await eco.give(_0x45c264.sender, "Asta", _0x5a1ebf);
          await _0x45c264.reply("*🤑 Robbery operation done successfully.🗡️*\nYou ran with " + _0x5a1ebf + " amount in your wallet.");
          break;
        case "caught":
          const _0x447225 = Math.floor(Math.random() * 1000);
          await eco.deduct(_0x57244c, "Asta", _0x447225);
          await _0x45c264.reply("*Sorry FBI👮 caught up with you, you paid " + _0x447225 + " 🪙 from wallet🥹.*");
          break;
        default:
          await _0x45c264.reply("*What are you trying to do👀*.");
      }
    } catch (_0x24b8f1) {
      _0x45c264.error(_0x24b8f1 + "\n\ncommand: rob", _0x24b8f1);
    }
  });
  smd({
    'pattern': "withdraw",
    'desc': "withdraw money from bank account.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async (_0x157076, _0x2cb50d) => {
    try {
      let _0x2b5457 = (await groupdb.findOne({
        'id': _0x157076.chat
      })) || {};
      let _0x557a96 = _0x2b5457.economy || "false";
      if (_0x557a96 == "false") {
        return _0x157076.reply("*🚦Economy* is not active in current group.");
      }
      const _0x4d66f5 = _0x157076.sender;
      if (!_0x2cb50d) {
        return _0x157076.reply("*Provide the amount💰 you want to withdraw💳!*");
      }
      const _0x3e69e3 = _0x2cb50d.trim();
      const _0x3e29bf = await eco.withdraw(_0x4d66f5, "Asta", _0x3e69e3);
      if (_0x3e29bf.noten) {
        return _0x157076.reply("*🏧 Insufficient fund in bank🫤*");
      }
      _0x157076.reply("*🏧 ALERT* \n _🪙" + _0x3e29bf.amount + " has been withdrawn from your wallet💰._");
    } catch (_0x32ecc2) {
      _0x157076.error(_0x32ecc2 + "\n\ncommand: withdraw", _0x32ecc2);
    }
  });
  smd({
    'pattern': "gamble",
    'desc': "gamble money.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async (_0x1487ec, _0x1fcf44) => {
    try {
      let _0x3c8903 = (await groupdb.findOne({
        'id': _0x1487ec.chat
      })) || {};
      let _0x16efb3 = _0x3c8903.economy || "false";
      if (_0x16efb3 == "false") {
        return _0x1487ec.reply("*🚦Economy* is not active in current group.");
      }
      const _0x1553b7 = _0x1487ec.sender;
      var _0xdd1af4 = _0x1fcf44.split(" ");
      var _0x635fc3 = _0xdd1af4[1];
      var _0x39ccfd = _0xdd1af4[0].toLowerCase();
      var _0x41bcc8 = parseInt(_0x39ccfd);
      const _0x6a3740 = await eco.balance(_0x1553b7, "Asta");
      const _0x1f4361 = _0x6a3740.wallet > parseInt(_0x39ccfd);
      const _0x5909de = 50 > parseInt(_0x39ccfd);
      const _0x542f8b = _0x41bcc8 * 2;
      var _0x4955c2;
      if (_0x635fc3 === "left") {
        _0x4955c2 = "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/leftr.webp?raw=true";
      } else {
        if (_0x635fc3 === "right") {
          _0x4955c2 = "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/rightr.webp?raw=true";
        } else {
          if (_0x635fc3 === 'up') {
            _0x4955c2 = "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/upr.webp?raw=true";
          } else if (_0x635fc3 === "down") {
            _0x4955c2 = "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/downr.webp?raw=true";
          } else {
            _0x1487ec.reply("Please provide direction(left,right,up,down).\nEg:- " + prefix + "gamble 200 left");
          }
        }
      }
      let _0x522fc4 = await getBuffer(_0x4955c2);
      _0x1487ec.reply(_0x522fc4, {
        'packname': "Asta",
        'author': "Economy"
      }, "sticker");
      const _0x935022 = ['up', "right", "left", "down", 'up', "left", "down", "right", 'up', "down", "right", "left"];
      const _0x240a9d = _0x935022[Math.floor(Math.random() * _0x935022.length)];
      if (!_0x1fcf44) {
        return _0x1487ec.reply("Example:  " + prefix + "gamble 100 direction(left,right,up,down)");
      }
      if (!_0x39ccfd) {
        return _0x1487ec.reply("*Please, specify the amount you are gambling with!*");
      }
      if (!_0x635fc3) {
        return _0x1487ec.reply("*Specify the direction you are betting on!*");
      }
      if (!_0x41bcc8) {
        return _0x1487ec.reply("*Check your text please, You are using the command in a wrong way*");
      }
      if (_0x1f4361 == false) {
        return _0x1487ec.reply("*You don't have sufficient 🪙 Diamond to gamble with*");
      }
      if (_0x5909de == true) {
        return _0x1487ec.reply("*Sorry " + _0x1487ec.pushName + ", you can only gamble with more than 🪙50.*");
      }
      if (_0x240a9d == _0x635fc3) {
        return await _0x1487ec.reply("*📈 You won 🪙" + _0x542f8b + '*');
      } else {
        return await _0x1487ec.reply("*📉 You lost 🪙" + _0xdd1af4[0] + '*');
      }
    } catch (_0x5caed4) {
      _0x1487ec.error(_0x5caed4 + "\n\ncommand: gamble", _0x5caed4);
    }
  });
  smd({
    'pattern': "slot2",
    'desc': "withdraw money from bank account.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async (_0x251278, _0x2a6213) => {
    try {
      let _0x4e477a = (await groupdb.findOne({
        'id': _0x251278.chat
      })) || {};
      let _0x2564ba = _0x4e477a.economy || "false";
      if (_0x2564ba == "false") {
        return _0x251278.reply("*🚦Economy* is not active in current group.");
      }
      var _0x363e2d = new Date();
      if (_0x363e2d.getDay() == 6 || _0x363e2d.getDay() == 5 || _0x363e2d.getDay() == 0) {
        if (_0x2a6213 == "help") {
          return _0x251278.reply("*1:* Use " + prefix + "slot to play\n\n*2:* You must have 🪙100 in your wallet\n\n*3:* If you don't have money in wallet then 👛withdraw from your bank🏦\n\n*4:* If you don't have 🤑 money in your 🏦bank too then use economy features to 📈gain money");
        }
        if (_0x2a6213 == "money") {
          return _0x251278.reply("*1:* Small Win --> +🪙20\n\n*2:* Small Lose --> -🪙20\n\n*3:* Big Win --> +🪙100\n\n*4:* Big Lose --> -🪙50\n\n*5:* 🎉 JackPot --> +🪙1000");
        }
        const _0x4e56e0 = ['🥥', '🍎', '🍇'];
        const _0xba44a2 = ['🍎', '🍇', '🥥'];
        const _0x37f22e = ['🍇', '🥥', '🍎'];
        const _0x162622 = ["*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_", "*Totally out of line*\n\n_--> 🥥-🍎-🍍_", "*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_"];
        const _0x147ae6 = ["*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_", "*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_", "*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_"];
        const _0x4550ed = ["*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_", "*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_", "*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_"];
        const _0x112ad9 = ["*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_", "*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_"];
        const _0x4b796b = ["*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_", "*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_", "*🎊 You Just hit a jackpot worth 🪙1000*"];
        const _0xb299ca = _0x251278.sender;
        const _0x521ccc = await eco.balance(_0xb299ca, "Asta");
        if (100 > _0x521ccc.wallet) {
          return _0x251278.reply("You are going to be spinning on your wallet, you need at least 🪙100");
        }
        const _0x3b630a = _0x4e56e0[Math.floor(Math.random() * _0x4e56e0.length)];
        const _0x1eb5d5 = _0xba44a2[Math.floor(Math.random() * _0xba44a2.length)];
        const _0x26410a = _0x37f22e[Math.floor(Math.random() * _0x37f22e.length)];
        const _0x208f0c = _0x162622[Math.floor(Math.random() * _0x162622.length)];
        const _0x3260ad = _0x4550ed[Math.floor(Math.random() * _0x4550ed.length)];
        const _0x407f99 = _0x112ad9[Math.floor(Math.random() * _0x112ad9.length)];
        const _0xcb84a = _0x4b796b[Math.floor(Math.random() * _0x4b796b.length)];
        const _0x35bae7 = _0x147ae6[Math.floor(Math.random() * _0x147ae6.length)];
        if (_0x2a6213.split(" ")[0]) {
          let _0x47c290 = _0x2a6213.split(" ")[0];
          const _0xf3242 = await eco.balance(_0x251278.sender, "Asta");
          console.log(_0xf3242.wallet);
          if (_0x47c290 <= _0xf3242.wallet) {
            const _0x10e319 = Math.floor(Math.random() * _0x47c290);
            if (_0x3b630a !== _0x1eb5d5 && _0x1eb5d5 !== _0x26410a) {
              return _0x251278.reply(_0x208f0c + "\n\n*Big Lose -->* _🪙" + _0x10e319 + '_');
            } else {
              if (_0x3b630a == _0x1eb5d5 && _0x1eb5d5 == _0x26410a) {
                return _0x251278.reply(_0x3260ad + "\n*_Little Jackpot -->* _🪙" + _0x10e319 / 2 + '_');
              } else {
                if (_0x3b630a == _0x1eb5d5 && _0x1eb5d5 !== _0x26410a) {
                  return _0x251278.reply(_0x407f99 + "\n*Small Win -->* _🪙" + _0x10e319 + '_');
                } else {
                  if (_0x3b630a !== _0x1eb5d5 && _0x3b630a == _0x26410a) {
                    return _0x251278.reply(_0x35bae7 + "\n\n*Small Lose -->* _🪙" + _0x10e319 + '_');
                  } else {
                    if (_0x3b630a !== _0x1eb5d5 && _0x1eb5d5 == _0x26410a) {
                      return _0x251278.reply(_0x407f99 + "\n\n*Small Win -->* _🪙" + _0x10e319 + '_');
                    } else {
                      if (_0x3b630a == _0x1eb5d5 && _0x1eb5d5 == _0x26410a && _0x26410a == f4) {
                        return _0x251278.reply(_0xcb84a + "\n\n_🎊 JackPot --> _🪙" + _0x10e319 * 20 + '_');
                      } else {
                        return _0x251278.reply("Do you understand what you are doing?");
                      }
                    }
                  }
                }
              }
            }
          } else {
            return _0x251278.reply("You don't have enough 💰amount in your👛 wallet.\n- Please don't provide 🤑amount.");
          }
        }
        if (_0x3b630a !== _0x1eb5d5 && _0x1eb5d5 !== _0x26410a) {
          _0x251278.reply(_0x208f0c + "\n\n*Big Lose -->* _🪙50_");
        } else {
          if (_0x3b630a == _0x1eb5d5 && _0x1eb5d5 == _0x26410a) {
            _0x251278.reply(_0x3260ad + "\n*_Little Jackpot -->* _🪙100_");
          } else {
            if (_0x3b630a == _0x1eb5d5 && _0x1eb5d5 !== _0x26410a) {
              _0x251278.reply(_0x407f99 + "\n*Small Win -->* _🪙20_");
            } else {
              if (_0x3b630a !== _0x1eb5d5 && _0x3b630a == _0x26410a) {
                _0x251278.reply(_0x35bae7 + "\n\n*Small Lose -->* _🪙20_");
              } else {
                if (_0x3b630a !== _0x1eb5d5 && _0x1eb5d5 == _0x26410a) {
                  _0x251278.reply(_0x407f99 + "\n\n*Small Win -->* _🪙20_");
                } else {
                  if (_0x3b630a == _0x1eb5d5 && _0x1eb5d5 == _0x26410a && _0x26410a == f4) {
                    _0x251278.reply(_0xcb84a + "\n\n_🎊 JackPot --> _🪙1000_");
                  } else {
                    _0x251278.reply("Do you understand what you are doing?");
                  }
                }
              }
            }
          }
        }
      } else {
        _0x251278.reply("*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*");
      }
    } catch (_0x307e04) {
      _0x251278.error(_0x307e04 + "\n\ncommand: slot2", _0x307e04);
    }
  });
  smd({
    'pattern': "slot",
    'desc': "slot game.",
    'category': "economy",
    'filename': __filename,
    'react': '💷'
  }, async _0x5c2abe => {
    try {
      let _0x288c42 = (await groupdb.findOne({
        'id': _0x5c2abe.chat
      })) || {};
      let _0x3558af = _0x288c42.economy || "false";
      if (_0x3558af == "false") {
        return _0x5c2abe.reply("*🚦Economy* is not active in current group.");
      }
      const _0xfe278a = await eco.balance(_0x5c2abe.sender, "Asta");
      if (100 > _0xfe278a.wallet) {
        return _0x5c2abe.reply("You are going to be spinning on your wallet, you need at least 🪙100");
      }
      var _0x3e5ce3 = new Array();
      _0x3e5ce3[0] = "1 : 2 : 3";
      _0x3e5ce3[1] = "1 : 2 : 3";
      _0x3e5ce3[2] = "1 : 2 : 3";
      _0x3e5ce3[3] = "4 : 3 : 3";
      _0x3e5ce3[4] = "1 : 1 : 1";
      _0x3e5ce3[5] = "5 : 2 : 5";
      _0x3e5ce3[6] = "3 : 5 : 3";
      _0x3e5ce3[7] = "1 : 3 : 6";
      _0x3e5ce3[8] = "6 : 2 : 7";
      _0x3e5ce3[9] = "1 : 6 : 3";
      _0x3e5ce3[10] = "6 : 3 : 2";
      _0x3e5ce3[11] = "5 : 5 : 6";
      _0x3e5ce3[12] = "1 : 5 : 3";
      _0x3e5ce3[13] = "4 : 1 : 7";
      _0x3e5ce3[14] = "4 : 3 : 2";
      _0x3e5ce3[15] = "4 : 3 : 2";
      _0x3e5ce3[16] = "7 : 4 : 6";
      _0x3e5ce3[17] = "6 : 5 : 1";
      _0x3e5ce3[18] = "5 : 7 : 2";
      var _0x4ce8c4 = Math.floor(19 * Math.random());
      var _0x27af2d = Math.floor(19 * Math.random());
      var _0x454689 = Math.floor(19 * Math.random());
      var _0x1f394a = _0x3e5ce3[_0x4ce8c4];
      var _0x3be393 = _0x3e5ce3[_0x27af2d];
      var _0x196106 = _0x3e5ce3[_0x454689];
      console.log(_0x1f394a + "\n" + _0x3be393 + "\n" + _0x196106);
      let _0x18b307 = _0x1f394a.split(':');
      let _0x278708 = _0x3be393.split(':');
      let _0x3c20c1 = _0x196106.split(':');
      var _0x39663a;
      if (_0x18b307[2] === _0x278708[1] && _0x278708[1] === _0x3c20c1[0]) {
        _0x39663a = true;
      }
      if (_0x18b307[0] === _0x278708[1] && _0x278708[1] === _0x3c20c1[2]) {
        _0x39663a = true;
      }
      if (_0x18b307[0] === _0x278708[0] && _0x278708[0] === _0x3c20c1[0]) {
        _0x39663a = true;
      }
      if (_0x18b307[1] === _0x278708[1] && _0x278708[1] === _0x3c20c1[1]) {
        _0x39663a = true;
      }
      if (_0x18b307[2] === _0x278708[2] && _0x278708[2] === _0x3c20c1[2]) {
        _0x39663a = true;
      }
      if (_0x18b307[0] === _0x278708[1] && _0x278708[1] === _0x3c20c1[2]) {
        _0x39663a = true;
      }
      if (_0x18b307[2] === _0x278708[1] && _0x278708[1] === _0x3c20c1[0]) {
        _0x39663a = true;
      }
      if (_0x18b307[0] === _0x18b307[1] && _0x18b307[0] === _0x18b307[2]) {
        _0x39663a = true;
      }
      if (_0x278708[0] === _0x278708[1] && _0x278708[0] === _0x278708[2]) {
        _0x39663a = true;
      }
      if (_0x3c20c1[0] === _0x3c20c1[1] && _0x3c20c1[0] === _0x3c20c1[2]) {
        _0x39663a = true;
      }
      if (_0x18b307[0] === _0x3c20c1[1] && _0x18b307[0] === _0x3c20c1[2]) {
        _0x39663a = true;
      }
      if (_0x39663a) {
        const _0x27bec4 = Math.floor(Math.random() * 5000);
        return await _0x5c2abe.reply("You got " + _0x27bec4 * 10 + " in your wallet.");
      } else {
        const _0x21eb86 = Math.floor(Math.random() * 300);
        let _0x523fa8 = "\n🎰 Slot Machine Result\n     " + _0x1f394a + "\n\n      " + _0x3be393 + "\n\n      " + _0x196106 + "\n\nNot Jacpot📉 but lost ";
        let _0x459884 = _0x523fa8.replace(/1/g, '🔴').replace(/2/g, '🔵').replace(/3/g, '🟣').replace(/4/g, '🟢').replace(/5/g, '🟡').replace(/6/g, '⚪️').replace(/7/g, '⚫️').replace(/:/g, "    ");
        return await _0x5c2abe.reply(_0x459884 + (" " + _0x21eb86 + '.'));
      }
    } catch (_0x4ec27f) {
      _0x5c2abe.error(_0x4ec27f + "\n\ncommand: slot", _0x4ec27f);
    }
  });
}
