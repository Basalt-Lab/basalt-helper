/**
 * ServiceErrorKeys is an enum that contains the error codes for the Service layer
 */
export enum ServiceErrorKeys {
    PASSWORD_EMPTY = 'error.domain.service.security.basaltPassword.passwordEmpty',
    PASSWORD_HASHING_FAILED = 'error.domain.service.security.basaltPassword.passwordHashingFailed',
    PASSWORD_VERIFICATION_FAILED = 'error.domain.service.security.basaltPassword.passwordVerificationFailed',
    DATA_NULL = 'error.domain.service.data.basaltData.dataNull',
    DATA_MUST_BE_PLAIN_OBJECT = 'error.domain.service.data.basaltData.dataMustBePlainObject',
    DATA_EMPTY_KEYS = 'error.domain.service.data.basaltData.dataEmptyKeys',
}
