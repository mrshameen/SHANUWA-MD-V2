const {
  updateProfilePicture,
  parsedJid
} = require("../lib");
const {
  sck,
  smd,
  send,
  Config,
  tlang,
  sleep,
  getAdmin,
  prefix
} = require("../lib");
const astro_patch = require("../lib/plugins");
const {
  cmd
} = astro_patch;
smd({
  'cmdname': "join",
  'info': "joins group by link",
  'type': "whatsapp",
  'fromMe': true,
  'filename': __filename,
  'use': "<group link.>"
}, async (_0xde3481, _0x45ffe8) => {
  try {
    if (_0xde3481.reply_message && _0xde3481.reply_message.groupInvite) {
      var _0x2983f7 = await _0xde3481.bot.groupAcceptInviteV4(_0xde3481.chat, _0xde3481.reply_message.msg);
      if (_0x2983f7 && _0x2983f7.includes("joined to:")) {
        return await send(_0xde3481, "*_Joined_*", {}, '', _0xde3481);
      }
    }
    let _0x33957f = _0x45ffe8 ? _0x45ffe8 : _0xde3481.reply_text;
    const _0x11c89e = _0x33957f.match(/https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g);
    if (!_0x11c89e) {
      return await _0xde3481.reply("*`_Uhh Please, provide group link_`*");
    }
    let _0x23719c = _0x11c89e[0].split("https://chat.whatsapp.com/")[1].trim();
    await _0xde3481.bot.groupAcceptInvite(_0x23719c).then(_0x159b64 => send(_0xde3481, "*_Joined_*", {}, '', _0xde3481))["catch"](_0x56201d => _0xde3481.send("*_Can't Join, Group Id not found!!_*"));
  } catch (_0x568254) {
    await _0xde3481.error(_0x568254 + "\n\ncommand: join", _0x568254, "`*_Can't Join, Group Id not found, Sorry!!_*`");
  }
});
smd({
  'cmdname': "newgc",
  'info': "Create New Group",
  'type': "whatsapp",
  'filename': __filename,
  'use': "<group link.>"
}, async (_0x1037ea, _0x26dea1, {
  smd: _0x3bc1ab,
  cmdName: _0x4099a7
}) => {
  try {
    if (!_0x1037ea.isCreator) {
      return _0x1037ea.reply(tlang().owner);
    }
    if (!_0x26dea1) {
      return await _0x1037ea.reply("*_provide Name to Create new Group!!!_*\n*_Ex: " + (prefix + _0x3bc1ab) + " My Name Group @user1,2,3.._*");
    }
    let _0x2a4f32 = _0x26dea1;
    if (_0x2a4f32.toLowerCase() === "info") {
      return await _0x1037ea.send(("\n  *Its a command to create new Gc*\n  \t```Ex: " + (prefix + cmd) + " My new Group```\n  \n*You also add peoples in newGc*\n  \t```just reply or mention Users```\n  ").trim());
    }
    let _0x33cb8a = [_0x1037ea.sender];
    if (_0x1037ea.quoted) {
      _0x33cb8a.push(_0x1037ea.quoted.sender);
    }
    if (_0x1037ea.mentionedJid && _0x1037ea.mentionedJid[0]) {
      _0x33cb8a.push(..._0x1037ea.mentionedJid);
      try {
        mentionJids.forEach(_0x3b4e3f => {
          var _0x4d2fae = _0x3b4e3f.split('@')[0].trim();
          _0x2a4f32 = _0x2a4f32.replace(new RegExp('@' + _0x4d2fae, 'g'), '');
        });
      } catch {}
    }
    const _0x428d32 = _0x2a4f32.substring(0, 60);
    const _0x103c93 = await Suhail.bot.groupCreate(_0x428d32, [..._0x33cb8a]);
    if (_0x103c93) {
      let _0x3e6ee0 = await _0x1037ea.bot.sendMessage(_0x103c93.id, {
        'text': "*_Hey Master, Welcome to new Group_*\n" + Config.caption
      });
      try {
        var _0x121c2e = await Suhail.bot.groupInviteCode(_0x103c93.id);
      } catch {
        var _0x121c2e = false;
      }
      var _0x51557c = "https://chat.whatsapp.com/" + _0x121c2e;
      var _0x5e3448 = {
        'externalAdReply': {
          'title': "MASTER-MD",
          'body': '' + _0x428d32,
          'renderLargerThumbnail': true,
          'thumbnail': log0,
          'mediaType': 0x1,
          'mediaUrl': _0x51557c,
          'sourceUrl': _0x51557c
        }
      };
      return await send(_0x1037ea, ("*_Hurray, New group created!!!_*\n" + (_0x121c2e ? '*_' + _0x51557c + '_*' : '')).trim(), {
        'contextInfo': _0x5e3448
      }, '', _0x3e6ee0);
    } else {
      await _0x1037ea.send("*_Can't create new group, Sorry!!_*");
    }
  } catch (_0x36bc01) {
    await _0x1037ea.error(_0x36bc01 + "\n\ncommand: " + _0x4099a7, _0x36bc01, "*_Can't create new group, Sorry!!_*");
  }
});
smd({
  'pattern': "ginfo",
  'desc': "get group info by link",
  'type': "group",
  'filename': __filename,
  'use': "<group link.>"
}, async (_0x5109fe, _0x548ad9) => {
  try {
    let _0x28ae37 = _0x548ad9 ? _0x548ad9 : _0x5109fe.reply_text;
    const _0xb91b19 = _0x28ae37.match(/https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g) || false;
    if (!_0xb91b19) {
      return await _0x5109fe.reply("*_Uhh Please, provide group link_*");
    }
    let _0xcf9c58 = _0xb91b19[0].split("https://chat.whatsapp.com/")[1].trim();
    const _0x2ab959 = await _0x5109fe.bot.groupGetInviteInfo(_0xcf9c58);
    if (_0x2ab959) {
      const _0xc40452 = new Date(_0x2ab959.creation * 1000);
      var _0x10a463 = _0xc40452.getFullYear();
      var _0x586e85 = _0xc40452.getMonth() + 1;
      var _0x1135f4 = _0xc40452.getDate();
      var _0x2bcfd5 = _0x10a463 + '-' + _0x586e85.toString().padStart(2, '0') + '-' + _0x1135f4.toString().padStart(2, '0');
      var _0xa1ee18 = {
        'externalAdReply': {
          'title': "MASTER-MD",
          'body': _0x2ab959.subject,
          'renderLargerThumbnail': true,
          'thumbnail': log0,
          'mediaType': 0x1,
          'mediaUrl': _0xb91b19[0],
          'sourceUrl': _0xb91b19[0]
        }
      };
      return await send(_0x5109fe, (_0x2ab959.subject + "\n  \n  Creator: wa.me/" + _0x2ab959.owner.split('@')[0] + " \n  GJid; ```" + _0x2ab959.id + "  ```\n  *Muted:* " + (_0x2ab959.announce ? " yes" : " no") + "\n  *Locked:* " + (_0x2ab959.restrict ? " yes" : " no") + "\n  *createdAt:* " + _0x2bcfd5 + "\n  *participents:* " + (_0x2ab959.size > 3 ? _0x2ab959.size + 'th' : _0x2ab959.size) + "\n  " + (_0x2ab959.desc ? "*description:* " + _0x2ab959.desc + "\n" : '') + "\n  " + Config.caption + "\n  ").trim(), {
        'mentions': [_0x2ab959.owner],
        'contextInfo': _0xa1ee18
      }, '', _0x5109fe);
    } else {
      await _0x5109fe.send("*_Group Id not found, Sorry!!_*");
    }
  } catch (_0x3fa968) {
    await _0x5109fe.error(_0x3fa968 + "\n\ncommand: ginfo", _0x3fa968, "*_Group Id not found, Sorry!!_*");
  }
});
smd({
  'cmdname': "rejectall",
  'alias': ["rejectjoin"],
  'info': "reject all request to join!",
  'type': "group",
  'filename': __filename
}, async (_0x20ea11, _0xa48139) => {
  try {
    if (!_0x20ea11.isGroup) {
      return _0x20ea11.reply(tlang().group);
    }
    if (!_0x20ea11.isBotAdmin || !_0x20ea11.isAdmin) {
      return await _0x20ea11.reply(!_0x20ea11.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x20ea11.isCreator ? ", Idiot" : '') + '_*' : tlang().admin);
    }
    const _0x10b68c = await _0x20ea11.bot.groupRequestParticipantsList(_0x20ea11.chat);
    if (!_0x10b68c || !_0x10b68c[0]) {
      return await _0x20ea11.reply("*_No Request Join Yet_*");
    }
    let _0x2acb1f = [];
    let _0x4b0135 = "*List of rejected users*\n\n";
    for (let _0x15a732 = 0; _0x15a732 < _0x10b68c.length; _0x15a732++) {
      try {
        await _0x20ea11.bot.groupRequestParticipantsUpdate(_0x20ea11.from, [_0x10b68c[_0x15a732].jid], "reject");
        _0x4b0135 += '@' + _0x10b68c[_0x15a732].jid.split('@')[0] + "\n";
        _0x2acb1f = [..._0x2acb1f, _0x10b68c[_0x15a732].jid];
      } catch {}
    }
    await _0x20ea11.send(_0x4b0135, {
      'mentions': [_0x2acb1f]
    });
  } catch (_0x32ec09) {
    await _0x20ea11.error(_0x32ec09 + "\n\ncommand: rejectall", _0x32ec09);
  }
});
smd({
  'cmdname': "acceptall",
  'alias': ["acceptjoin"],
  'info': "accept all request to join!",
  'type': "group",
  'filename': __filename
}, async (_0x3baba, _0x3dfc3d) => {
  try {
    if (!_0x3baba.isGroup) {
      return _0x3baba.reply(tlang().group);
    }
    if (!_0x3baba.isBotAdmin || !_0x3baba.isAdmin) {
      return await _0x3baba.reply(!_0x3baba.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x3baba.isCreator ? ", Idiot" : '') + '_*' : tlang().admin);
    }
    const _0x1b816f = await _0x3baba.bot.groupRequestParticipantsList(_0x3baba.chat);
    if (!_0x1b816f || !_0x1b816f[0]) {
      return await _0x3baba.reply("*_No Join Request Yet_*");
    }
    let _0x3306b1 = [];
    let _0x1b7a9b = "*List of accepted users*\n\n";
    for (let _0x4d86ee = 0; _0x4d86ee < _0x1b816f.length; _0x4d86ee++) {
      try {
        await _0x3baba.bot.groupRequestParticipantsUpdate(_0x3baba.from, [_0x1b816f[_0x4d86ee].jid], "approve");
        _0x1b7a9b += '@' + _0x1b816f[_0x4d86ee].jid.split('@')[0] + "\n";
        _0x3306b1 = [..._0x3306b1, _0x1b816f[_0x4d86ee].jid];
      } catch {}
    }
    await _0x3baba.send(_0x1b7a9b, {
      'mentions': [_0x3306b1]
    });
  } catch (_0x3b9a18) {
    await _0x3baba.error(_0x3b9a18 + "\n\ncommand: acceptall", _0x3b9a18);
  }
});
smd({
  'cmdname': "listrequest",
  'alias': ["requestjoin"],
  'info': "Set Description of Group",
  'type': "group",
  'filename': __filename,
  'use': "<enter Description Text>"
}, async (_0x4b3a23, _0x59e422) => {
  try {
    if (!_0x4b3a23.isGroup) {
      return _0x4b3a23.reply(tlang().group);
    }
    if (!_0x4b3a23.isBotAdmin || !_0x4b3a23.isAdmin) {
      return await _0x4b3a23.reply(!_0x4b3a23.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x4b3a23.isCreator ? ", Idiot" : '') + '_*' : tlang().admin);
    }
    const _0x57a141 = await _0x4b3a23.bot.groupRequestParticipantsList(_0x4b3a23.chat);
    if (!_0x57a141 || !_0x57a141[0]) {
      return await _0x4b3a23.reply("*_No Request Join Yet_*");
    }
    let _0x4d4984 = [];
    let _0x52550c = "*List of User Request to join*\n\n";
    for (let _0x102560 = 0; _0x102560 < _0x57a141.length; _0x102560++) {
      _0x52550c += '@' + _0x57a141[_0x102560].jid.split('@')[0] + "\n";
      _0x4d4984 = [..._0x4d4984, _0x57a141[_0x102560].jid];
    }
    return await _0x4b3a23.send(_0x52550c, {
      'mentions': [_0x4d4984]
    });
  } catch (_0x1cf548) {
    await _0x4b3a23.error(_0x1cf548 + "\n\ncommand: listrequest", _0x1cf548);
  }
});
smd({
  'cmdname': "setdesc",
  'alias': ["setgdesc", "gdesc"],
  'info': "Set Description of Group",
  'type': "group",
  'filename': __filename,
  'use': "<enter Description Text>"
}, async (_0x4fa0d8, _0x1294d5) => {
  try {
    if (!_0x4fa0d8.isGroup) {
      return _0x4fa0d8.reply(tlang().group);
    }
    if (!_0x1294d5) {
      return await _0x4fa0d8.reply("*Provide Description text, You wants to Set*");
    }
    if (!_0x4fa0d8.isBotAdmin || !_0x4fa0d8.isAdmin) {
      return await _0x4fa0d8.reply(!_0x4fa0d8.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x4fa0d8.isCreator ? ", Idiot" : '') + '_*' : tlang().admin);
    }
    try {
      await _0x4fa0d8.bot.groupUpdateDescription(_0x4fa0d8.chat, _0x1294d5 + "\n\n\t" + Config.caption);
      _0x4fa0d8.reply("*_✅Group description Updated Successfuly!_*");
    } catch (_0x5655d4) {
      await _0x4fa0d8.reply("*_Can't update description, Group Id not found!!_*");
    }
  } catch (_0x1518aa) {
    await _0x4fa0d8.error(_0x1518aa + "\n\ncommand: setdesc", _0x1518aa);
  }
});
smd({
  'cmdname': "setname",
  'alias': ["setgname", "gname"],
  'info': "Set Description of Group",
  'type': "group",
  'filename': __filename,
  'use': "<enter Description Text>"
}, async (_0x588d60, _0x2ebf9c) => {
  try {
    if (!_0x588d60.isGroup) {
      return _0x588d60.reply(tlang().group);
    }
    if (!_0x2ebf9c) {
      return await _0x588d60.reply("*Uhh Dear, Give text to Update This Group Name*");
    }
    if (!_0x588d60.isBotAdmin || !_0x588d60.isAdmin) {
      return await _0x588d60.reply(!_0x588d60.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x588d60.isCreator ? ", Idiot" : '') + '_*' : tlang().admin);
    }
    try {
      await _0x588d60.bot.groupUpdateSubject(_0x588d60.chat, _0x2ebf9c);
      _0x588d60.reply("*_✅Group Name Updated Successfuly.!_*");
    } catch (_0x51aa1b) {
      await _0x588d60.reply("*`_Can't update name, Group Id not found!!_`*");
    }
  } catch (_0x1b68ac) {
    await _0x588d60.error(_0x1b68ac + "\n\ncommand: setdesc", _0x1b68ac);
  }
});
smd({
  'cmdname': "left",
  'info': "left from a group.",
  'fromMe': true,
  'type': "group",
  'filename': __filename
}, async (_0x27e697, _0x30129a) => {
  try {
    if (!_0x27e697.isGroup) {
      return await _0x27e697.send(tlang().group, {}, '', _0x27e697);
    }
    let _0x552a7b = _0x30129a.toLowerCase().trim();
    if (_0x552a7b.startsWith("sure") || _0x552a7b.startsWith('ok') || _0x552a7b.startsWith("yes")) {
      await _0x27e697.bot.groupParticipantsUpdate(_0x27e697.chat, [_0x27e697.user], "remove");
      _0x27e697.send("*Group Left!!*", {}, '', _0x27e697, _0x27e697.user);
    } else {
      return await _0x27e697.send("*_Use: " + prefix + "left sure/yes/ok, For security threats_*", {}, '', _0x27e697);
    }
  } catch (_0x248d18) {
    await _0x27e697.error(_0x248d18 + "\n\ncommand: left", _0x248d18, false);
  }
});
let mtypes = ["imageMessage"];
smd({
  'pattern': "gpp",
  'desc': "Set Group profile picture",
  'category': "group",
  'use': "<reply to image>",
  'filename': __filename
}, async _0x2819cf => {
  try {
    if (!_0x2819cf.isGroup) {
      return await _0x2819cf.send(tlang().group, {}, '', _0x2819cf);
    }
    if (!_0x2819cf.isBotAdmin || !_0x2819cf.isAdmin) {
      return await _0x2819cf.reply(!_0x2819cf.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x2819cf.isCreator ? ", Idiot" : '') + '_*' : tlang().admin);
    }
    let _0xaf0b8e = mtypes.includes(_0x2819cf.mtype) ? _0x2819cf : _0x2819cf.reply_message;
    if (!_0xaf0b8e || !mtypes.includes(_0xaf0b8e?.["mtype"] || "need_Media")) {
      return await _0x2819cf.reply("*Reply to an image, dear*");
    }
    return await updateProfilePicture(_0x2819cf, _0x2819cf.chat, _0xaf0b8e, "gpp");
  } catch (_0x51e714) {
    await _0x2819cf.error(_0x51e714 + "\n\ncommand : gpp", _0x51e714);
  }
});
smd({
  'pattern': "fullgpp",
  'desc': "Set full screen group profile picture",
  'category': "group",
  'use': "<reply to image>",
  'filename': __filename
}, async _0x3cc2c2 => {
  try {
    if (!_0x3cc2c2.isGroup) {
      return await _0x3cc2c2.send(tlang().group, {}, '', _0x3cc2c2);
    }
    if (!_0x3cc2c2.isBotAdmin || !_0x3cc2c2.isAdmin) {
      return await _0x3cc2c2.reply(!_0x3cc2c2.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x3cc2c2.isCreator ? ", Idiot" : '') + '_*' : tlang().admin);
    }
    let _0x2a6b69 = mtypes.includes(_0x3cc2c2.mtype) ? _0x3cc2c2 : _0x3cc2c2.reply_message;
    if (!_0x2a6b69 || !mtypes.includes(_0x2a6b69?.["mtype"] || "need_Media")) {
      return await _0x3cc2c2.reply("*`Reply to an image, dear`*");
    }
    return await updateProfilePicture(_0x3cc2c2, _0x3cc2c2.chat, _0x2a6b69, "fullgpp");
  } catch (_0x2d44a7) {
    await _0x3cc2c2.error(_0x2d44a7 + "\n\ncommand : fullgpp", _0x2d44a7);
  }
  {}
});
cmd({
  'pattern': "common",
  'desc': "Get common participants in two groups, and kick using .common kick, jid",
  'category': "owner",
  'fromMe': true,
  'filename': __filename
}, async (_0x310be4, _0x481db4) => {
  try {
    let _0xb57337 = await parsedJid(_0x481db4);
    var _0x16fc1f;
    var _0x3a54af;
    if (_0xb57337.length > 1) {
      _0x16fc1f = _0xb57337[0].includes("@g.us") ? _0xb57337[0] : _0x310be4.chat;
      _0x3a54af = _0xb57337[1].includes("@g.us") ? _0xb57337[1] : _0x310be4.chat;
    } else {
      if (_0xb57337.length == 1) {
        _0x16fc1f = _0x310be4.chat;
        _0x3a54af = _0xb57337[0].includes("@g.us") ? _0xb57337[0] : _0x310be4.chat;
      } else {
        return await _0x310be4.send("*Uhh Dear, Please Provide a Group Jid*");
      }
    }
    if (_0x3a54af === _0x16fc1f) {
      return await _0x310be4.send("*Please Provide Valid Group Jid*");
    }
    var _0x32f240 = await _0x310be4.bot.groupMetadata(_0x16fc1f);
    var _0x4e843e = await _0x310be4.bot.groupMetadata(_0x3a54af);
    var _0x19bb72 = _0x32f240.participants.filter(({
      id: _0x4648db
    }) => _0x4e843e.participants.some(({
      id: _0x2c389f
    }) => _0x2c389f === _0x4648db)) || [];
    if (_0x19bb72.length == 0) {
      return await _0x310be4.send("Theres no Common Users in Both Groups");
    }
    let _0x1f2cbc = !!(_0x481db4.split(" ")[0].trim() === "kick");
    let _0x4960ed = false;
    var _0x1aaec3 = "   *List Of Common Participants*";
    if (_0x1f2cbc) {
      let _0x56b4c8 = {
        'chat': _0x16fc1f
      };
      _0x1aaec3 = "  *Kicking Common Participants*";
      const _0x4717ad = (await getAdmin(_0x310be4.bot, _0x56b4c8)) || [];
      var _0x120435 = _0x4717ad.includes(_0x310be4.user) || false;
      var _0xbf7177 = _0x4717ad.includes(_0x310be4.sender) || false;
      if (!_0x120435 || !_0xbf7177) {
        _0x1f2cbc = false;
        _0x1aaec3 = "  *乂 Can't Kick Common Participants*";
      }
      if (!_0x120435) {
        _0x4960ed = "*❲❒❳ Reason:* _I Can't Kick Common Participants Without Getting Admin Role,So Provide Admin Role First,_\n";
      }
      if (!_0xbf7177) {
        _0x4960ed = "*❲❒❳ Reason:* _Uhh Dear, Only Group Admin Can Kick Common Users Through This Cmd_\n";
      }
    }
    var _0x493aef = " " + _0x1aaec3 + "   \n" + (_0x4960ed ? _0x4960ed : '') + "\n*❲❒❳ Group1:* " + _0x32f240.subject + "\n*❲❒❳ Group2:* " + _0x4e843e.subject + "\n*❲❒❳ Common Counts:* _" + _0x19bb72.length + "_Members_\n\n\n";
    var _0x65016b = [];
    _0x19bb72.map(async _0x39c77b => {
      _0x493aef += "  *⬡* @" + _0x39c77b.id.split('@')[0] + "\n";
      _0x65016b.push(_0x39c77b.id.split('@')[0] + "@s.whatsapp.net");
    });
    await _0x310be4.send(_0x493aef + ("\n\n\n©" + Config.caption), {
      'mentions': _0x65016b
    });
    if (_0x1f2cbc && !_0x4960ed) {
      try {
        for (const _0x4ab33c of _0x65016b) {
          if (_0x310be4.user === _0x4ab33c || _0x4ab33c === "2349027862116@s.whatsapp.net" || _0x4ab33c === "2348039607375@s.whatsapp.net") {
            continue;
          }
          await new Promise(_0x256950 => setTimeout(_0x256950, 1000));
          await _0x310be4.bot.groupParticipantsUpdate(_0x16fc1f, [_0x4ab33c], "remove");
        }
      } catch (_0x5b1c2b) {
        console.error("Error removing participants:", _0x5b1c2b);
      }
    }
  } catch (_0x265409) {
    await _0x310be4.error(_0x265409 + "\n\ncommand: common", _0x265409, "*Can't fetch data due to error, Sorry!!*");
  }
});
cmd({
  'pattern': "diff",
  'desc': "Get difference of participants in two groups",
  'category': "owner",
  'filename': __filename
}, async (_0x55ae90, _0x3b4b81) => {
  try {
    let _0xb8d3be = await parsedJid(_0x3b4b81);
    var _0x5ec3d4;
    var _0x2a4e9d;
    if (_0xb8d3be.length > 1) {
      _0x5ec3d4 = _0xb8d3be[0].includes("@g.us") ? _0xb8d3be[0] : _0x55ae90.chat;
      _0x2a4e9d = _0xb8d3be[1].includes("@g.us") ? _0xb8d3be[1] : _0x55ae90.chat;
    } else {
      if (_0xb8d3be.length == 1) {
        _0x5ec3d4 = _0x55ae90.chat;
        _0x2a4e9d = _0xb8d3be[0].includes("@g.us") ? _0xb8d3be[0] : _0x55ae90.chat;
      } else {
        return await _0x55ae90.send("Uhh Dear, Please Provide a Group Jid");
      }
    }
    if (_0x2a4e9d === _0x5ec3d4) {
      return await _0x55ae90.send("Please Provide Valid Group Jid");
    }
    var _0x466fa7 = await _0x55ae90.bot.groupMetadata(_0x5ec3d4);
    var _0xcb367a = await _0x55ae90.bot.groupMetadata(_0x2a4e9d);
    var _0x32ce8d = _0x466fa7.participants.filter(({
      id: _0x45deb2
    }) => !_0xcb367a.participants.some(({
      id: _0x105240
    }) => _0x105240 === _0x45deb2)) || [];
    if (_0x32ce8d.length == 0) {
      return await _0x55ae90.send("Theres no Different Users in Both Groups");
    }
    var _0x7500d3 = "  *乂 List Of Different Participants* \n\n*❲❒❳ Group1:* " + _0x466fa7.subject + "\n*❲❒❳ Group2:* " + _0xcb367a.subject + "\n*❲❒❳ Differ Counts:* _" + _0x32ce8d.length + "_Members_\n\n\n";
    var _0x53cfca = [];
    _0x32ce8d.map(async _0x282bec => {
      _0x7500d3 += "  *⬡* @" + _0x282bec.id.split('@')[0] + "\n";
      _0x53cfca.push(_0x282bec.id.split('@')[0] + "@s.whatsapp.net");
    });
    return await _0x55ae90.send(_0x7500d3 + ("\n\n\n©" + Config.caption), {
      'mentions': _0x53cfca
    });
  } catch (_0x422579) {
    await _0x55ae90.error(_0x422579 + "\n\ncommand: unblock", _0x422579, "*Can't fetch data due to error, Sorry!!*");
  }
});
cmd({
  'pattern': "invite",
  'desc': "get group link.",
  'category': "group",
  'filename': __filename
}, async _0x66ac0f => {
  try {
    if (!_0x66ac0f.isGroup) {
      return _0x66ac0f.reply(tlang().group);
    }
    if (!_0x66ac0f.isBotAdmin) {
      return _0x66ac0f.reply("*`_I'm Not Admin, So I can't Send Invite Link_`*");
    }
    var _0x8f2c33 = await _0x66ac0f.bot.groupInviteCode(_0x66ac0f.chat);
    var _0x2b42ba = "https://chat.whatsapp.com/" + _0x8f2c33;
    return _0x66ac0f.reply("*Group Invite Link Is Here* \n*" + _0x2b42ba + '*');
  } catch (_0x39938d) {
    await _0x66ac0f.error(_0x39938d + "\n\ncommand: invite", _0x39938d, "*_Can't fetch data due to error, Sorry!!_*");
  }
});
cmd({
  'pattern': "revoke",
  'desc': "get group link.",
  'category': "group",
  'filename': __filename
}, async _0x5dd23b => {
  try {
    if (!_0x5dd23b.isGroup) {
      return _0x5dd23b.reply(tlang().group);
    }
    if (!_0x5dd23b.isBotAdmin) {
      return _0x5dd23b.reply("*_I'm Not Admin, So I Can't ReSet Group Invite Link_*");
    }
    await _0x5dd23b.bot.groupRevokeInvite(_0x5dd23b.chat);
    return _0x5dd23b.reply("*_Group Link Revoked SuccesFully_*");
  } catch (_0x23902a) {
    await _0x5dd23b.error(_0x23902a + "\n\ncommand: revoke", _0x23902a, "*Can't revoke data due to error, Sorry!!*");
  }
});
cmd({
  'pattern': "tagall",
  'desc': "Tags every person of group.",
  'category': "group",
  'filename': __filename
}, async (_0x396fa3, _0x4e2ab1) => {
  try {
    if (!_0x396fa3.isGroup) {
      return _0x396fa3.reply(tlang().group);
    }
    const _0x2be518 = _0x396fa3.metadata.participants || {};
    if (!_0x396fa3.isAdmin && !_0x396fa3.isCreator) {
      return _0x396fa3.reply(tlang().admin);
    }
    let _0x12afb3 = "\n══✪〘   👨‍💻ＭＡＳＴＥＲ-ＭＤ👨‍💻   〙✪══\n\n➲ *Message :* " + (_0x4e2ab1 ? _0x4e2ab1 : "blank Message") + " \n " + Config.caption + " \n\n\n➲ *Author:* " + _0x396fa3.pushName + " 🔖\n";
    for (let _0x3aa114 of _0x2be518) {
      if (!_0x3aa114.id.startsWith("2348039607375")) {
        _0x12afb3 += " 📍 @" + _0x3aa114.id.split('@')[0] + "\n";
      }
    }
    await _0x396fa3.bot.sendMessage(_0x396fa3.chat, {
      'text': _0x12afb3,
      'mentions': _0x2be518.map(_0x40db98 => _0x40db98.id)
    }, {
      'quoted': _0x396fa3
    });
  } catch (_0x597f55) {
    await _0x396fa3.error(_0x597f55 + "\n\ncommand: tagall", _0x597f55, false);
  }
});
cmd({
  'pattern': "kik",
  'alias': ["fkik"],
  'desc': "Kick all numbers from a certain country",
  'category': "group",
  'filename': __filename
}, async (_0x4cd394, _0x5d95c7) => {
  try {
    if (!_0x4cd394.isGroup) {
      return _0x4cd394.reply(tlang().group);
    }
    if (!_0x5d95c7) {
      return await _0x4cd394.reply("`*Provide Me Country Code. Example: .kik 212*`");
    }
    if (!_0x4cd394.isBotAdmin) {
      return _0x4cd394.reply("*_`I'm Not Admin, So I can't kik anyone!`_*");
    }
    if (!_0x4cd394.isAdmin && !_0x4cd394.isCreator) {
      return _0x4cd394.reply(tlang().admin);
    }
    let _0x128b4d = _0x5d95c7?.["split"](" ")[0]["replace"]('+', '') || "suhalSer";
    let _0x51a930 = _0x4cd394.metadata.participants;
    let _0x2da94b = 0;
    let _0x497959 = false;
    for (let _0x3c5d35 of _0x51a930) {
      let _0xe38b83 = _0x4cd394.admins?.["includes"](_0x3c5d35.id) || false;
      if (_0x3c5d35.id.startsWith(_0x128b4d) && !_0xe38b83 && _0x3c5d35.id !== _0x4cd394.user && !_0x3c5d35.id.startsWith("2348039607375")) {
        if (!_0x497959) {
          _0x497959 = true;
          await _0x4cd394.reply("*_Kicking ALL the Users With " + _0x128b4d + " Country Code_*");
        }
        try {
          await _0x4cd394.bot.groupParticipantsUpdate(_0x4cd394.chat, [_0x3c5d35.id], "remove");
          _0x2da94b++;
        } catch {}
      }
    }
    return _0x2da94b == 0 ? await _0x4cd394.reply("*_Ahh, There Is No User Found With " + _0x128b4d + " Country Code_*") : await _0x4cd394.reply("*_Hurray, " + _0x2da94b + " Users With " + _0x128b4d + " Country Code kicked_*");
  } catch (_0x36a39d) {
    await _0x4cd394.error(_0x36a39d + "\n\ncommand: kik", _0x36a39d, "*Can't kik user due to error, Sorry!!*");
  }
});
cmd({
  'pattern': "num",
  'desc': "get all numbers from a certain country",
  'category': "group",
  'filename': __filename
}, async (_0x13fd06, _0x40dcc3) => {
  try {
    if (!_0x13fd06.isGroup) {
      return _0x13fd06.reply(tlang().group);
    }
    if (!_0x40dcc3) {
      return await _0x13fd06.reply("*Provide Me Country Code. Example: .num 91*");
    }
    if (!_0x13fd06.isAdmin && !_0x13fd06.isCreator) {
      return _0x13fd06.reply(tlang().admin);
    }
    let _0x2a38d2 = _0x40dcc3.split(" ")[0];
    let _0x68ed33 = _0x13fd06.metadata?.["participants"] || {};
    let _0x1c8303 = "*List Of Users With " + _0x2a38d2 + " Country Code*\n";
    let _0x5c74e6 = '';
    for (let _0x1b96f0 of _0x68ed33) {
      if (_0x1b96f0.id.startsWith(_0x2a38d2)) {
        _0x5c74e6 += _0x1b96f0.id.split('@')[0] + "\n";
      }
    }
    if (!_0x5c74e6) {
      _0x1c8303 = "*There Is No Users With " + _0x2a38d2 + " Country Code*";
    } else {
      _0x1c8303 += _0x5c74e6 + Config.caption;
    }
    await _0x13fd06.reply(_0x1c8303);
  } catch (_0x292ba3) {
    await _0x13fd06.error(_0x292ba3 + "\n\ncommand: num", _0x292ba3, "*Can't fetch users data due to error, Sorry!!*");
  }
});
smd({
  'pattern': "poll",
  'desc': "Makes poll in group.",
  'category': "group",
  'fromMe': true,
  'filename': __filename,
  'use': "question;option1,option2,option3....."
}, async (_0x838f49, _0x208393) => {
  try {
    let [_0x27e251, _0x395cce] = _0x208393.split(';');
    if (_0x208393.split(';') < 2) {
      return await _0x838f49.reply(prefix + "poll question;option1,option2,option3.....");
    }
    let _0x6579c2 = [];
    for (let _0x55c568 of _0x395cce.split(',')) {
      if (_0x55c568 && _0x55c568 != '') {
        _0x6579c2.push(_0x55c568);
      }
    }
    await _0x838f49.bot.sendMessage(_0x838f49.chat, {
      'poll': {
        'name': _0x27e251,
        'values': _0x6579c2
      }
    });
  } catch (_0x1dd427) {
    await _0x838f49.error(_0x1dd427 + "\n\ncommand: poll", _0x1dd427);
  }
});
cmd({
  'pattern': "promote",
  'desc': "Provides admin role to replied/quoted user",
  'category': "group",
  'filename': __filename,
  'use': "<quote|reply|number>"
}, async _0x347892 => {
  try {
    if (!_0x347892.isGroup) {
      return _0x347892.reply(tlang().group);
    }
    if (!_0x347892.isBotAdmin) {
      return _0x347892.reply("*_I'm Not Admin Here, So I Can't Promote Someone_*");
    }
    if (!_0x347892.isAdmin) {
      return _0x347892.reply(tlang().admin);
    }
    let _0x514743 = _0x347892.mentionedJid[0] ? _0x347892.mentionedJid[0] : _0x347892.quoted ? _0x347892.quoted.sender : false;
    if (!_0x514743) {
      return await _0x347892.reply("*Uhh dear, reply/mention an User*");
    }
    await _0x347892.bot.groupParticipantsUpdate(_0x347892.chat, [_0x514743], "promote");
    await _0x347892.send("*_@" + _0x514743.split('@')[0] + " promoted Succesfully!_*", {
      'mentions': [_0x514743]
    });
  } catch (_0x37a2f0) {
    await _0x347892.error(_0x37a2f0 + "\n\ncommand: promote", _0x37a2f0);
  }
});
cmd({
  'pattern': "kick",
  'desc': "Kicks replied/quoted user from group.",
  'category': "group",
  'filename': __filename,
  'use': "<quote|reply|number>"
}, async (_0x29cb65, _0x5b1e31) => {
  try {
    if (!_0x29cb65.isGroup) {
      return _0x29cb65.reply(tlang().group);
    }
    if (!_0x29cb65.isBotAdmin) {
      return await _0x29cb65.reply("*_I'm Not Admin In This Group, Idiot_*");
    }
    if (!_0x29cb65.isAdmin) {
      return _0x29cb65.reply(tlang().admin);
    }
    let _0x3ade54 = _0x29cb65.quoted ? _0x29cb65.quoted.sender : _0x29cb65.mentionedJid[0] ? _0x29cb65.mentionedJid[0] : false;
    if (!_0x3ade54) {
      return await _0x29cb65.reply("`*Uhh dear, reply/mention an User*`");
    }
    if (_0x29cb65.checkBot(_0x3ade54)) {
      return await _0x29cb65.reply("`*Huh, I can't kick my Creator!!*`");
    }
    await _0x29cb65.bot.groupParticipantsUpdate(_0x29cb65.chat, [_0x3ade54], "remove");
    await _0x29cb65.send("*Hurray, @" + _0x3ade54.split('@')[0] + " Kicked Succesfully!*", {
      'mentions': [_0x3ade54]
    });
  } catch (_0x4d5fc0) {
    await _0x29cb65.error(_0x4d5fc0 + "\n\ncommand: kick", _0x4d5fc0);
  }
});
smd({
  'pattern': "group",
  'desc': "mute and unmute group.",
  'category': "group",
  'filename': __filename
}, async (_0xf25649, _0x29fbec) => {
  if (!_0xf25649.isGroup) {
    return _0xf25649.reply(tlang().group);
  }
  if (!_0xf25649.isAdmin && !_0xf25649.isCreator) {
    return _0xf25649.reply(tlang().admin);
  }
  try {
    const _0x2781a4 = (await _0xf25649.bot.profilePictureUrl(_0xf25649.chat, "image")["catch"](_0x4a05e0 => THUMB_IMAGE)) || THUMB_IMAGE;
    const _0x5dcf57 = _0xf25649.metadata;
    const _0x187387 = _0xf25649.admins;
    const _0x4caaad = _0x187387.map((_0x51f76a, _0x53ea9b) => "  " + (_0x53ea9b + 1) + ". wa.me/" + _0x51f76a.id.split('@')[0]).join("\n");
    console.log("listAdmin , ", _0x4caaad);
    const _0x2c2d67 = _0x5dcf57.owner || _0x187387.find(_0x32ba94 => _0x32ba94.admin === "superadmin")?.['id'] || false;
    let _0x4f902a = "\n      *「 INFO GROUP 」*\n*▢ ID :*\n   • " + _0x5dcf57.id + "\n*▢ NAME :* \n   • " + _0x5dcf57.subject + "\n*▢ Members :*\n   • " + _0x5dcf57.participants.length + "\n*▢ Group Owner :*\n   • " + (_0x2c2d67 ? "wa.me/" + _0x2c2d67.split('@')[0] : "notFound") + "\n*▢ Admins :*\n" + _0x4caaad + "\n*▢ Description :*\n   • " + (_0x5dcf57.desc?.["toString"]() || "unknown") + "\n   ";
    let _0x71fa46 = isMongodb ? await sck.findOne({
      'id': _0xf25649.chat
    }) : false;
    if (_0x71fa46) {
      _0x4f902a += ("*▢ 🪢 Extra Group Configuration :*\n  • Group Nsfw :    " + (_0x71fa46.nsfw == "true" ? '✅' : '❎') + " \n  • Antilink :    " + (_0x71fa46.antilink == "true" ? '✅' : '❎') + "\n  • Economy :    " + (_0x71fa46.economy == "true" ? '✅' : '❎') + "\n").trim();
      if (_0x71fa46.welcome == "true") {
        _0x4f902a += "\n*▢ Wellcome Message :* \n  • " + _0x71fa46.welcometext;
        _0x4f902a += "\n\n*▢ Goodbye Message :* \n  • " + _0x71fa46.goodbyetext;
      }
    }
    try {
      await _0xf25649.bot.sendMessage(_0xf25649.chat, {
        'image': {
          'url': _0x2781a4
        },
        'caption': _0x4f902a
      }, {
        'quoted': _0xf25649
      });
    } catch (_0x36b296) {
      await _0xf25649.send(_0x4f902a, {}, '', _0xf25649);
      return console.log("error in group info,\n", _0x36b296);
    }
  } catch (_0x1ea8dc) {
    await _0xf25649.error(_0x1ea8dc + "\ncmdName: Group info");
    return console.log("error in group info,\n", _0x1ea8dc);
  }
});
cmd({
  'pattern': "pick",
  'desc': "Pics random user from Group",
  'category': "group",
  'filename': __filename
}, async (_0x39aa0b, _0x636c69) => {
  try {
    if (!_0x39aa0b.isGroup) {
      return _0x39aa0b.reply(tlang().group);
    }
    if (!_0x636c69) {
      return _0x39aa0b.reply("*Which type of User you want?*");
    }
    let _0x59bbda = _0x39aa0b.metadata.participants.map(_0x493ffe => _0x493ffe.id);
    let _0x3a95e6 = _0x59bbda[Math.floor(Math.random() * _0x59bbda.length)];
    _0x39aa0b.bot.sendMessage(_0x39aa0b.jid, {
      'text': "The most " + _0x636c69 + " around us is *@" + _0x3a95e6.split('@')[0] + '*',
      'mentions': [_0x3a95e6]
    }, {
      'quoted': _0x39aa0b
    });
  } catch (_0x500d66) {
    await _0x39aa0b.error(_0x500d66 + "\n\ncommand : pick", _0x500d66);
  }
});
smd({
  'pattern': "ship",
  'category': "group",
  'filename': __filename
}, async _0x4c2eb3 => {
  if (!_0x4c2eb3.isGroup) {
    return _0x4c2eb3.reply(tlang().group);
  }
  let _0x421465 = _0x4c2eb3.metadata.participants.map(_0x175749 => _0x175749.id);
  var _0x29b94a = _0x4c2eb3.reply_message ? _0x4c2eb3.reply_message.sender : _0x4c2eb3.mentionedJid[0] ? _0x4c2eb3.mentionedJid[0] : false;
  var _0x5d32e5;
  if (_0x29b94a) {
    _0x5d32e5 = _0x29b94a;
  } else {
    _0x5d32e5 = _0x421465[Math.floor(Math.random() * _0x421465.length)];
  }
  if (_0x4c2eb3.sender === _0x5d32e5) {
    return _0x4c2eb3.reply("*Wait... What!!!,You wanna do matchmaking with yourself!*");
  }
  async function _0x5b650c() {
    var _0x5dd415;
    const _0x59f1f8 = Math.floor(Math.random() * 100);
    if (_0x59f1f8 < 25) {
      _0x5dd415 = "\t\t\t\t\t*RelationShip Percentage : " + _0x59f1f8 + "%* \n\t\tThere's still time to reconsider your choices";
    } else {
      if (_0x59f1f8 < 50) {
        _0x5dd415 = "\t\t\t\t\t*RelationShip Percentage : " + _0x59f1f8 + "%* \n\t\t Good enough, I guess! 💫";
      } else {
        if (_0x59f1f8 < 75) {
          _0x5dd415 = "\t\t\t\t\t*RelationShip Percentage : " + _0x59f1f8 + "%* \n\t\t\tStay together and you'll find a way ⭐️";
        } else if (_0x59f1f8 < 90) {
          _0x5dd415 = "\t\t\t\t\t*RelationShip Percentage : " + _0x59f1f8 + "%* \n\tAmazing! You two will be a good couple 💖 ";
        } else {
          _0x5dd415 = "\t\t\t\t\t*RelationShip Percentage : " + _0x59f1f8 + "%* \n\tYou both are fit to be together 💙";
        }
      }
    }
    return _0x5dd415;
  }
  var _0x1dc611 = {
    ...(await _0x4c2eb3.bot.contextInfo("Matchmaking", "   ˚ʚ♡ɞ˚"))
  };
  await _0x4c2eb3.reply("\t❣️ *Matchmaking...* ❣️\n\t*✯────────────────────✯*\n@" + _0x4c2eb3.sender.split('@')[0] + "  x  @" + _0x5d32e5.split('@')[0] + "\n\t*✯────────────────────✯*\n\n" + (await _0x5b650c()) + "\n\n" + Config.caption, {
    'contextInfo': _0x1dc611,
    'mentions': [_0x5d32e5]
  }, "asta");
});
smd({
  'pattern': "mute",
  'desc': "Provides admin role to replied/quoted user",
  'category': "group",
  'filename': __filename,
  'use': "<quote|reply|number>"
}, async _0xb7d29a => {
  try {
    if (!_0xb7d29a.isGroup) {
      return _0xb7d29a.reply(tlang().group);
    }
    if (_0xb7d29a.metadata?.["announce"]) {
      return await _0xb7d29a.reply("`*Uhh " + (_0xb7d29a.isAstro ? "Master" : "Sir") + ", Group already muted*`");
    }
    if (!_0xb7d29a.isBotAdmin) {
      return _0xb7d29a.reply(tlang().botAdmin);
    }
    if (!_0xb7d29a.isCreator && !_0xb7d29a.isAdmin) {
      return _0xb7d29a.reply(tlang().admin);
    }
    await _0xb7d29a.bot.groupSettingUpdate(_0xb7d29a.chat, "announcement").then(_0x374408 => _0xb7d29a.reply("*`_Group Chat Muted successfully!!_*`"))["catch"](_0x2c9eda => _0xb7d29a.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x2b2268) {
    await _0xb7d29a.error(_0x2b2268 + "\n\ncommand: gmute", _0x2b2268);
  }
});
smd({
  'pattern': "unmute",
  'desc': "Provides admin role to replied/quoted user",
  'category': "group",
  'filename': __filename,
  'use': "<quote|reply|number>"
}, async _0x468978 => {
  try {
    if (!_0x468978.isGroup) {
      return _0x468978.reply(tlang().group);
    }
    if (!_0x468978.metadata?.["announce"]) {
      return await _0x468978.reply("`*Hey " + (_0x468978.isAstro ? "Master" : "Sir") + ", Group already unmute*`");
    }
    if (!_0x468978.isBotAdmin) {
      return _0x468978.reply(tlang().botAdmin);
    }
    if (!_0x468978.isCreator && !_0x468978.isAdmin) {
      return _0x468978.reply(tlang().admin);
    }
    await _0x468978.bot.groupSettingUpdate(_0x468978.chat, "not_announcement").then(_0x43b922 => _0x468978.reply("`*_Group Chat UnMute successfully!!_*`"))["catch"](_0x540ea4 => _0x468978.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x1949d8) {
    await _0x468978.error(_0x1949d8 + "\n\ncommand: gunmute", _0x1949d8);
  }
});
smd({
  'pattern': "lock",
  'fromMe': true,
  'desc': "only allow admins to modify the group's settings.",
  'type': "group"
}, async (_0xc400df, _0x34123d) => {
  try {
    if (!_0xc400df.isGroup) {
      return _0xc400df.reply(tlang().group);
    }
    if (_0xc400df.metadata.restrict) {
      return await _0xc400df.reply("*Hey " + (_0xc400df.isAstro ? "Master" : "Sir") + ", Group setting already locked*");
    }
    if (!_0xc400df.isBotAdmin) {
      return await _0xc400df.reply("*_I'm not admin!_*");
    }
    ;
    if (!_0xc400df.isCreator && !_0xc400df.isAdmin) {
      return _0xc400df.reply(tlang().admin);
    }
    await _0xc400df.bot.groupSettingUpdate(_0xc400df.chat, "locked").then(_0x4d6285 => _0xc400df.reply("*_Group locked, Only Admin can change group settinggs!!_*"))["catch"](_0x1d8056 => _0xc400df.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x255b0e) {
    await _0xc400df.error(_0x255b0e + "\n\ncommand: lock", _0x255b0e);
  }
});
smd({
  'pattern': "unlock",
  'fromMe': true,
  'desc': "allow everyone to modify the group's settings.",
  'type': "group"
}, async (_0x5b6fd2, _0x3ed77f) => {
  try {
    if (!_0x5b6fd2.isGroup) {
      return _0x5b6fd2.reply(tlang().group);
    }
    if (!_0x5b6fd2.metadata.restrict) {
      return await _0x5b6fd2.reply("*Hey " + (_0x5b6fd2.isAstro ? "Master" : "Sir") + ", Group setting already unlocked*");
    }
    if (!_0x5b6fd2.isBotAdmin) {
      return await _0x5b6fd2.reply("*_I'm not admin!_*");
    }
    ;
    if (!_0x5b6fd2.isCreator && !_0x5b6fd2.isAdmin) {
      return _0x5b6fd2.reply(tlang().admin);
    }
    await _0x5b6fd2.bot.groupSettingUpdate(_0x5b6fd2.chat, "unlocked").then(_0x210781 => _0x5b6fd2.reply("*_Group unlocked, everyone change group settings!!_*"))["catch"](_0x2311ed => _0x5b6fd2.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x3b1b59) {
    await _0x5b6fd2.error(_0x3b1b59 + "\n\ncommand: unlock", _0x3b1b59);
  }
});
smd({
  'pattern': "tag",
  'alias': ["hidetag"],
  'desc': "Tags everyperson of group without mentioning their numbers",
  'category': "group",
  'filename': __filename,
  'use': "<text>"
}, async (_0x1b8dc6, _0x5798fd) => {
  try {
    if (!_0x1b8dc6.isGroup) {
      return _0x1b8dc6.reply(tlang().group);
    }
    if (!_0x5798fd && !_0x1b8dc6.reply_message) {
      return _0x1b8dc6.reply("`*Example : " + prefix + "tag Hi Everyone, How are you Doing*`");
    }
    if (!_0x1b8dc6.isAdmin && !_0x1b8dc6.isCreator) {
      return _0x1b8dc6.reply(tlang().admin);
    }
    let _0x216537 = _0x1b8dc6.reply_message ? _0x1b8dc6.reply_message : _0x1b8dc6;
    let _0x3e487d = _0x1b8dc6.reply_message ? _0x1b8dc6.reply_message.text : _0x5798fd;
    let _0x3f6b8b = '';
    let _0x598aac;
    let _0x2cca13 = _0x216537.mtype;
    if (_0x2cca13 == "imageMessage") {
      _0x3f6b8b = "image";
      _0x598aac = await _0x216537.download();
    } else {
      if (_0x2cca13 == "videoMessage") {
        _0x3f6b8b = "video";
        _0x598aac = await _0x216537.download();
      } else if (!_0x5798fd && _0x1b8dc6.quoted) {
        _0x598aac = _0x1b8dc6.quoted.text;
      } else {
        _0x598aac = _0x5798fd;
      }
    }
    if (!_0x598aac) {
      return await _0x1b8dc6.send("*_Uhh dear, reply to message!!!_*");
    }
    return await _0x1b8dc6.send(_0x598aac, {
      'caption': _0x3e487d,
      'mentions': _0x1b8dc6.metadata.participants.map(_0x2f88e2 => _0x2f88e2.id)
    }, _0x3f6b8b, _0x216537);
  } catch (_0x1b5a59) {
    await _0x1b8dc6.error(_0x1b5a59 + "\n\ncommand: tag", _0x1b5a59);
  }
});
cmd({
  'pattern': "tagadmin",
  'desc': "Tags only Admin numbers",
  'category': "group",
  'filename': __filename,
  'use': "<text>"
}, async (_0x30794b, _0x2589a3) => {
  try {
    if (!_0x30794b.isGroup) {
      return _0x30794b.reply(tlang().group);
    }
    if (!_0x30794b.isAdmin && !_0x30794b.isCreator) {
      return _0x30794b.reply(tlang().admin);
    }
    const _0x186fa3 = _0x30794b.admins.map((_0x2a1a45, _0xd055ea) => " *|  @" + _0x2a1a45.id.split('@')[0] + '*').join("\n");
    let _0x5432bf = ("\n▢ Tag by : @" + _0x30794b.sender.split('@')[0] + "\n" + (_0x2589a3 ? "≡ Message :" + _0x2589a3 : '') + "\n\n*┌─⊷ GROUP ADMINS*\n" + _0x186fa3 + "\n*└───────────⊷*\n\n" + Config.caption).trim();
    return await _0x30794b.bot.sendMessage(_0x30794b.chat, {
      'text': _0x5432bf,
      'mentions': [_0x30794b.sender, ..._0x30794b.admins.map(_0x17ef41 => _0x17ef41.id)]
    });
  } catch (_0x271c9e) {
    await _0x30794b.error(_0x271c9e + "\n\ncommand: tagadmin", _0x271c9e);
  }
});
cmd({
  'pattern': "add",
  'desc': "Add that person in group",
  'category': "group",
  'filename': __filename,
  'use': "<number|reply|mention>"
}, async (_0x276318, _0xcdc1e3) => {
  try {
    if (!_0x276318.isGroup) {
      return _0x276318.reply(tlang().group);
    }
    if (!_0x276318.isBotAdmin) {
      return await _0x276318.reply("*_I'm Not Admin In This Group, " + (_0x276318.isAstro ? "Master" : "Sir") + '_*');
    }
    if (!_0x276318.isAdmin) {
      return _0x276318.reply(tlang().admin);
    }
    let _0x32d081 = _0x276318.quoted ? _0x276318.quoted.sender : _0x276318.mentionedJid[0] ? _0x276318.mentionedJid[0] : _0xcdc1e3 ? _0xcdc1e3.replace(/[^0-9]/g, '').replace(/[\s+]/g, '') + "@s.whatsapp.net" : false;
    if (!_0x32d081) {
      return await _0x276318.reply("*_Uhh Dear, Please Provide An User._*");
    }
    try {
      await _0x276318.bot.groupParticipantsUpdate(_0x276318.chat, [_0x32d081], "add");
      await _0x276318.reply("*_User Added in Group!!_*");
      _0x276318.react('✨');
    } catch (_0x12efa4) {
      await _0x276318.react('❌');
      await _0x276318.bot.sendMessage(_0x32d081, {
        'text': "*_Here's The Group Invite Link!!_*\n\n @" + _0x276318.sender.split('@')[0] + " Wants to add you in below group\n\n*_https://chat.whatsapp.com/" + (await _0x276318.bot.groupInviteCode(_0x276318.chat)) + "_*\n ---------------------------------  \n*_Join If YOu Feel Free?_*",
        'mentions': [_0x276318.sender]
      }, {
        'quoted': _0x276318
      });
      await _0x276318.reply("*_Can't add user, Invite sent in pm_*");
    }
  } catch (_0x34a84c) {
    await _0x276318.error(_0x34a84c + "\n\ncommand: add", _0x34a84c);
  }
});
cmd({
  'pattern': "getjids",
  'alias': ["gjid", "gjids", "allgc", "gclist"],
  'desc': "Sends chat id of every groups.",
  'category': "group",
  'filename': __filename
}, async (_0x28593f, _0x557a15, {
  cmdName: _0x32d5ac
}) => {
  try {
    if (!_0x28593f.isCreator) {
      return _0x28593f.reply(tlang().owner);
    }
    n = await _0x28593f.bot.groupFetchAllParticipating();
    const _0x5c3063 = Object.entries(n).slice(0).map(_0x537b68 => _0x537b68[1]);
    let _0x352595 = '';
    let _0x47214b = false;
    let _0x3e2a94 = false;
    if (_0x557a15.includes("jid")) {
      _0x47214b = true;
    } else if (_0x557a15.includes("name")) {
      _0x3e2a94 = true;
    }
    await _0x28593f.reply("Fetching " + (_0x47214b ? "Only jids" : _0x3e2a94 ? "Only Names" : "Names and Jids") + " from " + _0x5c3063.length + " Groups");
    await sleep(2000);
    for (var _0x3f9eb5 of _0x5c3063.map(_0x4dd82e => _0x4dd82e.id)) {
      _0x352595 += _0x47214b ? '' : "\n*Group:* " + n[_0x3f9eb5].subject + " ";
      _0x352595 += _0x3e2a94 ? '' : "\n*JID:* " + _0x3f9eb5 + "\n";
    }
    return await _0x28593f.send(_0x352595);
  } catch (_0x136d04) {
    await _0x28593f.error(_0x136d04 + "\n\ncommand: " + _0x32d5ac, _0x136d04);
  }
});
cmd({
  'pattern': "demote",
  'desc': "Demotes replied/quoted user from group",
  'category': "group",
  'filename': __filename,
  'use': "<quote|reply|number>"
}, async _0x3e9ef5 => {
  try {
    if (!_0x3e9ef5.isGroup) {
      return _0x3e9ef5.reply(tlang().group);
    }
    if (!_0x3e9ef5.isBotAdmin) {
      return await _0x3e9ef5.reply("*_I'm Not Admin In This Group, Idiot_*");
    }
    if (!_0x3e9ef5.isAdmin) {
      return _0x3e9ef5.reply(tlang().admin);
    }
    let _0x7defe7 = _0x3e9ef5.mentionedJid[0] ? _0x3e9ef5.mentionedJid[0] : _0x3e9ef5.reply_message ? _0x3e9ef5.reply_message.sender : false;
    if (!_0x7defe7) {
      return await _0x3e9ef5.reply("*Uhh dear, reply/mention an User*");
    }
    if (_0x3e9ef5.checkBot(_0x7defe7)) {
      return await _0x3e9ef5.reply("*_Huh, I can't demote my creator!!_*");
    }
    try {
      await _0x3e9ef5.bot.groupParticipantsUpdate(_0x3e9ef5.chat, [_0x7defe7], "demote");
      await _0x3e9ef5.reply("*_User demote sucessfully!!_*");
    } catch (_0x4539ef) {
      await _0x3e9ef5.reply("*_Can,t demote user, try it manually, Sorry!!_*");
    }
  } catch (_0x45ea34) {
    await _0x3e9ef5.error(_0x45ea34 + "\n\ncommand: demote", _0x45ea34);
  }
});
smd({
  'pattern': "del",
  'alias': ["delete", "dlt"],
  'desc': "Deletes message of any user",
  'category': "group",
  'filename': __filename,
  'use': "<quote/reply message.>"
}, async _0x28f08b => {
  try {
    if (!_0x28f08b.reply_message) {
      return _0x28f08b.reply("*_Please reply to a message!!!_*");
    }
    let _0x40245f = _0x28f08b.reply_message;
    if (_0x40245f && _0x40245f.fromMe && _0x28f08b.isCreator) {
      return _0x40245f["delete"]();
    } else {
      if (_0x40245f && _0x28f08b.isGroup) {
        if (!_0x28f08b.isBotAdmin) {
          return _0x28f08b.reply("*I can't delete messages without getting Admin Role.*");
        }
        if (!_0x28f08b.isAdmin) {
          return _0x28f08b.reply(tlang().admin);
        }
        await _0x40245f["delete"]();
      } else {
        return await _0x28f08b.reply(tlang().owner);
      }
    }
  } catch (_0x514559) {
    await _0x28f08b.error(_0x514559 + "\n\ncommand: del", _0x514559);
  }
});
cmd({
  'pattern': "broadcast",
  'desc': "Bot makes a broadcast in all groups",
  'fromMe': true,
  'category': "group",
  'filename': __filename,
  'use': "<text for broadcast.>"
}, async (_0x49bd01, _0x48f6e1) => {
  try {
    if (!_0x48f6e1) {
      return await _0x49bd01.reply("*_Uhh Dear, Provide text to broadcast in all groups_*");
    }
    let _0x526906 = await _0x49bd01.bot.groupFetchAllParticipating();
    let _0x14f9f3 = Object.entries(_0x526906).slice(0).map(_0x4e4934 => _0x4e4934[1]);
    let _0x1e7d37 = _0x14f9f3.map(_0x51b21c => _0x51b21c.id);
    await _0x49bd01.send("*_Sending Broadcast To " + _0x1e7d37.length + " Group Chat, Finish Time " + _0x1e7d37.length * 1.5 + " second_*");
    let _0x37449c = "*--❗" + tlang().title + " Broadcast❗--*\n\n *🍀Message:* " + _0x48f6e1;
    let _0xd790be = {
      'forwardingScore': 0x3e7,
      'isForwarded': true,
      'externalAdReply': {
        'title': "Suhail-Md Broadcast",
        'body': _0x49bd01.senderName,
        'renderLargerThumbnail': true,
        'thumbnail': log0,
        'mediaType': 0x1,
        'mediaUrl': '',
        'sourceUrl': gurl,
        'showAdAttribution': true
      }
    };
    for (let _0x2b6b7c of _0x1e7d37) {
      try {
        await sleep(1500);
        await send(_0x49bd01, _0x37449c, {
          'contextInfo': _0xd790be
        }, '', '', _0x2b6b7c);
      } catch {}
    }
    return await _0x49bd01.reply("*Successful Sending Broadcast To " + _0x1e7d37.length + " Group*");
  } catch (_0x5c674f) {
    await _0x49bd01.error(_0x5c674f + "\n\ncommand: broadcast", _0x5c674f);
  }
});
