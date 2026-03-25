// Readable Stream -> use to read data from a source
// Writable Stream -> use to write data to a destination
// Duplex Stream -> use to read and write data
// transform Stream -> use to transform data while reading or writing -> zlib stream

const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { Transform } = require('stream');

class EncryptStream extends Transform {

    constructor(key, vector) {
        super();
        this.key = key;
        this.vector = vector;
    }

    _transform(chunk, encoding, callback) {
        const cipher = crypto.createCipheriv('aes-128-cbc', this.key, this.vector);
        const encrypted = cipher.update(chunk, encoding, 'base64') + cipher.final('base64');
        this.push(encrypted);
        callback();
    }
}

const key = crypto.randomBytes(16);
const vector = crypto.randomBytes(16);

const readStream = fs.createReadStream('./input.txt');

// new gzip stream
const gzipStream = zlib.createGzip();

const encryptStream = new EncryptStream(key, vector);

const writeStream = fs.createWriteStream('./output.txt.gz.encrypted');

// read -> compress -> encrypt -> write
readStream.pipe(gzipStream).pipe(encryptStream).pipe(writeStream);

console.log('Streaming -> Encrypt -> Compress -> Write');