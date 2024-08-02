type Props = {
  number?: string;
};
export default function MaskNumber(props: Props) {
  const { number } = props;
  const arr: any = number?.split("");
  const newArr = [];
  for (let i = 0; i < arr?.length; i++) {
    if (i <= 3) {
      newArr.push(arr[i]);
    } else {
      arr[i] = "*";
      newArr.push(arr[i]);
    }
  }
  return newArr.join("");
}
