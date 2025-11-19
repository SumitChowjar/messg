/**
 * Messg - Messages via CSS3 animations
 * A lightweight notification library with support for multiple message types,
 * custom buttons, and configurable animations.
 */

/**
 * Message instance for creating and managing notifications
 */
declare class Message {
  /**
   * Create a new message notification
   * @param text - The message text to display
   * @param type - The message type (default, success, info, warning, error)
   * @param delay - Optional auto-hide delay in milliseconds
   */
  constructor(text: string, type?: MessageType, delay?: number);

  /**
   * Add a button to the message
   * @param name - Button label text
   * @param fn - Optional callback function when button is clicked
   * @returns The Message instance for chaining
   */
  button(name: string, fn?: (buttonName: string) => void): Message;

  /**
   * Set a callback for when the message is hidden
   * @param fn - Callback function to execute when message is hidden
   * @returns The Message instance for chaining
   */
  hide(fn: () => void): Message;

  /**
   * Hide the message
   */
  hide(): void;

  /**
   * Check if the message is hidden
   * @returns true if message is hidden, false otherwise
   */
  isHidden(): boolean;

  /**
   * Show the message
   * @returns The Message instance for chaining
   */
  show(): Message;

  /**
   * Animation speed in milliseconds
   * @default 250
   */
  static speed: number;

  /**
   * Position of messages on screen
   * @default 'top'
   */
  static position: MessagePosition;

  /**
   * Enable/disable message flow (stacking)
   * @default true
   */
  static flow: boolean;

  /**
   * Maximum number of messages to display
   * @default null (unlimited)
   */
  static max: number | null;

  /**
   * Global delay for all messages in milliseconds
   * @default null
   */
  static delay: number | null;

  /**
   * Close all messages in the flow
   */
  static clean(): void;

  /**
   * Reposition all messages
   */
  static reposition(): void;
}

/**
 * Message type options
 */
type MessageType = 'default' | 'success' | 'info' | 'warning' | 'error';

/**
 * Message position options
 */
type MessagePosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';

/**
 * Create a default message
 * @param text - The message text
 * @param delay - Optional auto-hide delay in milliseconds
 * @returns Message instance
 */
declare function messg(text: string, delay?: number): Message;

/**
 * Create a success message
 * @param text - The message text
 * @param delay - Optional auto-hide delay in milliseconds
 * @returns Message instance
 */
declare function success(text: string, delay?: number): Message;

/**
 * Create an info message
 * @param text - The message text
 * @param delay - Optional auto-hide delay in milliseconds
 * @returns Message instance
 */
declare function info(text: string, delay?: number): Message;

/**
 * Create a warning message
 * @param text - The message text
 * @param delay - Optional auto-hide delay in milliseconds
 * @returns Message instance
 */
declare function warning(text: string, delay?: number): Message;

/**
 * Create an error message
 * @param text - The message text
 * @param delay - Optional auto-hide delay in milliseconds
 * @returns Message instance
 */
declare function error(text: string, delay?: number): Message;

export default messg;
export { Message, success, info, warning, error };
export type { MessageType, MessagePosition };

