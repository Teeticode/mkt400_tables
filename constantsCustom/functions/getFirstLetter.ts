export default function getFirstLetter(
  word: string | null | undefined
): string {
  if (word) {
    if (word.length > 0) {
      return word[0];
    } else {
      return "";
    }
  } else {
    return "";
  }
}
