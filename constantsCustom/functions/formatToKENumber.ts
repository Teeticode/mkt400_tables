export function formatToKENumber(number: string): string {
  const numberStr = number.toString();

  if (numberStr.startsWith("254")) {
    return numberStr;
  } else if (numberStr.startsWith("0") && numberStr.length === 10) {
    return `254${numberStr.slice(1)}`;
  } else {
    return numberStr;
  }
}

export function remove254(number: string) {
  const numberStr = number.toString();
  if (numberStr.startsWith("254")) {
    let arr = numberStr.split("");
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i > 2) {
        newArr.push(arr[i]);
      }
    }
    newArr.unshift(0);
    return newArr.join("");
  } else {
    return numberStr;
  }
}
export function add254(str: string) {
  const numberStr = str.toString();
  if (numberStr.startsWith("0")) {
    return `254${numberStr.slice(1)}`;
  } else {
    return numberStr;
  }
}
