# Changelog

## v1.13.3-canary-20250418-9c22f53

[compare changes](https://github.com/Basalt-Lab/basalt-helper/compare/v1.13.2...v1.13.3-canary-20250418-9c22f53)

### 🧹 Refactors

- **🧹:** [Refactor TypedEventEmitter methods for better type safety] - Updated event handling methods in TypedEventEmitter to accept rest parameters for payloads. - Changed example payload types from `string` to `[string]` for better clarity on expected argument structure. - Ensured all relevant methods (`emit`, `on`, `once`, `addListener`, `removeListener`, `off`, `listeners`, `rawListeners`, `prependListener`, `prependOnceListener`) reflect this change for consistency. ([85762e5](https://github.com/Basalt-Lab/basalt-helper/commit/85762e5))

### 🧪 Tests

- **🧪:** [Update TypedEventEmitter tests for payload types] Refactored the test cases for the TypedEventEmitter to use tuple types for event payloads instead of single types. This change enhances type safety and aligns the tests with the intended usage of the TypedEventEmitter. ([50ee468](https://github.com/Basalt-Lab/basalt-helper/commit/50ee468))

### ❤️ Contributors

- Ruby <necrelox@proton.me>