/**
 * Error keys for the Basalt helper.
 */
export const ErrorKeys = {
    DATA_MUST_BE_PLAIN_OBJECT: 'error.basalt-helper.data_must_be_plain_object',
    DATA_IS_NULL: 'error.basalt-helper.data_null',
    /**
     * Interpolation :
     * - name: The name of the class.
     */
    CLASS_CONSTRUCTOR_ALREADY_REGISTERED: 'error.basalt-helper.class_constructor_already_registered',
    /**
     * Interpolation :
     * - name: The name of the class.
     */ 
    CLASS_CONSTRUCTOR_NOT_REGISTERED: 'error.basalt-helper.class_constructor_not_registered',
    PASSWORD_EMPTY: 'error.basalt-helper.password_empty',
    PASSWORD_HASHING_FAILED: 'error.basalt-helper.password_hashing_failed',
    PASSWORD_VERIFICATION_FAILED: 'error.basalt-helper.password_verification_failed',
};