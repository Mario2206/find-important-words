const { isValidHttpUrl } = require("../../src/utils/url")

describe('URL helpers', () => {

    describe('isValidHttpUrl', () => {

        it("should return true if the url is valid", () => {

            const validUrl = "http://valid.com"

            const res = isValidHttpUrl(validUrl)

            expect(res).toBeTruthy()

        })

        it("should return false it the url isn't valid", () => {
            const invalidUrl = "invalid"

            const res = isValidHttpUrl(invalidUrl)

            expect(res).toBeFalsy()
        })

    })

})