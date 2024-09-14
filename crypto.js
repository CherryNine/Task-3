import crypto from 'crypto';

export class KeyGenerator {
    generateKey() {
        return crypto.randomBytes(32);
        
    }
}

export class HMACGenerator {
    computeHMAC(key, move) {
        return crypto.createHmac('sha256', key.toString('hex')).update(move).digest('hex');
    }
}
