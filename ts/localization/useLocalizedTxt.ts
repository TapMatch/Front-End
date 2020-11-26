import english from './strings/english.json';

type LocalizationObject = {
  [key: string]: string;
};
export default function useLocalizedTxt(): LocalizationObject {
  return english;
}
