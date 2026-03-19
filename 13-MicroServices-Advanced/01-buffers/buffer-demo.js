// objects -> handle binary data
// file system -> read/write files
// Crypto -> hash, encrypt, decrypt
//image processing

const buffOne = Buffer.alloc(4);
buffOne.write('test');
console.log(buffOne);

const buffFromStream = Buffer.from('test');
console.log(buffFromStream);

const bufferFromArray = Buffer.from([1, 2, 3]);
console.log(bufferFromArray);