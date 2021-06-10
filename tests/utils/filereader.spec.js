const FileReader = require("../../src/utils/filereader")

describe("FileReader", () => {

    const filePath = "./tests/tools/text.txt"

    it("should start the stream when a path is provided", (done) => {

        const fileReader = new FileReader()
        fileReader.setPath(filePath)
        fileReader.startStream((value) => {
            expect(value).not.toBeUndefined()
            done()
        })

    })

    it("should throw an error in no path is provided",async () => {
        const fileReader = new FileReader()

        try {
            await fileReader.startStream(() => {} )
            expect(false).toBeTruthy()
        } catch(e) {
            expect(e).not.toBeUndefined()
        }
        
    })

    it("should close the stream when the file is fully parsed", (done) => {

        const fileReader = new FileReader()
        const fakeFunction = () => {}
        
        fileReader.setPath(filePath)

        fileReader.startStream(fakeFunction)
        .then(done)

    })

})