import crypto from "crypto";

const ENCRYPTION_KEY ="72f5be6837c5954158f3f5563abd964f264ccadf34b7e2786643da89269b2909";
const algorithm = "aes-256-cbc";

export class Crypto {
  private key: Buffer;
  private iv: Buffer;
  constructor() {
    this.key = Buffer.from(ENCRYPTION_KEY, "hex");
    this.iv = crypto.randomBytes(16);
  }

  public encrypt(text: string) {
    const cipher = crypto.createCipheriv(algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return {
      iv: this.iv.toString("hex"),
      encryptedData: encrypted,
    };
  }

  public decrypt(encryptedData: string, iv: string) {
    const decipher = crypto.createDecipheriv(
      algorithm,
      this.key,
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
