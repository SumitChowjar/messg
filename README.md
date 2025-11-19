# messg

> 🎉 Lightweight toast message (notification) library with CSS3 animations

[![npm version](https://img.shields.io/npm/v/messg.svg)](https://www.npmjs.com/package/messg)
[![npm downloads](https://img.shields.io/npm/dm/messg.svg)](https://www.npmjs.com/package/messg)
[![license](https://img.shields.io/npm/l/messg.svg)](LICENSE)
[![Node.js version](https://img.shields.io/node/v/messg.svg)](https://nodejs.org/)

**Note**: This is a maintained fork of the original [messg](https://github.com/andrepolischuk/messg) package, which is now maintained by [Sumit Chowjar](https://github.com/SumitChowjar).

## 📚 Table of Contents

- [Features](#-features)
- [Install](#-install)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
- [API Reference](#-api-reference)
- [Options](#-options)
- [Browser Support](#-browser-support)
- [TypeScript](#-typescript)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🎨 **5 Message Types** - default, success, info, warning, error
- ⚡ **Lightweight** - Only ~3.4kB minified
- 🎭 **CSS3 Animations** - Smooth fade in/out transitions
- 🔘 **Custom Buttons** - Add interactive buttons with callbacks
- 📍 **Flexible Positioning** - 6 different position options
- 🔄 **Message Flow** - Stack messages with configurable limits
- ⏱️ **Auto-hide** - Optional auto-dismiss with delay
- 📱 **Responsive** - Works on mobile and desktop
- 🔤 **TypeScript Support** - Full type definitions included
- 🎯 **Zero Dependencies** - Pure JavaScript

## 📦 Install

```sh
npm install messg
```

Or with yarn:

```sh
yarn add messg
```

## 🚀 Quick Start

```js
import messg from 'messg';

// Simple message
messg('Hello World!');

// Success message with button
messg
  .success('Awesome!')
  .button('Ok');

// Warning with callback
messg
  .warning('Are you sure?')
  .button('Yes', () => console.log('Confirmed'))
  .button('No', () => console.log('Cancelled'));
```

## 📖 Usage Examples

### Basic Messages

```js
import messg from 'messg';

// Default message
messg('This is a message');

// Success message
messg.success('Operation completed!');

// Info message
messg.info('Here is some information');

// Warning message
messg.warning('Please be careful');

// Error message
messg.error('Something went wrong!');
```

### Auto-hide Messages

```js
// Auto-hide after 2 seconds
messg.success('Saved successfully!', 2000);

// Global auto-hide for all messages
messg.Message.delay = 3000;
messg('This will auto-hide in 3 seconds');
```

### Message Chaining

```js
messg
  .warning('Confirm action')
  .button('Confirm', () => {
    messg.success('Action confirmed!');
  })
  .button('Cancel', () => {
    messg.info('Action cancelled');
  })
  .hide(() => {
    console.log('Message was dismissed');
  });
```

### Multiple Messages

```js
// Show multiple messages with flow
messg.success('Message 1');
setTimeout(() => messg.info('Message 2'), 300);
setTimeout(() => messg.warning('Message 3'), 600);

// Clear all messages
messg.Message.clean();
```

## 🔧 API Reference

### messg(text[, type, delay])

Create a `Message` instance.

#### Parameters

- **text** `string` - The message text to display
- **type** `string` (optional) - Message type: `'default'`, `'success'`, `'info'`, `'warning'`, `'error'`
  - Default: `'default'`
- **delay** `number` (optional) - Auto-hide timeout in milliseconds
  - Default: `null` (no auto-hide)

#### Returns

`Message` - Message instance for method chaining

### Helper Methods

#### messg.success(text[, delay])
#### messg.info(text[, delay])
#### messg.warning(text[, delay])
#### messg.error(text[, delay])

Convenience methods for creating typed messages.

```js
messg.success('Operation successful!');
messg.info('Information message', 2000);
messg.warning('Warning message');
messg.error('Error occurred!', 3000);
```

### Instance Methods

#### .button(name[, fn])

Add an interactive button to the message.

- **name** `string` - Button label text
- **fn** `function` (optional) - Callback function when button is clicked
  - If no callback provided, button closes the message

Returns: `Message` - For method chaining

```js
// Button with callback
messg
  .warning('Confirm deletion?')
  .button('Delete', () => {
    console.log('Item deleted');
  })
  .button('Cancel', () => {
    console.log('Cancelled');
  });

// Simple close button
messg
  .success('Task completed')
  .button('Ok');
```

**Note**: If no buttons are added, clicking the message will close it.

#### .hide([fn])

Set a callback for when the message is hidden, or hide the message immediately.

- **fn** `function` (optional) - Callback to execute when message is hidden

Returns: `Message` - For method chaining (when called with callback)

```js
messg
  .info('Processing...')
  .hide(() => {
    console.log('Message was dismissed');
  });
```

#### .isHidden()

Check if the message is currently hidden.

Returns: `boolean`

```js
const msg = messg('Hello');
console.log(msg.isHidden()); // false
msg.hide();
console.log(msg.isHidden()); // true
```

#### .show()

Show the message (if hidden).

Returns: `Message` - For method chaining

```js
const msg = messg('Hello');
msg.hide();
msg.show(); // Show again
```

### Static Methods

#### messg.Message.clean()

Close all messages in the flow.

```js
messg.success('Message 1');
messg.info('Message 2');
messg.Message.clean(); // Close all
```

#### messg.Message.reposition()

Manually reposition all messages. Usually called automatically.

```js
messg.Message.reposition();
```

## ⚙️ Options

Configure global message behavior using static properties on `messg.Message`:

### messg.Message.speed

Animation speed in milliseconds.

- Type: `number`
- Default: `250`

```js
messg.Message.speed = 500; // Slower animations
messg('This message animates slowly');
```

### messg.Message.position

Position where messages appear on screen.

- Type: `string`
- Default: `'top'`
- Options: `'top'`, `'top-left'`, `'top-right'`, `'bottom'`, `'bottom-left'`, `'bottom-right'`

```js
messg.Message.position = 'bottom-right';
messg.success('Message in bottom-right corner');
```

### messg.Message.flow

Enable/disable message stacking (flow).

- Type: `boolean`
- Default: `true`

```js
messg.Message.flow = false; // Messages won't stack
messg('Message 1');
messg('Message 2'); // Replaces Message 1
```

### messg.Message.max

Maximum number of messages to display simultaneously.

- Type: `number | null`
- Default: `null` (unlimited)

```js
messg.Message.max = 3; // Show max 3 messages
messg('Message 1');
messg('Message 2');
messg('Message 3');
messg('Message 4'); // Message 1 will be removed
```

### messg.Message.delay

Global auto-hide delay for all messages in milliseconds.

- Type: `number | null`
- Default: `null` (no auto-hide)

```js
messg.Message.delay = 2000; // All messages auto-hide after 2 seconds
messg.success('This will auto-hide');
messg.info('This will also auto-hide');
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+ (with polyfills)

Requires CSS3 support for animations.

## 🔷 TypeScript

Full TypeScript support with type definitions included.

```typescript
import messg, { Message, MessageType, MessagePosition } from 'messg';

// Type-safe message creation
const msg: Message = messg.success('Hello!');

// Type-safe options
const position: MessagePosition = 'top-right';
messg.Message.position = position;

// Type-safe message types
const type: MessageType = 'warning';
messg(type, 'Be careful!');
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

## 📄 License

MIT © [Sumit Chowjar](https://github.com/SumitChowjar)

Based on initial work by [Andrey Polischuk](https://github.com/andrepolischuk)

See [LICENSE](LICENSE) for details.
