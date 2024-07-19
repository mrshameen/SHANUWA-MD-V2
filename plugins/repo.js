const {
  smd,
  sleep
} = require("../lib");
smd({
  'cmdname': "repo",
  'react': "🐱‍👤",
  'type': "fun",
  'info': "genaral",
  'filename': __filename
}, async _0x1684bd => {
  const _0x41fa5a = ["⚖ `Founder` ```https://github.com/mrshameen```", "⚖ `Repo` ```https://github.com/mrshameen/SHANUWA-MD-V2```"];
  let _0xd82fba;
  for (const _0x19e2c1 of _0x41fa5a) {
    _0xd82fba = await _0x1684bd.send(_0xd82fba || _0x19e2c1);
    await sleep(1000);
    _0xd82fba = await _0x1684bd.edit(_0xd82fba, _0x19e2c1);
  }
});
