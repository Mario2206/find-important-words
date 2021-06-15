const { FLAG_REGEXP } = require('../constants/regex');

class CliParser {
  _argv;
  _allowedToCall = false;

  /**
   *
   * @param {string[]} argv
   */
  setArgv(argv) {
    this._argv = this._manageArgv(argv.slice(2));
    this._allowedToCall = true;
  }

  /**
   * @returns {{flag: string, value: string}}
   */
  getArgv() {
    return this._argv;
  }

  /**
   *
   * @param {{name: string, withValue: boolean, optional?: boolean}[]} conditions
   * @param {Function} actionFunction
   * @returns {any | Promise<any>}
   */
  action(conditions, actionFunction) {
    if (this._conditionsAreFulfilled(conditions) && this._allowedToCall) {
      this._allowedToCall = false;
      return actionFunction(this._convertFlagsToParams(this._argv));
    }
  }

  /**
   *
   * @param {Function} actionFunction
   */
  defaultAction(actionFunction) {
    this._allowedToCall && actionFunction();
  }

  /**
   *
   * @param {string[]} argv
   *
   * @returns {{flag: string, value: string | undefined}[]}
   */
  _manageArgv(argv) {
    const parsedArgv = [];
    argv.forEach((arg, index) => {
      if (arg.match(FLAG_REGEXP)) {
        let flagValue = !argv[index + 1]?.match(FLAG_REGEXP) && argv[index + 1];
        parsedArgv.push({ flag: arg, value: flagValue });
      }
    });
    return parsedArgv;
  }

  /**
   *
   * @param {{flag: string, value: string | undefined}[]} argv
   *
   * @returns {Record<string, string>}
   */
  _convertFlagsToParams(argv) {
    const params = {};
    argv.forEach((arg) => {
      const flagProp = arg.flag
        .split('-')
        .filter((val) => val)
        .join();
      params[flagProp] = arg.value;
    });
    return params;
  }

  /**
   *
   * @param {{name: string, withValue: boolean, optional?: boolean}[]} conditions
   */
  _conditionsAreFulfilled(conditions) {
    return conditions.every(
      (condition) =>
        condition.optional ||
        this._argv.find(
          (arg) =>
            arg.flag === condition.name &&
            (condition.withValue ? arg.value : !arg.value),
        ),
    );
  }
}

module.exports = CliParser;
