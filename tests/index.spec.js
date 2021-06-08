const app = require("../src/app")
const Logger = require("../src/utils/logger")

jest.mock("../src/utils/logger")

describe("App setup",() => {

    it("should start if the text argument is provided", () => {
        process.argv = ["--text", "a text example"]
        app()
        expect(Logger.log).toHaveBeenCalled()
    })

    it("should display an error message if the text argument is missing", () => {
        process.argv = []
        app()
        expect(Logger.error).toHaveBeenCalled()
    })

})