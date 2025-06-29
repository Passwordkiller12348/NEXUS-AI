




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1BqM3VzYXBOVmF2QUIrSWdFSEY3L0h4Y0xTWVBwUnAzV1RLS1VEQnQyOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlY1UkRYL2pTV0R0YnhqR3d1V213QjNLb2JmdXFOYkM2dmJ1Zm1JVmJXTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQmRBQkNzZ0FOdmFET2Fha0piL3o1Z2g4bSt2dzVGOGxNc2cwd3NyZEVnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUZzJiU3dYZjZ0bEJBeExxMWI5cWUzZENUMjlEZ0dkZEExZlBsVUhxSENrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJQVWpLMnFkTUJWd3RjZlNCaVZLYTc2ajgvVGRmU2pkZjNDNDFKdmdqV009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5TcnVrdWRLRUZUdW93RXNGb0hhc2dVVkhYMXhjdFFsZVFqM3E4Q2x1bWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK01ONEJGL0hlQTRtYUdJeW0wQm9Zd0N0SVF5WlFROEJ2ZTVSdFVyM1Nrcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWHhtUEZlZlVmOW1tUnp3SXdodnJ6bjkxUWtzMG1GYXNPamJmQTVPbU5GRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNPb3JpbkdEVjRKc1AvS3prTFlua1Zxd3BmTGc0cEJHWnRzUnFFeU8zaTF1ZlVrYWJYN2FIMytwVFh2cW9xWGlNcnBDUkFVYlJqVzY1SndGeDA5REN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI3LCJhZHZTZWNyZXRLZXkiOiJib2pqYnc3L0JYQWV5QmllY3N6MEcyanJNUnBZdElMQ0M3QlBRd1c4Z3JFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU0MDE5MDk2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBM0JBQjFEQzU1ODcyRUYwMThDRjNDOTdDMTY5NzRDOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMTgzNzczfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1NDAxOTA5NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTZEQ0Y5OEY2QzNCMEE3NEZFODk5NTM4MjNFRDg5NTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTE4Mzc3NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiQlI5WFBaQ0siLCJtZSI6eyJpZCI6IjIzMzU0MDE5MDk2Mzo5MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJJdCdzIFBsZW50eSIsImxpZCI6IjMzMDg2MzUwOTc0OTo5MUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xETXl2Y0JFSWJqZzhNR0dBa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik1jU2cvT3EyTno5Z0I4amFnSXlmZWZVOVhwSFd5MmYra3hENm1nVkhpV009IiwiYWNjb3VudFNpZ25hdHVyZSI6InI2NlJMenVyY0JHVFlDSEhpWlFobWlMMW5ta083L1FQL2M1NlhVaEdKKzdvU1prclc1QjIwbjFXQlAyR3dIdThmYzNEbkxCU0o2SFVMYlJRNE91V0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJzRWtuK3RxdjVDanNIWmg2ZWU0Ynl5WlFaM2ZyQ3lpWnQ5U1crN3cyVVFEK040QVVNc3p2dlpjWWdmSG40alhyL2NKUjZVM3BWYUpHbUZRTmYxR1lCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU0MDE5MDk2Mzo5MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUSEVvUHpxdGpjL1lBZkkyb0NNbjNuMVBWNlIxc3RuL3BNUStwb0ZSNGxqIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTExODM3NjQsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFESnEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254799056874",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Pkdriller01",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
