export default function removeExtraSpaces(str) {

    return str.replace(/(\s{2,}|(?<!\w)\s+)/g, '');
}  