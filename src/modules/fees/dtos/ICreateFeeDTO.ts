export default interface ICreateFeeDTO {
  percentageAmount: number;
  isDefault: boolean;
  startDate?: Date;
  endDate?: Date;
}
