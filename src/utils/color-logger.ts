/**
 * The `ColorLogger` class provides methods for logging messages to the console
 * with CSS styles for colors, separators, and logging markers for function
 * start and end events. It can also log additional data alongside messages.
 *
 * Works both in Node.js (using ANSI codes) and browser environments (using CSS styles).
 */
class ColorLogger {
  /**
   * A dictionary of CSS styles for different colors (used in browsers).
   * This is used to apply colors to console logs in browser environments.
   */
  private colors: { [key: string]: string } = {
    blue: "color: blue",
    green: "color: green",
    red: "color: red",
    yellow: "color: yellow",
    magenta: "color: magenta",
    bgBlue: "background-color: blue; color: white",
    bgGreen: "background-color: green; color: white",
    bgRed: "background-color: red; color: white",
    reset: "color: inherit",
  };

  /**
   * Logs a message to the console with the specified color (CSS in browser, ANSI in terminal).
   * Optionally, additional data can be provided to log alongside the message.
   *
   * @param color - The color key for the log message (e.g., "blue", "red").
   * @param message - The message to log to the console.
   * @param data - Optional. Additional data to log with the message.
   */
  log(color: string, message: string, data?: any): void {
    const style = this.colors[color] || this.colors.reset;
    if (data !== undefined) {
      console.log(`%c${message}`, style, data);
    } else {
      console.log(`%c${message}`, style);
    }
  }

  /**
   * Logs a separator line to the console for improved readability.
   * The separator consists of equal signs.
   */
  separator(): void {
    console.log(
      "%c==============================================",
      "color: grey",
    );
  }

  /**
   * Logs the start of a function execution with a formatted message.
   * It adds a separator before and after the log message for clarity.
   *
   * @param functionName - The name of the function being logged.
   * @param fileName - Optional. The name of the file where the function is located.
   */
  start(functionName: string, fileName?: string): void {
    this.separator();
    const location = fileName ? ` (${fileName})` : "";
    this.log("blue", `==== START: ${functionName}${location} ====`);
    this.separator();
  }

  /**
   * Logs the end of a function execution with a formatted message.
   * It adds a separator before and after the log message for clarity.
   *
   * @param functionName - The name of the function being logged.
   * @param fileName - Optional. The name of the file where the function is located.
   */
  end(functionName: string, fileName?: string): void {
    this.separator();
    const location = fileName ? ` (${fileName})` : "";
    this.log("blue", `==== END: ${functionName}${location} ====`);
    this.separator();
  }
}

// Create an instance of ColorLogger for usage
const colorLogger = new ColorLogger();

export default colorLogger;
