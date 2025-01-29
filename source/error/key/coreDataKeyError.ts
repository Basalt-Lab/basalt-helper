/**
 * Core data key error is a list of errors in the data context.
 */
export const CORE_DATA_KEY_ERROR = {
    DATA_MUST_BE_OBJECT: ['basalt-helper.error.data_must_be_object', 500],
    DATA_IS_NULL: ['basalt-helper.error.data_is_null', 500]
} as const;