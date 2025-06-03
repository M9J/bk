export interface ILambda {
  prompt: string;
  action: Function;
  CONFIG_ACTION_DELAY?: number;
}
