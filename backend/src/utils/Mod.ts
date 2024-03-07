export class Mod {
  static MINUS_TWO_THRESHOLD = 8;
  static MINUS_ONE_THRESHOLD = 10;
  static ZERO_THRESHOLD = 12;
  static PLUS_ONE_THRESHOLD = 15;
  static PLUS_TWO_THRESHOLD = 18;

  public static getModByAttrValue(attrValue: number) {
    if (attrValue <= this.MINUS_TWO_THRESHOLD) return -2;
    if (attrValue <= this.MINUS_ONE_THRESHOLD) return -1;
    if (attrValue <= this.ZERO_THRESHOLD) return 0;
    if (attrValue <= this.PLUS_ONE_THRESHOLD) return 1;
    if (attrValue <= this.PLUS_TWO_THRESHOLD) return 2;
    return 3;
  }
}
