export class Experience {
  static AGE_WHEN_EXPERIENCE_STARTS_COUNTING = 7;
  static EXPERIENCE_MULTIPLIER = Math.pow(22, 1.45);

  static calculateExperience(age: number) {
    return this.minZero(
      Math.floor((age - this.AGE_WHEN_EXPERIENCE_STARTS_COUNTING) * this.EXPERIENCE_MULTIPLIER),
    );
  }

  static minZero(value: number) {
    return Math.max(value, 0);
  }
}
