import bcrypt from "bcryptjs";

const pwd = process.argv[2];
if (!pwd) {
  console.error('Usage: npx tsx scripts/admin-password-hash.ts "YourPassword"');
  process.exit(1);
}

const hash = bcrypt.hashSync(pwd, 12);
const b64 = Buffer.from(hash, "utf8").toString("base64");
console.log(`ADMIN_PASSWORD_HASH='${hash}'`);
console.log(`ADMIN_PASSWORD_HASH_B64=${b64}`);
console.log("");
console.log("Prefer ADMIN_PASSWORD_HASH_B64 in .env (no $ characters). Remove or unset the other variable.");
