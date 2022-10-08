import bcrypt from 'bcryptjs';
import { config } from '../config';

export default class HashDriver {
    public static generateHash(arg: string): string {
        let salt = bcrypt.genSaltSync(config.appConfig.hash.salt);
        let hash = bcrypt.hashSync(arg, salt);
        return hash;
    }
    public static compareHash(arg: string, hash: string) {
        return bcrypt.compareSync(arg, hash);
    }
}