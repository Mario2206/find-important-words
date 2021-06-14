const fs = require('fs')
const pathSystem = require('path')

class FileReader {

    _filePath;

    /**
     * 
     * @param {string} path 
     */
    setPath(path) {
        this._filePath = pathSystem.resolve( path )
    }

    /**
     * 
     * @param {Function} harvestFunction 
     */
    async startStream(harvestFunction) {
        return new Promise((resolve, reject) => {
            
            if(!this._filePath) return reject('No file path provided')

            const readable = fs.createReadStream(this._filePath, {encoding: 'utf-8'})

            readable.on('data', (chunk) => {
                harvestFunction(chunk)
            })

            readable.on('end', () => {
                readable.close()
                resolve()
            })

            readable.on('error', (e) => {
                reject(e)
            })
        })
    }


}

module.exports = FileReader