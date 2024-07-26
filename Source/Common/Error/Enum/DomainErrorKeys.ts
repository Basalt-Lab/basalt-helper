/**
 * DomainErrorKeys is an enum that contains the error codes for the Service layer
 */
export enum DomainErrorKeys {
    PASSWORD_EMPTY = 'error.domain.service.security.basalt_password.password_empty',
    PASSWORD_HASHING_FAILED = 'error.domain.service.security.basalt_password.password_hashing_failed',
    PASSWORD_VERIFICATION_FAILED = 'error.domain.service.security.basalt_password.password_verification_failed',
    DATA_NULL = 'error.domain.service.data.basalt_data.data_null',
    DATA_MUST_BE_PLAIN_OBJECT = 'error.domain.service.data.basalt_data.data_must_be_plain_object',
    DATA_EMPTY_KEYS = 'error.domain.service.data.basalt_data.data_empty_keys',
    ERROR_CLASS_CONSTRUCTOR_ALREADY_REGISTERED = 'error.domain.service.class_constructor_already_registered',
    ERROR_CLASS_CONSTRUCTOR_NOT_REGISTERED = 'error.domain.service.class_constructor_not_registered',
}
