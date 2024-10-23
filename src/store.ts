import fs from "node:fs";
import { Crypto } from "./crypto";

export class Store extends Crypto {
  private filePath: string;
  constructor() {
    super();
    this.filePath = `${__dirname}/token.json`;
  }
  public storeToken(token: string) {
    const encrypted = this.encrypt(token);
    fs.writeFileSync(this.filePath, JSON.stringify(encrypted));
  }

  public retrieveToken() {
    try {
      const encryptedData = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      return this.decrypt(encryptedData.encryptedData, encryptedData.iv)
    } catch (error) {
      return null;
    }
  }
}
