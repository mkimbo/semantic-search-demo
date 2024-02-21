import converter from "number-to-words";

export default (num: number): string => {
  return converter.toWords(num).toString();
};
