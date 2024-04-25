class OperationStatus {
    static get SUCCESS() {
        return 1;
    }
    static get FAILURE() {
        return 2;
    }
}

/**
 * Classe com todos os códigos de erro das operações
 */
class OperationErrors {
    static get PATIENT_NOT_REGISTERED() {
        return 1;
    }
    static get PATIENT_ALREADY_REGISTERED() {
        return 2;
    }
    static get INVALID_PATIENT_DOCUMENT() {
        return 3;
    }
    static get INVALID_PATIENT_NAME() {
        return 4;
    }
    static get INVALID_PATIENT_BIRTHDATE() {
        return 5;
    }
    static get ALREADY_SCHEDULED() {
        return 6;
    }
    static get SCHEDULE_CONFLICT() {
        return 7;
    }
    static get SCHEDULE_NOT_REGISTERED() {
        return 8;
    }
    static get SCHEDULE_DATE_IN_THE_PAST() {
        return 9;
    }
    static get SCHEDULE_INITIAL_DATE_AFTER_END_DATE() {
        return 10;
    }
    static get SCHEDULE_INITIAL_TIME_INCORRECT() {
        return 11;
    }
    static get SCHEDULE_END_TIME_INCORRECT() {
        return 12;
    }
    static get SCHEDULE_OUTSIDE_OPENING_HOURS() {
        return 13;
    }
    static get SCHEDULE_NOT_BELONG_PATIENT() {
        return 14;
    }
    static get SCHEDULE_DATE_INCORRECT(){
        return 15
    }
}

module.exports = {OperationErrors, OperationStatus}
