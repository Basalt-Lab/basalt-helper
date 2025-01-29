/**
 * Core security key error is a list of errors in the security context.
 */
export const CORE_SECURITY_KEY_ERROR = {
    PASSWORD_EMPTY: ['basalt-helper.error.password_empty', 500],
    PASSWORD_HASHING_FAILED: ['basalt-helper.error.password_hashing_failed', 500],
    PASSWORD_VERIFICATION_FAILED: ['basalt-helper.error.password_verification_failed', 500]
} as const;