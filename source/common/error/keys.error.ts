/**
 * Error keys for the Basalt helper.
 */
export const ErrorKeys = {
    ARRAY_KEYS_EMPTY: 'error.basalt-helper.data_empty_keys',
    DATA_MUST_BE_PLAIN_OBJECT: 'error.basalt-helper.data_must_be_plain_object',
    DATA_IS_NULL: 'error.basalt-helper.data_null',
    NO_ACCESS_FILE: 'error.basalt-helper.error_access_file',
    ERROR_ACCESS_FOLDER: 'error.basalt-helper.error_access_folder',
    ERROR_CALCULATE_HASH: 'error.basalt-helper.error_calculate_hash',
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
    ERROR_CREATE_FOLDER_STRUCTURE: 'error.basalt-helper.error_create_folder_structure',
    ERROR_READ_FILE: 'error.basalt-helper.error_read_file',
    ERROR_WRITE_FILE: 'error.basalt-helper.error_write_file',
    PASSWORD_EMPTY: 'error.basalt-helper.password_empty',
    PASSWORD_HASHING_FAILED: 'error.basalt-helper.password_hashing_failed',
    PASSWORD_VERIFICATION_FAILED: 'error.basalt-helper.password_verification_failed',
};