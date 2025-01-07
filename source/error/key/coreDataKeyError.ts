/**
 * Core data key error is a list of errors in the data context.
 */
export const CORE_DATA_KEY_ERROR: Record<string, [string, number]> = {
    DATA_MUST_BE_OBJECT: ['error.basalt-helper.data_must_be_object', 500],
    DATA_IS_NULL: ['error.basalt-helper.data_is_null', 500]
} as const;