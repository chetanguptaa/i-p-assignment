"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strongPasswordChecker = void 0;
// Function to check if a password is strong
function strongPasswordChecker(password) {
    // Check if password is already strong
    if (isStrong(password)) {
        return 0;
    }
    let missingTypes = getMissingTypes(password);
    let steps = 0;
    let replacements = 0;
    let deletions = 0;
    for (let i = 0; i < password.length; i++) {
        const currentChar = password[i];
        // Check for repeating characters
        if (i > 1 &&
            currentChar === password[i - 1] &&
            currentChar === password[i - 2]) {
            if (missingTypes > 0) {
                // Replace repeating characters with a character of a missing type
                password = replaceCharacter(password, i, getMissingTypeChar(password, i));
                replacements++;
                missingTypes--;
            }
            else {
                // Delete extra repeating characters
                password = deleteCharacter(password, i);
                deletions++;
            }
        }
    }
    const insertions = Math.max(missingTypes, password.length < 6 ? 6 - password.length : 0);
    // Calculate total steps required
    steps = insertions + deletions + Math.max(0, replacements - insertions);
    return steps;
}
exports.strongPasswordChecker = strongPasswordChecker;
// Helper function to check if a password is strong
function isStrong(password) {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    return (password.length >= 6 &&
        password.length <= 20 &&
        hasLowerCase &&
        hasUpperCase &&
        hasDigit);
}
// Helper function to get the missing types in a password
function getMissingTypes(password) {
    let missingTypes = 3;
    if (/[a-z]/.test(password))
        missingTypes--;
    if (/[A-Z]/.test(password))
        missingTypes--;
    if (/\d/.test(password))
        missingTypes--;
    return Math.max(0, missingTypes);
}
// Helper function to get a character of a missing type
function getMissingTypeChar(password, index) {
    if (!/[a-z]/.test(password))
        return "a";
    else if (!/[A-Z]/.test(password))
        return "A";
    else
        return "1";
}
// Helper function to replace a character at a specific index in a string
function replaceCharacter(str, index, char) {
    return str.slice(0, index) + char + str.slice(index + 1);
}
// Helper function to delete a character at a specific index in a string
function deleteCharacter(str, index) {
    return str.slice(0, index) + str.slice(index + 1);
}
