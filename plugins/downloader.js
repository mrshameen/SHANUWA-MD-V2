const {
  smd,
  fetchJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  smdJson,
  pinterest,
  prefix,
  Config,
  mediafire
} = require("../lib");
const {
  search,
  download
} = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const ytdl = require("ytdl-secktor");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
const {
  cmd
} = require("../lib/plugins");
smd({
  'pattern': "spotify2",
  'alias': ["sp2"],
  'desc': "Downloads a Spotify song.",
  'category': "downloader",
  'filename': __filename,
  'use': "<Spotify URL>"
}, async (_0x3371ad, _0x24265d) => {
  try {
    const _0x2e8fb6 = _0x24265d.trim();
    if (!_0x2e8fb6 || !isValidUrl(_0x2e8fb6)) {
      return await _0x3371ad.send("*_Please provide a valid Spotify URL._*");
    }
    const _0x3839af = "https://api.maher-zubair.tech/download/spotify?url=" + encodeURIComponent(_0x2e8fb6);
    const _0x2d70db = await axios.get(_0x3839af);
    const _0x241c46 = _0x2d70db.data;
    if (!_0x241c46 || _0x241c46.status !== 200) {
      return await _0x3371ad.reply("*Failed to download the Spotify song.*");
    }
    const {
      song: _0x574253,
      artist: _0x511ff7,
      album_name: _0x56c772,
      release_date: _0x5de2f8,
      cover_url: _0x1ff0b8,
      url: _0x3cdc56
    } = _0x241c46.result;
    let _0x5c82e0 = "*Song:* " + _0x574253 + "\n";
    _0x5c82e0 += "*Artist:* " + _0x511ff7.join(", ") + "\n";
    _0x5c82e0 += "*Album:* " + _0x56c772 + "\n";
    _0x5c82e0 += "*Release Date:* " + _0x5de2f8 + "\n\n";
    _0x5c82e0 += "*Cover Image:* " + _0x1ff0b8 + "\n\n";
    const _0x4ceef4 = await axios.get(_0x3cdc56, {
      'responseType': "arraybuffer"
    });
    const _0x52ace8 = _0x574253.replace(/\s/g, '_') + ".mp3";
    await _0x3371ad.bot.sendMessage(_0x3371ad.chat, {
      'audio': _0x4ceef4.data,
      'fileName': _0x52ace8,
      'mimetype': "audio/mpeg",
      'caption': _0x5c82e0
    }, {
      'quoted': _0x3371ad
    });
  } catch (_0x37fcc1) {
    await _0x3371ad.error(_0x37fcc1 + "\n\nCommand: spotify2", _0x37fcc1, "*Failed to download the Spotify song.*");
  }
});
function isValidUrl(_0x2d3883) {
  try {
    new URL(_0x2d3883);
    return true;
  } catch (_0x5d0f98) {
    return false;
  }
}
smd({
  'pattern': "spotify",
  'alias': ['sp'],
  'desc': "Searches for Spotify tracks.",
  'category': "search",
  'filename': __filename,
  'use': "<search query>"
}, async (_0x1df729, _0xcbc610) => {
  try {
    const _0x49eba3 = _0xcbc610.trim();
    if (!_0x49eba3) {
      return await _0x1df729.send("*_Please provide a search query._*");
    }
    const _0x356acb = "https://api.maher-zubair.tech/search/spotify?q=" + encodeURIComponent(_0x49eba3);
    const _0x54de4d = await axios.get(_0x356acb);
    const _0xa877a = _0x54de4d.data;
    if (!_0xa877a || _0xa877a.status !== 200) {
      return await _0x1df729.reply("*Failed to fetch Spotify tracks.*");
    }
    const _0x59a8dd = _0xa877a.result;
    if (!_0x59a8dd || _0x59a8dd.length === 0) {
      return await _0x1df729.reply("*No Spotify tracks found.*");
    }
    let _0x1f22a7 = "*Spotify Search Results:*\n\n";
    for (let _0x13ec7d = 0; _0x13ec7d < _0x59a8dd.length; _0x13ec7d++) {
      const _0x1109fa = _0x59a8dd[_0x13ec7d];
      _0x1f22a7 += '*' + (_0x13ec7d + 1) + ". " + _0x1109fa.title + "*\n";
      _0x1f22a7 += "Artist: " + _0x1109fa.artist + "\n";
      _0x1f22a7 += "Duration: " + formatDuration(_0x1109fa.duration) + "\n";
      _0x1f22a7 += "Popularity: " + _0x1109fa.popularity + "\n";
      _0x1f22a7 += "Preview: " + (_0x1109fa.preview ? _0x1109fa.preview : "No preview available") + "\n";
      _0x1f22a7 += "URL: " + _0x1109fa.url + "\n\n";
    }
    return await _0x1df729.send(_0x1f22a7, {
      'quoted': _0x1df729
    });
  } catch (_0x2db123) {
    await _0x1df729.error(_0x2db123 + "\n\nCommand: spotify", _0x2db123, "*Failed to search Spotify.*");
  }
});
function formatDuration(_0x3cf54a) {
  const _0x398062 = Math.floor(_0x3cf54a / 1000 % 60);
  const _0x4231ef = Math.floor(_0x3cf54a / 60000 % 60);
  const _0x3b612e = Math.floor(_0x3cf54a / 3600000 % 24);
  return '' + (_0x3b612e ? _0x3b612e + "h " : '') + _0x4231ef + "m " + _0x398062 + 's';
}
smd({
  'pattern': "twitter",
  'alias': ['tw', "twdl"],
  'desc': "Downloads Twitter videos.",
  'category': "downloader",
  'filename': __filename,
  'use': "<add Twitter URL>"
}, async (_0x316124, _0x2fa0d2) => {
  try {
    let _0x5c617d = _0x2fa0d2.split(" ")[0].trim();
    if (!_0x5c617d || !_0x5c617d.startsWith("https://")) {
      return await _0x316124.send("*_Please provide a valid Twitter Video URL._*\n*Example: " + prefix + "tw https://twitter.com/username/status/1234567890_*");
    }
    let _0x5ece47 = await smdJson("https://api.maher-zubair.tech/download/twitter?url=" + _0x5c617d);
    if (!_0x5ece47 || !_0x5ece47.status === 200) {
      return await _0x316124.reply("*Invalid Video URL!*");
    }
    let _0x5e44f4 = _0x5ece47.data.caption ? _0x5ece47.data.caption : "*Twitter Video Download*\n\n*Username:* " + _0x5ece47.data.username;
    return await _0x316124.bot.sendMessage(_0x316124.chat, {
      'video': {
        'url': _0x5ece47.data.HD
      },
      'caption': _0x5e44f4
    }, {
      'quoted': _0x316124
    });
  } catch (_0x5d1a38) {
    await _0x316124.error(_0x5d1a38 + "\n\nCommand: twitter", _0x5d1a38, "*_Video not found!_*");
  }
});
smd({
  'pattern': "facebook",
  'alias': ['fb', "fbdl"],
  'desc': "Downloads Facebook videos.",
  'category': "downloader",
  'filename': __filename,
  'use': "<add Facebook URL>"
}, async (_0x2dfb61, _0x56274a) => {
  try {
    let _0x192578 = _0x56274a.split(" ")[0].trim();
    if (!_0x192578 || !_0x192578.startsWith("https://")) {
      return await _0x2dfb61.send("*_Please provide a valid Facebook Video URL._*\n*Example: " + prefix + "fb https://www.facebook.com/watch/?v=2018727118289093_*");
    }
    let _0x30a361 = await smdJson("https://api-smd.onrender.com/api/fbdown?url=" + _0x192578);
    if (!_0x30a361 || !_0x30a361.status) {
      return await _0x2dfb61.reply("*Invalid Video URL!*");
    }
    return await _0x2dfb61.bot.sendMessage(_0x2dfb61.chat, {
      'video': {
        'url': _0x30a361.result.Normal_video
      },
      'caption': Config.caption
    }, {
      'quoted': _0x2dfb61
    });
  } catch (_0x46fa51) {
    await _0x2dfb61.error(_0x46fa51 + "\n\nCommand: facebook", _0x46fa51, "*_Video not found!_*");
  }
});
smd({
  'pattern': "tgs",
  'desc': "Downloads telegram stickers.",
  'category': "downloader",
  'filename': __filename,
  'use': "<add sticker url.>"
}, async (_0x63cfe1, _0x540bda) => {
  try {
    if (!_0x540bda) {
      return await _0x63cfe1.reply("_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently");
    }
    if (!_0x540bda.includes("addstickers")) {
      return await _0x63cfe1.reply("_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal");
    }
    let _0x4f28c6 = _0x540bda.split('|')[0];
    let _0x3cdb74 = _0x4f28c6.split("/addstickers/")[1];
    let {
      result: _0x26b529
    } = await fetchJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x3cdb74) + " ");
    let _0x2dd2ef = _0x540bda.split('|')[1] || '';
    let _0xd80b6e = "Total stickers: " + _0x26b529.stickers.length + "\n*Estimated complete in:* " + _0x26b529.stickers.length * 1.5 + " seconds\nKeep in mind that there is a chance of a ban if used frequently";
    if (_0x26b529.is_animated) {
      return await _0x63cfe1.reply("Animated stickers are not supported");
    } else {
      if (_0x2dd2ef.startsWith("info")) {
        return await _0x63cfe1.reply(_0xd80b6e);
      }
    }
    let _0x5694bb = parseInt(_0x2dd2ef.split(',')[0]) || 10;
    let _0x16a963 = parseInt(_0x2dd2ef.split(',')[1]) || 0;
    let _0x4ded81 = _0x2dd2ef.split(';')[1] || "Sticker";
    let _0x2dc386 = true;
    if (_0x4ded81.includes("photo")) {
      _0x2dc386 = false;
      _0x4ded81 = "Photo";
    }
    if (_0x5694bb > _0x26b529.stickers.length) {
      _0x5694bb = _0x26b529.stickers.length;
    }
    if (_0x16a963 > _0x26b529.stickers.length) {
      _0x16a963 = _0x26b529.stickers.length - 5;
    }
    if (_0x16a963 > _0x5694bb) {
      let _0x5a00db = _0x5694bb;
      _0x5694bb = _0x16a963;
      _0x16a963 = _0x5a00db;
    }
    await _0x63cfe1.reply(_0xd80b6e + "\n\n_Downloading as " + _0x4ded81 + " From index *" + _0x16a963 + "* to *" + _0x5694bb + "*._\nIf you wants more to download then use Like \n\n .tgs " + _0x4f28c6 + " |  10 ,  20 ; photo");
    for (_0x16a963; _0x16a963 < _0x5694bb; _0x16a963++) {
      let _0x596952 = await fetchJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x26b529.stickers[_0x16a963].file_id);
      let _0x49f120 = "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x596952.result.file_path;
      if (_0x2dc386) {
        let _0x292dac = await getBuffer(_0x49f120);
        await _0x63cfe1.reply(_0x292dac, {
          'packname': Config.packname,
          'author': "Suhail-Md"
        }, "sticker");
      } else {
        await _0x63cfe1.bot.sendMessage(_0x63cfe1.chat, {
          'image': {
            'url': _0x49f120
          },
          'caption': "*_Telegram Sticker At Index " + (_0x16a963 + 1) + " Downloaded_*"
        });
      }
    }
  } catch (_0x5c9e69) {
    await _0x63cfe1.error(_0x5c9e69 + "\n\ncommand: tgs", _0x5c9e69, "*_Error Sending telegram stickers!!!_*");
  }
});
smd({
  'pattern': "wikimedia",
  'desc': "Downloads wikimedia images.",
  'category': "downloader",
  'filename': __filename,
  'use': "<text|search.>"
}, async (_0x57e816, _0x4a5b53) => {
  try {
    if (!_0x4a5b53) {
      return await _0x57e816.send("*_Please Give me search query!_*");
    }
    let {
      wikimedia: _0x5a3b42
    } = require("../lib");
    let _0x424e40 = (await _0x5a3b42(_0x4a5b53)) || [];
    if (!_0x424e40 || !_0x424e40[0]) {
      return await _0x57e816.send("*_No Results Found!_*");
    }
    let _0x2a4ad0 = _0x57e816.iscreator && _0x4a5b53.split('|')[1] === "all" ? _0x424e40.length : _0x424e40.length > 5 ? 5 : _0x424e40.length;
    for (let _0x50114c = 0; _0x50114c < _0x2a4ad0; _0x50114c++) {
      try {
        _0x57e816.bot.sendFromUrl(_0x57e816.from, _0x424e40[_0x50114c].image, "Title: " + _0x424e40[_0x50114c].title + "\n*Source:* " + _0x424e40[_0x50114c].source, _0x57e816, {}, "image");
      } catch {}
    }
  } catch (_0x230f73) {
    await _0x57e816.error(_0x230f73 + "\n\ncommand: insta", _0x230f73);
  }
});
smd({
  'pattern': "apk",
  'alias': ["modapk"],
  'desc': "Downloads apks  .",
  'category': "downloader",
  'filename': __filename,
  'use': "<add sticker url.>"
}, async (_0x1b366e, _0x549a78) => {
  try {
    if (!_0x549a78) {
      return _0x1b366e.reply("*_Uhh dear, Give me App Name!_*");
    }
    let _0x305225 = await search(_0x549a78);
    let _0x405cc0 = {};
    if (_0x305225.length) {
      _0x405cc0 = await download(_0x305225[0].id);
    } else {
      return _0x1b366e.reply("*_Apk not found, Try another name!!_*");
    }
    const _0x3ced2a = parseInt(_0x405cc0.size);
    if (_0x3ced2a > 200) {
      return _0x1b366e.reply("❌ File size bigger than 200mb.");
    }
    const _0x752fea = _0x405cc0.dllink;
    let _0x371348 = await fancytext("『 *APK DOWNLOADER* 』\n\n*APP Name :* " + _0x405cc0.name + "\n*App Id :* " + _0x405cc0["package"] + "\n*Last Up :* " + _0x405cc0.lastup + "\n*App Size :* " + _0x405cc0.size + "\n\n\n " + Config.caption, 25);
    const _0x330105 = (_0x405cc0?.["name"] || "Downloader") + ".apk";
    const _0x11cbc4 = "temp/" + _0x330105;
    let _0x30a78f = await _0x1b366e.reply(_0x405cc0.icon, {
      'caption': _0x371348
    }, "img", _0x1b366e);
    axios.get(_0x752fea, {
      'responseType': "stream"
    }).then(_0xbe93e => {
      const _0x5cf46c = fs.createWriteStream(_0x11cbc4);
      _0xbe93e.data.pipe(_0x5cf46c);
      return new Promise((_0x5e788e, _0x482d40) => {
        _0x5cf46c.on("finish", _0x5e788e);
        _0x5cf46c.on("error", _0x482d40);
      });
    }).then(() => {
      let _0x347748 = {
        'document': fs.readFileSync(_0x11cbc4),
        'mimetype': "application/vnd.android.package-archive",
        'fileName': _0x330105
      };
      _0x1b366e.bot.sendMessage(_0x1b366e.jid, _0x347748, {
        'quoted': _0x30a78f
      });
      try {
        fs.unlink(_0x11cbc4);
      } catch {}
    })["catch"](_0x4cbe24 => {
      try {
        fs.unlink(_0x11cbc4);
      } catch {}
      ;
      _0x1b366e.reply("*_Apk not Found, Sorry_*");
    });
  } catch (_0x25d8ff) {
    await _0x1b366e.error(_0x25d8ff + "\n\ncommand: apk", _0x25d8ff, "*_Apk not Found!_*");
  }
});
cmd({
  'pattern': "apks",
  'alias': ["apksearch"],
  'desc': "Search App",
  'category': "downloader",
  'filename': __filename,
  'use': "<Search Query>"
}, async (_0x1f564b, _0x13c83c) => {
  try {
    if (!_0x13c83c) {
      return await _0x1f564b.reply("*_Uhh pLease, give me app name!_*");
    }
    const _0x449ab9 = await search(_0x13c83c);
    if (_0x449ab9.length) {
      let _0x19c58b = await download(_0x449ab9[0].id);
      let _0xcc8e99 = "*ᴍᴀꜱᴛᴇʀ-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ* \n*________________________________* \n\n*_Reply Any Number To Download._*\n_Results For : " + _0x13c83c + "_ \n";
      for (let _0x21ca37 = 0; _0x21ca37 < _0x449ab9.length; _0x21ca37++) {
        _0xcc8e99 += "\n*" + (_0x21ca37 + 1) + " : " + _0x449ab9[_0x21ca37].name + "* \n*Id : " + _0x449ab9[_0x21ca37].id + "* \n";
      }
      return await _0x1f564b.sendMessage(_0x1f564b.chat, {
        'image': {
          'url': _0x19c58b.icon
        },
        'caption': _0xcc8e99
      }, {
        'quoted': _0x1f564b
      });
    } else {
      return _0x1f564b.reply("*_APP not Found, Try Other Name_*");
    }
  } catch (_0x97d508) {
    _0x1f564b.error(_0x97d508 + "\n\ncommand: apks", _0x97d508);
  }
});
smd({
  'pattern': "soundcloud",
  'alias': ["scdl", "scdownload"],
  'desc': "Download audio from SoundCloud.",
  'category': "downloader",
  'filename': __filename,
  'use': "<SoundCloud audio URL>"
}, async (_0x231a7a, _0x394b04) => {
  try {
    const _0x2a4ec7 = _0x394b04.trim();
    if (!_0x2a4ec7) {
      return await _0x231a7a.reply("*Please provide a SoundCloud audio URL.*");
    }
    const _0xd6d96c = "https://api.maher-zubair.tech/download/soundcloud?url=" + encodeURIComponent(_0x2a4ec7);
    const _0x592217 = await fetch(_0xd6d96c).then(_0x191482 => _0x191482.json());
    if (!_0x592217 || _0x592217.status !== 200) {
      return await _0x231a7a.reply("*An error occurred while downloading the SoundCloud audio.*");
    }
    const _0x47a7ae = _0x592217.result;
    const _0xbe2965 = _0x47a7ae.link;
    const _0x447182 = _0x47a7ae.thumb;
    const _0x27dc97 = _0x47a7ae.title;
    const _0x27cdca = _0x47a7ae.download_count;
    await _0x231a7a.bot.sendAudio(_0x231a7a.chat, _0xbe2965, _0x27dc97, _0x27cdca, _0x447182, {
      'quoted': _0x231a7a
    });
  } catch (_0x3b6bce) {
    await _0x231a7a.error(_0x3b6bce + "\n\ncommand: soundcloud", _0x3b6bce, "*An error occurred while downloading the SoundCloud audio.*");
  }
});
smd({
  'pattern': "gitclone",
  'desc': "Downloads apks  .",
  'category': "downloader",
  'filename': __filename,
  'use': "<add sticker url.>"
}, async (_0x15ac56, _0x4d5fd8) => {
  try {
    if (!_0x4d5fd8) {
      return await _0x15ac56.reply("*Provide Repo Url, _.gitclone https://github.com/Master-Md_*");
    }
    if (!/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i.test(_0x4d5fd8)) {
      return await _0x15ac56.reply("*Provide Valid Repositry Url*");
    }
    _0x16b040 = _0x16b040.replace(/.git$/, '');
    let _0x394586 = "https://api.github.com/repos/" + _0x5c8b73 + '/' + _0x16b040 + "/zipball";
    let _0x3be4f1 = (await fetch(_0x394586, {
      'method': "HEAD"
    })).headers.get("content-disposition").match(/attachment; filename=(.*)/)[1];
    await _0x15ac56.bot.sendMessage(_0x15ac56.jid, {
      'document': {
        'url': _0x394586
      },
      'fileName': _0x3be4f1,
      'mimetype': "application/zip"
    });
  } catch (_0x4e79e7) {
    return _0x15ac56.error(_0x4e79e7 + "\n\ncommand: gitclone", _0x4e79e7, "*_File not found!!!_*");
  }
});
smd({
  'pattern': "tiktokimg",
  'alias': ["tiktokpic", "tiktokphoto"],
  'desc': "Download TikTok image.",
  'category': "downloader",
  'filename': __filename,
  'use': "<TikTok video URL>"
}, async (_0x5286c1, _0x1de275) => {
  try {
    const _0x32064d = _0x1de275.trim();
    if (!_0x32064d) {
      return await _0x5286c1.reply("*Please provide a TikTok video URL.*");
    }
    const _0x623d01 = "api.maher-zubair.tech/download/tiktokimg?url=" + encodeURIComponent(_0x32064d);
    const _0x1c0f5a = await fetch(_0x623d01).then(_0x35c6b0 => _0x35c6b0.json());
    if (!_0x1c0f5a || _0x1c0f5a.status !== 200) {
      return await _0x5286c1.reply("*An error occurred while downloading the TikTok image.*");
    }
    const _0x57bff9 = _0x1c0f5a.result[0];
    await _0x5286c1.bot.sendImage(_0x5286c1.chat, _0x57bff9, null, {
      'quoted': _0x5286c1
    });
  } catch (_0x44a8f2) {
    await _0x5286c1.error(_0x44a8f2 + "\n\ncommand: tiktokimg", _0x44a8f2, "*An error occurred while downloading the TikTok image.*");
  }
});
smd({
  'pattern': "tts",
  'desc': "text to speech.",
  'category': "downloader",
  'filename': __filename,
  'use': "<Hii,this is Suhail>"
}, async (_0x1a610d, _0x53c4cc) => {
  try {
    let _0x3095c8 = _0x1a610d.reply_text ? _0x1a610d.reply_text : _0x53c4cc;
    if (!_0x3095c8) {
      return _0x1a610d.reply("*_Example : .tts Hi,I am Suhail-Md whatsapp bot._*");
    }
    try {
      let _0x503a1b = _0x53c4cc ? _0x53c4cc.split(" ")[0].toLowerCase() : 'en';
      const _0x47d3b4 = googleTTS.getAudioUrl(_0x3095c8, {
        'lang': _0x503a1b,
        'slow': true,
        'host': "https://translate.google.com"
      });
      await _0x1a610d.bot.sendMessage(_0x1a610d.jid, {
        'audio': {
          'url': _0x47d3b4
        },
        'mimetype': "audio/mpeg",
        'ptt': true,
        'fileName': "Suhail-Md-tts.m4a"
      }, {
        'quoted': _0x1a610d
      });
    } catch (_0x56b7b9) {
      const _0x1a8598 = googleTTS.getAudioUrl(_0x3095c8, {
        'lang': 'en',
        'slow': true,
        'host': "https://translate.google.com"
      });
      await _0x1a610d.bot.sendMessage(_0x1a610d.jid, {
        'audio': {
          'url': _0x1a8598
        },
        'mimetype': "audio/mpeg",
        'ptt': true,
        'fileName': "Suhail-Md-tts.m4a"
      }, {
        'quoted': _0x1a610d
      });
    }
  } catch (_0x5dfc91) {
    return _0x1a610d.error(_0x5dfc91 + "\n\ncommand: tts", _0x5dfc91, false);
  }
});
smd({
  'pattern': "downmp4",
  'alias': ["mp4down", "mp4fromurl"],
  'desc': "download mp4 from url.",
  'category': "downloader",
  'use': "<url>",
  'filename': __filename
}, async (_0x4d14ac, _0x5e1ed5) => {
  try {
    let _0x5daca0 = ('' + (_0x5e1ed5 ? _0x5e1ed5 : _0x4d14ac.reply_text)).split(" ")[0].toLowerCase().trim();
    if (!_0x5daca0 || !_0x5daca0.toLowerCase().startsWith("http")) {
      return _0x4d14ac.reply("*_Give me Video Link, " + prefix + "downmp4 https://telegra.ph/file/d90855d13352c8aae3981.mp4_*");
    }
    var _0x422c10 = _0x5e1ed5.toLowerCase().includes("doc") ? "document" : "video";
    await _0x4d14ac.bot.sendMessage(_0x4d14ac.chat, {
      [_0x422c10]: {
        'url': _0x5daca0
      },
      'caption': "*HERE WE GO*",
      'contextInfo': {
        ...(await _0x4d14ac.bot.contextInfo(Config.botname, _0x4d14ac.senderName))
      }
    }, {
      'quoted': _0x4d14ac
    });
  } catch (_0x484b90) {
    await _0x4d14ac.error(_0x484b90 + "\n\ncommand : downmp4", _0x484b90, "*_Please, Give me valid video url!_*");
  }
});
smd({
  'pattern': "video",
  'desc': "Downloads video from yt.",
  'category': "downloader",
  'filename': __filename,
  'use': "<faded-Alan Walker>"
}, async (_0x27bb55, _0x2df109) => {
  let _0x5acb8a = _0x2df109 ? _0x2df109 : _0x27bb55.reply_text;
  var _0x84eee3 = _0x2df109.toLowerCase().includes("doc") ? "document" : "video";
  if (!_0x5acb8a) {
    return _0x27bb55.reply("*Use : " + prefix + "video Al Quran!*");
  }
  let _0x1d7e96 = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x2df109) || [];
  let _0xc44b5a = _0x1d7e96[0] || false;
  try {
    if (!_0xc44b5a) {
      let _0x51ec16 = await yts(_0x5acb8a);
      let _0xca4dd5 = _0x51ec16.videos[0];
      _0xc44b5a = _0xca4dd5.url;
      _0x1d7e96 = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0xc44b5a);
    }
  } catch {}
  try {
    let _0x463520 = await ytdl.getInfo(_0xc44b5a);
    let _0x307e92 = Math.floor(i.timestamp * 60);
    if (_0x307e92 >= 2000) {
      _0x84eee3 = "document";
    }
    let _0x1c3199 = _0x463520.videoDetails.title;
    let _0x1d802e = "./temp/" + _0x1d7e96[1] + ".mp4";
    const _0x17135b = ytdl(_0xc44b5a, {
      'filter': _0x5ea34f => _0x5ea34f.itag == 22 || _0x5ea34f.itag == 18
    }).pipe(fs.createWriteStream(_0x1d802e));
    await new Promise((_0x5af005, _0x4b3467) => {
      _0x17135b.on("error", _0x4b3467);
      _0x17135b.on("finish", _0x5af005);
    });
    var _0x331d48 = {
      ...(await _0x27bb55.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    let _0x40057e = {
      [_0x84eee3]: fs.readFileSync(_0x1d802e),
      'mimetype': "video/mp4",
      'fileName': _0x1c3199,
      'caption': Config.caption,
      'contextInfo': _0x331d48
    };
    await _0x27bb55.bot.sendMessage(_0x27bb55.jid, _0x40057e, {
      'quoted': _0x27bb55
    });
    try {
      fs.unlinkSync(_0x1d802e);
    } catch {}
    ;
  } catch (_0x1579db) {
    console.log("ytdl Download video error:", _0x1579db);
    try {
      let _0x186e17 = await yt.getInfo(_0x1d7e96[1]);
      if (_0x186e17.duration >= 2000) {
        _0x84eee3 = "document";
      }
      let _0x135386 = {
        'type': "video",
        'quality': _0x186e17.pref_Quality || "best",
        'format': "mp4"
      };
      let _0xb2bac7 = await yt.download(_0x1d7e96[1], _0x135386);
      var _0x331d48 = {
        ...(await _0x27bb55.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
      };
      let _0x342fa9 = _0x186e17.title || _0xb2bac7 || _0x1d7e96[1] || "Suhail MD -- YT Video";
      if (_0xb2bac7) {
        await _0x27bb55.bot.sendMessage(_0x27bb55.chat, {
          [_0x84eee3]: {
            'url': _0xb2bac7
          },
          'fileName': _0x342fa9,
          'caption': Config.caption,
          'mimetype': "video/mp4",
          'contextInfo': _0x331d48
        });
      } else {
        await _0x27bb55.send("Video not Found");
      }
      try {
        fs.unlinkSync('' + _0xb2bac7);
      } catch {}
    } catch (_0x29908c) {
      return _0x27bb55.error(_0x29908c + "\n\ncommand: video", _0x29908c, "*_Video not Found_*");
    }
  }
});
smd({
  'pattern': "video2",
  'desc': "Downloads video from yt.",
  'category': "downloader",
  'filename': __filename,
  'use': "<faded-Alan Walker>"
}, async (_0x4d7c6a, _0x3ab95d) => {
  let _0x2d8f4c = _0x3ab95d ? _0x3ab95d : _0x4d7c6a.reply_text;
  if (!_0x2d8f4c) {
    return _0x4d7c6a.reply("Example : " + prefix + "video2 surah rehman");
  }
  var _0x30a6e9 = _0x2d8f4c.toLowerCase().includes("doc") ? "document" : "video";
  let _0x14e4e9 = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x3ab95d) || [];
  let _0x327a78 = _0x14e4e9[0] || false;
  try {
    if (!_0x327a78) {
      let _0x4c6dfa = await yts(_0x2d8f4c);
      let _0x2d6c05 = _0x4c6dfa.videos[0];
      _0x327a78 = _0x2d6c05.url;
      _0x14e4e9 = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x327a78);
    }
  } catch {}
  try {
    let _0x15d0e4 = await yt.getInfo(_0x14e4e9[1]);
    let _0x1f8b5b = {
      'type': "video",
      'quality': _0x15d0e4.pref_Quality || "best",
      'format': "mp4"
    };
    if (_0x15d0e4.duration >= 2000) {
      _0x30a6e9 = "document";
    }
    let _0x5a764c = await yt.download(_0x14e4e9[1], _0x1f8b5b);
    let _0x2a1b9a = _0x15d0e4.title || _0x5a764c || _0x14e4e9[1];
    var _0x570a06 = {
      ...(await _0x4d7c6a.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    if (_0x5a764c) {
      await _0x4d7c6a.bot.sendMessage(_0x4d7c6a.chat, {
        [_0x30a6e9]: {
          'url': _0x5a764c
        },
        'fileName': _0x2a1b9a,
        'caption': Config.caption,
        'mimetype': "video/mp4",
        'contextInfo': _0x570a06
      });
    } else {
      await _0x4d7c6a.send("Video not Found");
    }
    try {
      fs.unlinkSync('' + _0x5a764c);
    } catch {}
  } catch (_0xfb8922) {
    return _0x4d7c6a.error(_0xfb8922 + "\n\ncommand: video", _0xfb8922, "*_Video not Found_*");
  }
});
smd({
  'pattern': "play",
  'alias': ["music"],
  'desc': "Sends info about the query(of youtube video/audio).",
  'category': "downloader",
  'filename': __filename,
  'use': "<faded-Alan walker.>"
}, async (_0xa4a511, _0x5be423) => {
  try {
    let _0x5ab4fd = _0x5be423 ? _0x5be423 : _0xa4a511.reply_text;
    var _0x2ce3e6 = _0x5ab4fd.toLowerCase().includes("doc") ? "document" : "audio";
    if (!_0x5ab4fd) {
      return _0xa4a511.reply('*' + prefix + "play back in black*");
    }
    let _0xfc94ef = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x5ab4fd) || [];
    let _0x2f187d = _0xfc94ef[0] || false;
    if (!_0x2f187d) {
      let _0x342581 = await yts(_0x5ab4fd);
      let _0x24b398 = _0x342581.videos[0];
      _0x2f187d = _0x24b398.url;
    }
    _0xfc94ef = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x2f187d) || [];
    let _0xc37d50 = await yt.getInfo(_0xfc94ef[1]);
    let _0x2470f2 = _0xc37d50.title || _0x9974c8 || _0xfc94ef[1];
    if (_0xc37d50 && _0xc37d50.duration >= 2000) {
      return await _0xa4a511.reply("*_Can't dowanload, file duration too big_*");
    }
    await _0xa4a511.send("_Downloading " + _0xc37d50.title + '?_');
    let _0x9974c8 = await yt.download(_0xfc94ef[1], {
      'type': "audio",
      'quality': "best"
    });
    var _0x4ff756 = {
      ...(await _0xa4a511.bot.contextInfo(Config.botname, "ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    if (_0x9974c8) {
      await _0xa4a511.bot.sendMessage(_0xa4a511.jid, {
        [_0x2ce3e6]: {
          'url': _0x9974c8
        },
        'fileName': _0x2470f2,
        'mimetype': "audio/mpeg",
        'contextInfo': _0x4ff756
      });
    } else {
      _0xa4a511.send("*_Video not Found_*");
    }
    try {
      fs.unlinkSync(_0x9974c8);
    } catch {}
  } catch (_0xe729d1) {
    return _0xa4a511.error(_0xe729d1 + "\n\ncommand: play", _0xe729d1, "*_Video not Found_*");
  }
});
smd({
  'pattern': "sound",
  'desc': "Downloads ringtone.",
  'category': "downloader",
  'filename': __filename,
  'use': "<Dowanload Tiktok Sounds>"
}, async (_0x4802c9, _0x5aee9d) => {
  try {
    if (!_0x5aee9d) {
      return _0x4802c9.reply("*Give A Number Example: " + prefix + "sound 5*");
    }
    const _0x21c090 = parseInt(_0x5aee9d);
    if (_0x21c090.toString() == "NaN" || _0x21c090 < 1 || _0x21c090 > 160) {
      return _0x4802c9.reply("*_❌ Give a number between 1 to 160_*");
    }
    let _0x1c7ce8 = "https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound" + _0x21c090.toString() + ".mp3";
    let _0x181b31 = await getBuffer(_0x1c7ce8);
    var _0x31e831 = {
      ...(await _0x4802c9.bot.contextInfo(Config.botname, "ᴛɪᴋᴛᴏᴋ ꜱᴏᴜɴᴅ " + _0x21c090))
    };
    let _0x13c62f = {
      'audio': _0x181b31,
      'fileName': "Suhail-Md tiktok Sound" + _0x21c090 + ".m4a",
      'mimetype': "audio/mpeg",
      'ptt': true,
      'contextInfo': _0x31e831
    };
    return _0x4802c9.bot.sendMessage(_0x4802c9.chat, _0x13c62f, {
      'quoted': _0x4802c9
    });
  } catch (_0x3ca23d) {
    return _0x4802c9.error(_0x3ca23d + "\n\ncommand: sound", _0x3ca23d, false);
  }
});
smd({
  'pattern': "tiktok",
  'alias': ['tt', "ttdl"],
  'desc': "Downloads Tiktok Videos Via Url.",
  'category': "downloader",
  'filename': __filename,
  'use': "<add tiktok url.>"
}, async (_0x2a04d9, _0x582913) => {
  try {
    const _0x5230b0 = _0x582913.toLowerCase().includes("doc") ? "document" : _0x582913.toLowerCase().includes("mp3") ? "audio" : "video";
    if (!_0x582913) {
      return await _0x2a04d9.reply("*Uhh Please, Provide me tiktok Video Url*\n*_Ex " + prefix + "tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*");
    }
    const _0x3c95a1 = _0x582913 ? _0x582913.split(" ")[0] : '';
    if (!/tiktok/.test(_0x3c95a1)) {
      return await _0x2a04d9.reply("*Uhh Please, Give me Valid Tiktok Video Url!*");
    }
    const _0x3138b0 = await fetch("https://api-smd.onrender.com/api/ttdl2?url=" + _0x3c95a1);
    const _0x323307 = await _0x3138b0.json();
    return _0x323307 && _0x323307.video && _0x323307.video.noWatermark ? await _0x2a04d9.send(_0x323307.video.noWatermark, {
      'caption': Config.caption
    }, _0x5230b0, _0x2a04d9) : await _0x2a04d9.reply("Error While Downloading Your Video");
  } catch (_0x8ef467) {
    return _0x2a04d9.error(_0x8ef467 + "\n\ncommand: tiktok", _0x8ef467);
  }
});
smd({
  'pattern': "ringtone",
  'desc': "Downloads ringtone.",
  'category': "downloader",
  'filename': __filename,
  'use': "<ringtone name>"
}, async (_0x5b2117, _0x2ac20c) => {
  try {
    if (!_0x2ac20c) {
      return _0x5b2117.reply("Example: " + prefix + "ringtone back in black");
    }
    const {
      ringtone: _0x1ee2fa
    } = require("../lib/scraper");
    let _0x4a6080 = await _0x1ee2fa(_0x2ac20c);
    var _0x94c5a4 = {
      ...(await _0x5b2117.bot.contextInfo(Config.botname, "ʀɪɴɢᴛᴏɴᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    let _0x453c3c = {
      'audio': {
        'url': _0x4a6080[0].audio
      },
      'caption': '*' + _0x4a6080[0].title + '*',
      'fileName': _0x4a6080[0].title + ".mp3",
      'mimetype': "audio/mpeg",
      'contextInfo': _0x94c5a4
    };
    return _0x5b2117.bot.sendMessage(_0x5b2117.jid, _0x453c3c, {
      'quoted': _0x5b2117
    });
  } catch (_0x13e0e4) {
    return _0x5b2117.error(_0x13e0e4 + "\n\ncommand: ringtone", _0x13e0e4, "*_Ringtone not found with given name!!_*");
  }
});
smd({
  'pattern': "pint",
  'alias': ["pinterest"],
  'desc': "Downloads image from pinterest.",
  'category': "downloader",
  'filename': __filename,
  'use': "<text|image name>"
}, async (_0x3cd9ea, _0x44cab9) => {
  try {
    if (!_0x44cab9) {
      return _0x3cd9ea.reply("What picture are you looking for?");
    }
    let _0x30e6a6 = (await pinterest(_0x44cab9)) || [];
    if (!_0x30e6a6 || !_0x30e6a6[0]) {
      return await _0x3cd9ea.send("*_No Result found!_*");
    }
    var _0x310cbb = {
      ...(await _0x3cd9ea.bot.contextInfo(Config.botname, "ᴘɪɴᴛᴇʀᴇꜱᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    let _0x215c7a = _0x30e6a6.length < 5 ? _0x30e6a6.length : 5;
    for (let _0x401fe1 = 0; _0x401fe1 < _0x215c7a; _0x401fe1++) {
      await _0x3cd9ea.bot.sendMessage(_0x3cd9ea.chat, {
        'image': {
          'url': _0x30e6a6[_0x401fe1]
        },
        'contextInfo': _0x310cbb
      });
    }
  } catch (_0xfc7a65) {
    return _0x3cd9ea.reply("Uhh Plese, Give me a Name. Ex .pint apple");
  }
});
smd({
  'pattern': "mediafire",
  'alias': ['mf', "mfire"],
  'desc': "Downloads media from Mediafire.",
  'category': "downloader",
  'filename': __filename,
  'use': "<url of mediafire>"
}, async (_0x1254cb, _0x309dc2) => {
  try {
    let _0x58d366 = _0x309dc2.includes("mediafire.com") ? _0x309dc2 : _0x1254cb.reply_text || '';
    if (!_0x58d366.includes("mediafire.com")) {
      return _0x1254cb.reply("*_Provide mediafire url, Use: " + prefix + "mf https://www.mediafire.com/file/i33wo2xvgvid05m/muezzaverse_2221749531_musicaldown.com.mp4/file!_*");
    }
    let _0x23c16c = _0x58d366.split(" ")[0];
    const _0x377291 = await mediafire(_0x23c16c);
    if (!_0x377291 || !_0x377291[0]) {
      return _0x1254cb.reply("could not found anything");
    }
    let _0x24af1b = "『 *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ* 』\n\n *Name* : " + _0x377291[0].nama + "\n *Size* :" + _0x377291[0].size + "\n *Mime* : " + _0x377291[0].mime + "\n \n\n" + Config.caption;
    _0x24af1b = await fancytext(_0x24af1b, 25);
    var _0x3c7c74 = {
      ...(await _0x1254cb.bot.contextInfo(Config.botname, "MEDIAFIRE"))
    };
    let _0xf46272 = {
      'document': {
        'url': _0x377291[0].link
      },
      'caption': _0x24af1b,
      'fileName': _0x377291[0].nama,
      'mimetype': _0x377291[0].mime,
      'contextInfo': _0x3c7c74
    };
    return await _0x1254cb.bot.sendMessage(_0x1254cb.chat, _0xf46272);
  } catch (_0x5cfcef) {
    return _0x1254cb.error(_0x5cfcef + "\n\ncommand: mediafire", _0x5cfcef, "*_File not found!!_*");
  }
});
smd({
  'pattern': "song",
  'alias': ["audio"],
  'desc': "Downloads audio from youtube.",
  'category': "downloader",
  'filename': __filename,
  'use': "<give text>"
}, async (_0x44b4e8, _0x1f5f41) => {
  try {
    if (!_0x1f5f41) {
      return await _0x44b4e8.reply("*_Give Me Search Query_*");
    }
    let _0x46ef95 = await yts(_0x1f5f41);
    let _0x629b8f = _0x46ef95.all[0];
    let _0x3cb626 = "\t *ᴍᴀꜱᴛᴇʀ-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*   \n\n*Title :* " + _0x629b8f.title + "\nUrl : " + _0x629b8f.url + "\n*Description :* " + _0x629b8f.timestamp + "\n*Views :* " + _0x629b8f.views + "\n*Uploaded :* " + _0x629b8f.ago + "\n*Author :* " + _0x629b8f.author.name + "\n\n\n_Reply 1 To Video_ Or _1 document_\n_Reply 2 To Audio_ Or _2 document_";
    let _0x17066e = await smdBuffer(_0x629b8f.thumbnail);
    var _0x3ad7b8 = {
      ...(await _0x44b4e8.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ", _0x17066e))
    };
    await _0x44b4e8.bot.sendMessage(_0x44b4e8.jid, {
      'image': _0x17066e,
      'caption': _0x3cb626,
      'contextInfo': _0x3ad7b8
    });
  } catch (_0x12565e) {
    return _0x44b4e8.error(_0x12565e + "\n\ncommand: mediafire", _0x12565e, "*_File not found!!_*");
  }
});
cmd({
  'pattern': "yts",
  'alias': ['yt', "ytsearch"],
  'desc': "Search Song From youtube",
  'category': "downloader",
  'filename': __filename,
  'use': "<Yt Search Query>"
}, async (_0x3e2027, _0x7909dd) => {
  try {
    if (!_0x7909dd) {
      return await _0x3e2027.reply("*_Give Me Search Query!_*");
    }
    let _0x4e5b80 = await yts(_0x7909dd);
    let _0x92ba9 = "*ᴍᴀꜱᴛᴇʀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ* \n*_______________________________* \n\n_Reply Any Number To Download._\n  _For Audio: 1 mp3._\n  _For Video: 1 video._\n  _For document: 1 document._\n\n_Results For : " + _0x7909dd + "_ \n\n";
    let _0x592aea = 1;
    for (let _0x2eea06 of _0x4e5b80.all) {
      _0x92ba9 += " \n*" + _0x592aea++ + " : " + _0x2eea06.title + (_0x2eea06.timestamp ? '(' + _0x2eea06.timestamp + ')' : '') + "*\n*Url : " + _0x2eea06.url + '*';
    }
    return await _0x3e2027.sendMessage(_0x3e2027.chat, {
      'image': {
        'url': _0x4e5b80.all[0].thumbnail
      },
      'caption': _0x92ba9
    }, {
      'quoted': _0x3e2027
    });
  } catch (_0x4d5945) {}
});
smd({
  'pattern': "ytmp4",
  'alias': ["ytv", "ytvid", "ytvideo"],
  'desc': "Downloads video from youtube.",
  'category': "downloader",
  'filename': __filename,
  'use': "<yt video url>"
}, async (_0x54ebaf, _0xb74d58) => {
  let _0x593709 = _0xb74d58 ? _0xb74d58 : _0x54ebaf.reply_text;
  var _0xf03b50 = _0x593709.toLowerCase().includes("doc") ? "document" : _0x593709.toLowerCase().includes("mp3") ? "audio" : "video";
  const _0x206841 = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x593709) || [];
  if (!_0x593709 || !_0x206841[0]) {
    return await _0x54ebaf.reply("*_provide youtube video url!_*");
  }
  try {
    let _0x5b650b = await ytdl.getInfo(_0x206841[0]);
    if (_0x5b650b.videoDetails.lengthSeconds >= 2000) {
      _0xf03b50 = "document";
    }
    let _0xfd0916 = _0x5b650b.videoDetails.title;
    let _0x5c2769 = "./temp/" + _0x206841[1] + ".mp4";
    const _0x312fef = ytdl(_0x206841[0], {
      'filter': _0xcd8aac => _0xcd8aac.itag == 22 || _0xcd8aac.itag == 18
    }).pipe(fs.createWriteStream(_0x5c2769));
    await new Promise((_0x3e2382, _0x35b514) => {
      _0x312fef.on("error", _0x35b514);
      _0x312fef.on("finish", _0x3e2382);
    });
    var _0x5b15fe = {
      ...(await _0x54ebaf.bot.contextInfo(Config.botname, "ʏᴛᴅʟ ᴠɪᴅᴇᴏ"))
    };
    let _0x3bac45 = {
      [_0xf03b50]: fs.readFileSync(_0x5c2769),
      'mimetype': "video/mp4",
      'fileName': _0xfd0916,
      'caption': "  *Here's Your Video*\n" + Config.caption,
      'contextInfo': _0x5b15fe
    };
    await _0x54ebaf.bot.sendMessage(_0x54ebaf.jid, _0x3bac45, {
      'quoted': _0x54ebaf
    });
    try {
      return await fs.unlinkSync(_0x5c2769);
    } catch {}
  } catch (_0x54a792) {
    console.log("here now,ytdl-core error: ", _0x54a792);
    try {
      let _0x3cea03 = await yt.getInfo(_0x206841[1]);
      let _0x471ed9 = {
        'type': "video",
        'quality': _0x3cea03.pref_Quality || "best",
        'format': "mp4"
      };
      if (_0x3cea03.duration >= 2000) {
        _0xf03b50 = "document";
      }
      let _0x187959 = await yt.download(_0x206841[1], _0x471ed9);
      var _0x5b15fe = {
        ...(await _0x54ebaf.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
      };
      let _0x4ed3b6 = _0x3cea03.title || _0x187959 || _0x206841[1];
      if (_0x187959) {
        await _0x54ebaf.bot.sendMessage(_0x54ebaf.chat, {
          [_0xf03b50]: {
            'url': _0x187959
          },
          'fileName': _0x4ed3b6,
          'mimetype': "video/mp4",
          'contextInfo': _0x5b15fe
        });
      } else {
        await _0x54ebaf.send("*_Video not Found_*");
      }
      try {
        fs.unlinkSync('' + _0x187959);
      } catch {}
      return;
    } catch (_0x17b912) {
      return _0x54ebaf.error(_0x17b912 + "\n\ncommand: ytmp4", _0x17b912, "*_Uhh dear, Video not Found!!_*");
    }
  }
});
smd({
  'pattern': "ytmp3",
  'alias': ["yta"],
  'desc': "Downloads audio by yt link.",
  'category': "downloader",
  'use': "<yt video url>"
}, async (_0x35ba57, _0x4a0209) => {
  let _0x38db68 = _0x4a0209 ? _0x4a0209 : _0x35ba57.reply_text;
  var _0x5f585a = _0x38db68.toLowerCase().includes("doc") ? "document" : "audio";
  const _0x5f1398 = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x38db68) || [];
  if (!_0x38db68 || !_0x5f1398[0]) {
    return await _0x35ba57.reply("*_Uhh please, Provide youtube video url!_*");
  }
  try {
    let _0x4d3e11 = await ytdl.getInfo(_0x5f1398[0]);
    if (_0x4d3e11.videoDetails.lengthSeconds >= 2000) {
      _0x5f585a = "document";
    }
    let _0x5eecfd = _0x4d3e11.videoDetails.title;
    let _0x2d197a = "./temp/" + _0x5f1398[1] + ".mp3";
    const _0x421702 = ytdl(_0x5f1398[0], {
      'filter': _0x464060 => _0x464060.audioBitrate == 160 || _0x464060.audioBitrate == 128
    }).pipe(fs.createWriteStream(_0x2d197a));
    await new Promise((_0x1f60af, _0x48b65a) => {
      _0x421702.on("error", _0x48b65a);
      _0x421702.on("finish", _0x1f60af);
    });
    var _0x5fd748 = {
      ...(await _0x35ba57.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
    };
    let _0x16b5ab = {
      [_0x5f585a]: fs.readFileSync(_0x2d197a),
      'mimetype': "audio/mpeg",
      'fileName': _0x5eecfd,
      'contextInfo': _0x5fd748
    };
    await _0x35ba57.bot.sendMessage(_0x35ba57.jid, _0x16b5ab, {
      'quoted': _0x35ba57
    });
    try {
      return await fs.unlinkSync(_0x2d197a);
    } catch {}
  } catch (_0x34dcdc) {
    console.log("here now,ytdl-core : ", _0x34dcdc);
    try {
      let _0x277087 = await yt.download(_0x5f1398[1], {
        'type': "audio",
        'quality': "best"
      });
      var _0x5fd748 = {
        ...(await _0x35ba57.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
      };
      if (_0x277087) {
        await _0x35ba57.bot.sendMessage(_0x35ba57.jid, {
          [_0x5f585a]: {
            'url': _0x277087
          },
          'mimetype': "audio/mpeg",
          'fileName': Config.caption,
          'contextInfo': _0x5fd748
        });
      } else {
        await _0x35ba57.send("*_audio not Found!_*");
      }
      try {
        fs.unlinkSync(_0x277087);
      } catch {}
    } catch (_0xad0c19) {
      await _0x35ba57.error(_0xad0c19 + "\n\ncommand: ytmp3", _0xad0c19, "*_Uhh dear, audio file not Found!!_*");
    }
  }
});
smd({
  'pattern': "ytdoc",
  'alias': ["ytd"],
  'desc': "Downloads audio by yt link as document.",
  'category': "downloader",
  'use': "<ytdoc video url>"
}, async (_0x75eab4, _0x57f930) => {
  try {
    let _0x3970e2 = _0x57f930 ? _0x57f930 : _0x75eab4.reply_text;
    const _0x19e8cf = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(_0x3970e2) || [];
    if (!_0x3970e2 || !_0x19e8cf[0]) {
      return await _0x75eab4.reply("❌Please provide me a url");
    }
    var _0x1074d1 = _0x19e8cf[1];
    var _0x534327 = false;
    try {
      let _0x4c2c80 = await ytdl.getInfo(_0x19e8cf[0]);
      _0x1074d1 = _0x4c2c80.videoDetails.title;
      let _0x272746 = "./temp/Suhail-Md " + _0x19e8cf[1] + ".mp3";
      const _0x39a63c = ytdl(_0x19e8cf[0], {
        'filter': _0x2b3081 => _0x2b3081.audioBitrate == 160 || _0x2b3081.audioBitrate == 128
      }).pipe(fs.createWriteStream(_0x272746));
      _0x534327 = _0x272746;
      await new Promise((_0x20f096, _0x4d8c09) => {
        _0x39a63c.on("error", _0x4d8c09);
        _0x39a63c.on("finish", _0x20f096);
      });
    } catch (_0x184338) {
      console.log("here now,ytdl-core : ", _0x184338);
      try {
        _0x534327 = await yt.download(_0x19e8cf[1], {
          'type': "audio",
          'quality': "best"
        });
      } catch (_0x4b9aee) {
        return await _0x75eab4.error(_0x4b9aee + "\n\ncommand: ytdoc", _0x4b9aee, "*_file not Found!!_*");
      }
    }
    if (!_0x534327) {
      return await _0x75eab4.send("*_Uhh dear, video not found_*");
    }
    var _0x16ad22 = {
      ...(await _0x75eab4.bot.contextInfo(Config.botname, "ʏᴛᴅᴏᴄ ᴍᴘ3 ʏᴏᴜᴛᴜʙᴇ"))
    };
    let _0x1b3300 = {
      'document': {
        'url': _0x534327
      },
      'mimetype': "audio/mpeg",
      'fileName': "Suhail-Md--" + _0x19e8cf[1] + ".mp3",
      'caption': Config.caption,
      'contextInfo': _0x16ad22
    };
    await _0x75eab4.bot.sendMessage(_0x75eab4.jid, _0x1b3300, {
      'quoted': _0x75eab4
    });
    try {
      return await fs.unlinkSync(_0x534327);
    } catch {}
  } catch (_0x2d1105) {
    await _0x75eab4.error(_0x2d1105 + "\n\ncommand: ytdoc", _0x2d1105, "*_audio file not Found!!_*");
  }
});
cmd({
  'on': "text"
}, async (_0x1d7e28, _0x5bfd66, {
  isCreator: _0x5e6923
}) => {
  if (_0x1d7e28.quoted && _0x1d7e28.text) {
    const _0x57c0e5 = _0x1d7e28.quoted.text.split("\n");
    if (_0x57c0e5[0].includes("ᴍᴀꜱᴛᴇʀ-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")) {
      const _0x27341b = _0x57c0e5.find(_0xf1e716 => _0xf1e716.startsWith("Url :"));
      let _0x2d428f = _0x27341b.replace("Url :", '').trim();
      try {
        await _0x1d7e28.sendMessage(_0x1d7e28.chat, {
          'react': {
            'text': '✨',
            'key': _0x1d7e28.key
          }
        });
        let _0x4094b3;
        if (_0x1d7e28.text.startsWith('1')) {
          let _0x1850ce = _0x5bfd66.toLowerCase().includes("doc") ? "document" : _0x5bfd66.toLowerCase().includes("mp3") ? "audio" : "video";
          _0x4094b3 = "./temp/ytsong.mp4";
          const _0x3ad7e0 = ytdl(_0x2d428f, {
            'filter': _0x13ee8f => _0x13ee8f.itag == 22 || _0x13ee8f.itag == 18
          }).pipe(fs.createWriteStream(_0x4094b3));
          await new Promise((_0x5d12bb, _0x42cdf2) => {
            _0x3ad7e0.on("error", _0x42cdf2);
            _0x3ad7e0.on("finish", _0x5d12bb);
          });
          await _0x1d7e28.sendMessage(_0x1d7e28.chat, {
            [_0x1850ce]: fs.readFileSync(_0x4094b3),
            'mimetype': _0x1850ce == "audio" ? "audio/mpeg" : "video/mp4",
            'fileName': Config.caption,
            'caption': Config.caption
          }, {
            'quoted': _0x1d7e28
          });
        } else {
          if (_0x1d7e28.text.startsWith('2')) {
            let _0x5d20cb = _0x5bfd66.toLowerCase().includes("doc") ? "document" : "audio";
            _0x4094b3 = "./temp/ytsong.mp3";
            const _0x5d8384 = ytdl(_0x2d428f, {
              'filter': _0x15cca0 => _0x15cca0.audioBitrate == 160 || _0x15cca0.audioBitrate == 128
            }).pipe(fs.createWriteStream(_0x4094b3));
            await new Promise((_0x43377e, _0x24fa12) => {
              _0x5d8384.on("error", _0x24fa12);
              _0x5d8384.on("finish", _0x43377e);
            });
            await _0x1d7e28.sendMessage(_0x1d7e28.chat, {
              [_0x5d20cb]: fs.readFileSync(_0x4094b3),
              'mimetype': "audio/mpeg",
              'fileName': Config.caption
            }, {
              'quoted': _0x1d7e28
            });
          }
        }
        try {
          return fs.unlinkSync(_0x4094b3);
        } catch (_0x99557c) {}
      } catch (_0x5106ae) {
        return await _0x1d7e28.reply("Error While Downloading Video : " + _0x5106ae);
      }
    } else {
      if (_0x57c0e5[0].includes("ᴍᴀꜱᴛᴇʀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ")) {
        let _0x35b05f = '*' + _0x1d7e28.text.split(" ")[0] + " : ";
        const _0x3ce525 = _0x57c0e5.find(_0x30b06c => _0x30b06c.startsWith(_0x35b05f));
        if (_0x3ce525) {
          try {
            let _0x12e991 = _0x3ce525.replace(_0x35b05f, '').split('*')[0].trim();
            const _0x2335bc = _0x57c0e5[_0x57c0e5.indexOf(_0x3ce525) + 1];
            const _0x2d252e = _0x2335bc.split('*')[1].replace("Url : ", '').trim();
            if (_0x2d252e.startsWith("http")) {
              await _0x1d7e28.sendMessage(_0x1d7e28.chat, {
                'react': {
                  'text': '✨',
                  'key': _0x1d7e28.key
                }
              });
              let _0x1191ab = _0x5bfd66.toLowerCase().includes("doc") ? "document" : _0x5bfd66.toLowerCase().includes("mp3") ? "audio" : "video";
              let _0x2fa757 = "./temp/Yts Download " + Math.floor(Math.random() * 10000) + ".mp4";
              const _0x4d71d3 = ytdl(_0x2d252e, {
                'filter': _0x168717 => _0x168717.itag == 22 || _0x168717.itag == 18
              }).pipe(fs.createWriteStream(_0x2fa757));
              await new Promise((_0x23b587, _0x504057) => {
                _0x4d71d3.on("error", _0x504057);
                _0x4d71d3.on("finish", _0x23b587);
              });
              await _0x1d7e28.sendMessage(_0x1d7e28.chat, {
                [_0x1191ab]: fs.readFileSync(_0x2fa757),
                'mimetype': _0x1191ab == "audio" ? "audio/mpeg" : "video/mp4",
                'fileName': '' + _0x12e991,
                'caption': _0x12e991 + " \n " + Config.caption
              }, {
                'quoted': _0x1d7e28
              });
              try {
                fs.unlink(_0x2fa757);
              } catch (_0x442377) {}
            }
          } catch (_0x3c82f5) {
            _0x1d7e28.error(_0x3c82f5 + "\n\nCommand yts Listener", _0x3c82f5, "*Video Not Found!*");
          }
        }
      } else {
        if (_0x57c0e5[0].includes("ᴍᴀꜱᴛᴇʀ-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ")) {
          let _0x41ebfb = '*' + _0x1d7e28.text.split(" ")[0] + " : ";
          const _0x2fc1e7 = _0x57c0e5.find(_0x3b273c => _0x3b273c.startsWith(_0x41ebfb));
          if (_0x2fc1e7) {
            try {
              const _0x13c1b0 = _0x57c0e5[_0x57c0e5.indexOf(_0x2fc1e7) + 1];
              const _0x4e6c96 = _0x13c1b0.split('*')[1].replace("Id : ", '').trim();
              await _0x1d7e28.sendMessage(_0x1d7e28.chat, {
                'react': {
                  'text': '✨',
                  'key': _0x1d7e28.key
                }
              });
              let _0xe8e49e = await download(_0x4e6c96);
              let _0x3f72ca = "*App Name :* " + _0xe8e49e.name;
              _0x3f72ca += "\n*App id        :* " + _0xe8e49e["package"];
              _0x3f72ca += "\n*Last Up       :* " + _0xe8e49e.lastup;
              _0x3f72ca += "\n*App Size     :* " + _0xe8e49e.size;
              _0x3f72ca += "\n               \n" + Config.caption;
              let _0x12ec72 = {
                'document': {
                  'url': _0xe8e49e.dllink
                },
                'mimetype': "application/vnd.android.package-archive",
                'fileName': _0xe8e49e.name + ".apk",
                'caption': _0x3f72ca
              };
              return await _0x1d7e28.sendMessage(_0x1d7e28.chat, _0x12ec72, {
                'quoted': _0x1d7e28
              });
            } catch (_0x5882de) {
              _0x1d7e28.reply("*_Can't Download, App Limit Exceed_*");
            }
          }
        }
      }
    }
  }
});
smd({
  'pattern': "playlist",
  'desc': "Downloads video from playlist.",
  'category': "downloader",
  'filename': __filename,
  'use': "<yt playlist url>"
}, async (_0x21ede6, _0x56c79f, {
  Void: _0x4b815f
}) => {
  try {
    var _0x100689 = _0x56c79f.toLowerCase().includes("doc") ? "document" : _0x56c79f.toLowerCase().includes("mp3") || _0x56c79f.toLowerCase().includes("audio") ? "audio" : "video";
    if (!_0x56c79f || !_0x56c79f.includes('=') || !/http/gi.test(_0x56c79f)) {
      return await _0x21ede6.reply("*Use Playlist URL, Like: " + prefix + "playlist https://www.youtube.com/playlist?list=PLZeei0S6_unh-jTeWsJI1mOI6snxeHn5c*");
    }
    let _0x8c0ca4 = _0x56c79f.split('=')[1].split(" ")[0];
    console.log(_0x8c0ca4);
    var _0x3a8978 = {
      'listId': _0x8c0ca4
    };
    yts(_0x3a8978, async function (_0xe6c267, _0x55ebba) {
      if (_0xe6c267) {
        throw _0xe6c267;
      }
      _0x21ede6.reply("This Process will take a bit time.");
      for (let _0x5a2b33 = 0; _0x5a2b33 < _0x55ebba.videos.length; _0x5a2b33++) {
        if (_0x55ebba.videos[_0x5a2b33].videoId === undefined) {
          continue;
        }
        let _0x3e9d9d = _0x55ebba.videos[_0x5a2b33].videoId;
        try {
          let _0x3bb13c = await ytdl.getInfo(_0x3e9d9d);
          if (_0x3bb13c.videoDetails.lengthSeconds >= 2000) {
            _0x100689 = "document";
          }
          let _0x326902 = _0x3bb13c.videoDetails.title;
          let _0x50fc42 = '' + Math.floor(Math.random() * 10000) + ".mp4";
          const _0x14961f = ytdl(_0x3e9d9d, {
            'filter': _0x52a091 => _0x52a091.itag == 22 || _0x52a091.itag == 18
          }).pipe(fs.createWriteStream("./temp/" + _0x50fc42));
          await new Promise((_0x3cf836, _0x517363) => {
            _0x14961f.on("error", _0x517363);
            _0x14961f.on("finish", _0x3cf836);
          });
          let _0x2dff8e = fs.statSync("./temp/" + _0x50fc42);
          let _0x1a698d = _0x2dff8e.size;
          let _0x449381 = _0x1a698d / 1048576;
          if (_0x449381 <= 400) {
            let _0x46e214 = {
              [_0x100689]: fs.readFileSync("./temp/" + _0x50fc42),
              'mimetype': _0x100689 == "audio" ? "audio/mpeg" : "video/mp4",
              'fileName': '' + _0x326902,
              'caption': _0x100689 == "document" ? '' : " ⿻ Title : " + _0x326902 + "\n ⿻ File Size : " + _0x449381 + " MB",
              'headerType': 0x4,
              'contextInfo': {
                'externalAdReply': {
                  'title': Config.botname,
                  'body': _0x21ede6.pushName,
                  'thumbnail': log0,
                  'renderLargerThumbnail': true,
                  'mediaType': 0x2,
                  'mediaUrl': gurl,
                  'sourceUrl': gurl
                }
              }
            };
            _0x4b815f.sendMessage(_0x21ede6.chat, _0x46e214, {
              'quoted': _0x21ede6
            });
          } else {
            _0x21ede6.reply("❌ File size bigger than 400mb.");
          }
          try {
            fs.unlinkSync("./temp/" + _0x50fc42);
          } catch (_0x394d19) {}
        } catch (_0x134dce) {
          console.log(_0x134dce);
        }
      }
    });
  } catch (_0x2bc51f) {
    console.log(_0x2bc51f);
  }
});
