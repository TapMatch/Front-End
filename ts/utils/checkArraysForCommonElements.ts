export default function checkArraysForCommonElements(arr1: any, arr2: any) {
  return arr1.some((item: any) => arr2.includes(item));
}
