export function screamCaseToCamelCase(screamCase: string) {
    const words = screamCase.split("_");

    const camelCaseWords = words.map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    });

    const camelCase = camelCaseWords.join("");

    return camelCase;
}

export function screamCaseToPascalCase(screamCase: string) {
    const words = screamCase.split("_");

    const camelCaseWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    const camelCase = camelCaseWords.join("");

    return camelCase;
}
