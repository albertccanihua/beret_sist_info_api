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
        return object.hasOwnProperty(key) && object[key] != '';
    }

    /**
     * Capitalize first letter of word
     * 
     * @param word 
     * @returns 
     */
    static capitalizeFirstLetter(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}