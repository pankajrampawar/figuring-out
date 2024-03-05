export function adjustWord(word) {
    let adjustedWord = word.replace(/^\s+/, '');

    if (/^[a-zA-Z]/.test(adjustedWord)) {
        return adjustedWord;
    } else {
        adjustedWord = adjustedWord.replace(/^[^a-zA-Z]+/, '');
        return adjustedWord;
    }
}
