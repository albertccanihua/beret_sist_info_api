export class GeneralHelper {

    // Validations
    // =================================

    /**
     * Validate if exists a property in object and if this is not empty
     *
     * @param object
     * @param key
     */
    static existsAndNotEmpty(object: any, key: any): boolean {
        return object.hasOwnProperty(key) && object.key !== "";
    }
}