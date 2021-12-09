const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2021", "First Block", null);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let savageCoin = new Blockchain();
savageCoin.addBlock(new Block(1, "09/01/2021", { amount: 400 }));
savageCoin.addBlock(new Block(2, "10/01/2021", { amount: 100 }));
savageCoin.addBlock(new Block(3, "11/01/2021", { amount: 300 }));


// console.log(JSON.stringify(savageCoin, null, 4));
console.log('Is valid -> ' + savageCoin.isChainValid());
savageCoin.chain[1].data = { amount: 600 }
console.log('Is valid -> ' + savageCoin.isChainValid());