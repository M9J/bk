export interface ILambda {
  prompt?: string;
  action?: Function;
  result?: string | number | boolean | null | undefined;
}
