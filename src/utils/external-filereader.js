const fetch = require('node-fetch')


class ExternalFileReader {

    _url;

    /**
     * 
     * @param {string} url
     */
    setUri(url) {
        this._url = url
        return this
    }

    /**
     * 
     * @param {Function} harvestFunction 
     * @param {Function} onEnd
     * 
     * @returns {Promise<any>}
     */
    startStream(harvestFunction) {
        return new Promise((resolve, reject) => {
            fetch(this._url)
            .then(res => {
                res.body.on("data", (data) => {
                    harvestFunction(data.toString("utf8"))
                })

                res.body.on("close", resolve)

                res.body.on("error", reject)
            
            })
            .catch(reject)
        })
       
    }


}

module.exports = ExternalFileReader