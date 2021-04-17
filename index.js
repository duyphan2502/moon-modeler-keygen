const { app } = require('electron');
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const password = 'mmM0t3k';
const fs = require('fs');

function encrypt(text) {
  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function saveLicense(content) {
  const fileName = `${app.getPath('userData')}/dts.asar.sys`;
  const encryptedContent = encrypt(JSON.stringify(content));
  fs.writeFileSync(fileName, encryptedContent);
}

const generate = ({ key, email, createdAt }) => {
  const licData = { licType: 'commercial', key, purchase: { email, created_at: createdAt } };
  saveLicense(licData, true);
  console.log('ok');
  process.exit(0);
};

generate({ key: 'some key', email: 'example@email.com', createdAt: 'some creation time' });