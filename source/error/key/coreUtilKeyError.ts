/**
 * Core util key error is a list of errors in the util context.
 */
export const CORE_UTIL_KEY_ERROR = {
    /**
     * Interpolation :
     * - name: The name of the class.
     */
    CLASS_CONSTRUCTOR_ALREADY_REGISTERED: ['basalt-helper.error.class_constructor_already_registered', 500],
    /**
     * Interpolation :
     * - name: The name of the class.
     */
    CLASS_CONSTRUCTOR_NOT_REGISTERED: ['basalt-helper.error.class_constructor_not_registered', 500]
} as const;