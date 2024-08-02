type Props = {
  number?: any;
};

export default function MaskCard(props: Props) {
  const { number } = props;
  const arr: any = number?.split("");
  const newArr = [];
  for (let i = 0; i < arr?.length; i++) {
    if (i <= 13) {
      if (i % 5 === 0) {
        arr[i] = " ";
        newArr.push(arr[i]);
      } else {
        arr[i] = "*";
        newArr.push(arr[i]);
      }
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr.join("");
}
