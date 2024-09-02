import { ExifTool } from "exiftool-vendored";

const DEFAULT_TIMEOUT_MS = 10 * 1000;

const ERRORS = {
  CLOSED: "Tool closed",
  FILEPATH_REQUIRED: "File path required.",
};

/**
 * @typedef {Object} WriteTaskResult
 * @property {Number} created Number of files created
 * @property {Number} updated Number of files updated
 * @property {Number} unchanged Number of files that
 * did not need change
 * @property {String[]} warnings like "nothing to do"
 * or "Error: nothing to write"
 */

/**
 * @typedef {Object} Options
 * @property {Number} taskTimeoutMillis defaults to 10 seconds
 * @property {Boolean} geolocation Enable geolocation features defaults to false
 * @property {Boolean} overwriteOriginal overwrite original file defaults to false
 */

// @class
class ExifPilot {
  /**
   * Create a new ExifPilot instance
   * @param {Options} opts Exif tool options
   */
  constructor(
    opts = {
      taskTimeoutMillis: DEFAULT_TIMEOUT_MS,
      geolocation: false,
      overwriteOriginal: false,
    },
  ) {
    const { taskTimeoutMillis, geolocation } = opts;
    // Replace "overWriteOriginal" option with writeArgs
    if ("overwriteOriginal" in opts && opts.overwriteOriginal) {
      const writeArgs =
        opts.writeArgs && Array.isArray(opts.writeArgs)
          ? opts.writeArgs
          : null;
      const args = ["-overwrite_original"];
      opts.writeArgs = writeArgs ? writeArgs.concat(args) : args;
      delete opts["overwriteOriginal"];
    }
    this._opts = opts;
    this._tool = new ExifTool(opts);
  }

  /**
   * Read file metadata
   * @param {String} filePath the file path
   * @returns file metadata
   */
  async read(filePath) {
    assertToolActive.call(this);
    validateFilePath.call(this, filePath);

    return await this._tool.read(filePath);
  }

  /**
   * Write metadata to file
   * @param {String} filePath the file path
   * @param {Object} metadata file metadata
   * @param {String} metadata.AllDates shortcut for writing the "common EXIF date/time tags":
   * 'DateTimeOriginal', 'CreateDate', and 'ModifyDate' tags.
   * @returns {WriteTaskResult} the write operation result {@link WriteTaskResult}
   */
  async write(filePath, metadata) {
    assertToolActive.call(this);
    validateFilePath.call(this, filePath);

    return await this._tool.write(filePath, metadata);
  }

  /**
   * Shut down running child process. No subsequent requests
   * will be accepted.
   */
  async end() {
    if (this.ended) {
      return;
    }
    await this._tool.end();
  }

  /**
   * Restart the exif tool with the previously passed
   * options.
   */
  async restart() {
    if (!this.ended) {
      await this._tool.end();
    }
    this._tool = new ExifTool(this._opts);
  }

  /**
   * Strip file of all metadata tags. Some tags like
   * stat information and image dimensions, are intrinsic
   * to the file and will continue to exist if you re-read
   * the file.
   * @param {String} filePath file path
   * @param {String[]} retain tags to retain/keep
   * @returns {WriteTaskResult} write operation results
   */
  async strip(filePath, retain = []) {
    assertToolActive.call(this);
    validateFilePath.call(this, filePath);

    return await this._tool.deleteAllTags(filePath, {
      retain,
      ...this._opts,
    });
  }

  get ended() {
    return this._tool.ended;
  }
}

/**
 * Checks if the file path is falsy.
 * @param {String} filePath file path
 */
function validateFilePath(filePath) {
  if (!filePath) {
    throw new Error(ERRORS.FILEPATH_REQUIRED);
  }
}

/**
 * Assert if tool is still active, otherwise throw error.
 */
function assertToolActive() {
  if (this.ended) {
    throw new Error("Tool closed.");
  }
}

export default ExifPilot;
