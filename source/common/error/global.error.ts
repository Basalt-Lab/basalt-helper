/**
 * Global errors is a list of errors that can be used in the whole application.
 */
export const GLOBAL_ERRORS: Record<string, [string, number]> = {
    DATA_MUST_BE_OBJECT: ['error.basalt-helper.data_must_be_object', 500],
    DATA_IS_NULL: ['error.basalt-helper.data_is_null', 500],
    /**
     * Interpolation :
     * - name: The name of the class.
     */
    CLASS_CONSTRUCTOR_ALREADY_REGISTERED: ['error.basalt-helper.class_constructor_already_registered', 500],
    /**
     * Interpolation :
     * - name: The name of the class.
     */
    CLASS_CONSTRUCTOR_NOT_REGISTERED: ['error.basalt-helper.class_constructor_not_registered', 500],
    PASSWORD_EMPTY: ['error.basalt-helper.password_empty', 500],
    PASSWORD_HASHING_FAILED: ['error.basalt-helper.password_hashing_failed', 500],
    PASSWORD_VERIFICATION_FAILED: ['error.basalt-helper.password_verification_failed', 500]
};