export default function Truncate(str: string, maxlength: number) {
  if (str && maxlength) {
    return str?.length > maxlength ? str?.slice(0, maxlength - 1) + "…" : str;
  }
}
