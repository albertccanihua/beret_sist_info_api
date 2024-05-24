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
        if (object[key] === undefined || object[key] == 'undefined') return false;
        return object.hasOwnProperty(key) && object[key] != '';
    }

    static existsBoolean(object: any, key: any): boolean {
        if (object.hasOwnProperty(key)) {
            if (typeof object[key] == 'number') {
                if ([0, 1].includes(object[key])) return true;
            }
        }

        return false;
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