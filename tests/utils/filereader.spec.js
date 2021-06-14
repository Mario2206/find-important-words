const ExternalFileReader = require("../../src/utils/external-filereader")
const FileReader = require("../../src/utils/filereader")

describe("FileReader", () => {

    describe("Local Read", () => {
        const filePath = "./tests/tools/text.txt"

        it("should start the stream when a path is provided", (done) => {

            const fileReader = new FileReader()
            fileReader
            .setPath(filePath)
            .startStream((value) => {
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

    describe("External read", () => {
        const testUrl = "https://www.wikipedia.org/" 

        it("should start the stream when an url is provided", (done) => {
            const fileReader = new ExternalFileReader()
            fileReader
            .setUri(testUrl)
            .startStream(value => {
                expect(value).not.toBeUndefined()
            })
            .then(done)
        })

        it("should throw an error if the ressource is not found", async () => {

            const fakeUrl = "fake"  
            const fakeFunction = jest.fn()
            const fileReader = new ExternalFileReader()

            let expectedError = null

            try {
                await fileReader
                .setUri(fakeUrl)
                .startStream(fakeFunction)
            }
            catch(e) {
                expectedError = e
            }

            expect(expectedError).not.toBeNull()
            expect(fakeFunction).not.toHaveBeenCalled()
            
        })

    })

})