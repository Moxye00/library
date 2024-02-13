import { User } from "./user";

export class AuthUser{
    constructor(
    public accessToken: string,
    public refreshToken: string,
    public user: User,
    public expirationDate: Date,
    ){}
    
    get token() {
      if (!this.expirationDate || new Date() > this.expirationDate) {
        return null;
      }
      return this.accessToken;
    }
}