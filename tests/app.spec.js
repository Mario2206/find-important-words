const app = require("../src/app")
const Logger = require("../src/utils/logger")

jest.mock("../src/utils/logger")

describe('App', () => {

    describe("with --text flag for parsing text",() => {

        it("should start if the text argument is provided", async () => {
            process.argv = ["node", "src/index","--text", "a text example"]
            const expectedResult = "a : 1\ntext : 1\nexample : 1\n"
            await app()
            expect(Logger.log).toHaveBeenCalled()
            expect(Logger.log).toHaveBeenCalledWith(expectedResult)
            expect(Logger.error).not.toHaveBeenCalled()
        })
    
        it("should display an error message if the text argument is missing", async () => {
            process.argv = []
            await app()
            expect(Logger.error).toHaveBeenCalled()
            expect(Logger.log).not.toHaveBeenCalled()
        })

    })

    describe("with --file flag for parsing a file", () => {

        it("should start if the file argument is provided", async () => {
            process.argv = ["node", "src/index","--file", "./tests/tools/text.txt"]
            await app()
            expect(Logger.error).not.toHaveBeenCalled()
            expect(Logger.log).toHaveBeenCalled()
        })

        


    })



})
