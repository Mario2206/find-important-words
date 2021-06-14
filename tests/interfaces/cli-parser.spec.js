const CliParser = require('../../src/interfaces/cli-parser')

describe("Interfaces", () => {

    let cliParser;

    beforeEach(() => {
        cliParser = new CliParser()
    })

    describe("CliParser", () => {

        it("should correctly parse the environnement args", () => {

            const argv = ['node', 'src/index', '--text', "little text"]
            const conditionFlags = [{flag: '--text', value: "little text"}]
            
            cliParser.setArgv(argv)

            expect(cliParser.getArgv()).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(conditionFlags[0])
                ])
            )

        })

        it("should start an action function  when the provided condition is fulfilled", () => {
            const argv = ['node', 'src/index', '--text', "little text"]
            const fakeFunction = jest.fn()
            const conditionFlags = [{name: '--text', withValue: true}]

            cliParser.setArgv(argv)
            cliParser.action(conditionFlags, fakeFunction)

            expect(fakeFunction).toHaveBeenCalled()

        })

        it("shouldn't start an action function  function if the provided condition aren't fulfilled", () => {
            const argv = ['node', 'src/index', '--text', "little text"]
            const fakeFunction = jest.fn()
            const conditionFlags = [{name: '--fake', withValue: true}]

            cliParser.setArgv(argv)
            cliParser.action(conditionFlags, fakeFunction)

            expect(fakeFunction).not.toHaveBeenCalled()

        })

        it("shouldn't start an action function even if the provided condition is fulfilled if an action has already been called", () => {
            const argv = ['node', 'src/index', '--text', "little text"]
            const fakeFunction = jest.fn()
            const fakeFunctionShouldNotBeenCalled = jest.fn()
            const conditionFlags = [{name: '--text', withValue: true}]

            cliParser.setArgv(argv)
            cliParser.action(conditionFlags, fakeFunction)
            cliParser.action(conditionFlags, fakeFunctionShouldNotBeenCalled)

            expect(fakeFunction).toHaveBeenCalled()
            expect(fakeFunctionShouldNotBeenCalled).not.toHaveBeenCalled()

        })

        it("it should pass the flags to the action function", () => {
            const argv = ['node', 'src/index', '--text', "little text"]
            const fakeFunction = jest.fn()
            const conditionFlags = [{name: '--text', withValue: true}]
            const expectedFlagArgs = {text: 'little text'}


            cliParser.setArgv(argv)
            cliParser.action(conditionFlags, fakeFunction)

            expect(fakeFunction).toHaveBeenCalled()
            expect(fakeFunction).toHaveBeenCalledWith(expectedFlagArgs)
        })

        it("should start a default function if no condition is fulfilled", () => {
            const argv = ['node', 'src/index', '--text', "little text"]
            const defaultFakeFunction = jest.fn()
            const wrongConditionFlags = [{name: '--fake', withValue: true}]


            cliParser.setArgv(argv)
            cliParser.action(wrongConditionFlags, null)
            cliParser.defaultAction(defaultFakeFunction)

            expect(defaultFakeFunction).toHaveBeenCalled()
        })

        it("should wait the resolution of async action function", async () => {
            const argv = ['node', 'src/index', '--text', "little text"]
            let varTest = null
            const asyncFunction = () => new Promise(reslove => {
                setTimeout(() => {
                    varTest = "test"
                    reslove()
                },50)
            })
            const conditionFlags = [{name: '--text', withValue: true}]


            cliParser.setArgv(argv)
            await cliParser.action(conditionFlags, asyncFunction)
            
            expect(varTest).not.toBeNull()

        })

    })

})