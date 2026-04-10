export interface CalculateRule {
  id: number;
  categoryId: number;
  categoryName: string;
  dailyBaseValue: number;
  dayBaseTime: number;
  nightlyBaseBonus: number;
  holidayBaseBonus: number;
  baseBonusHolidayNight: number;
  toleranceBaseBonus: number;
}
