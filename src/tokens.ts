import { ISignal, Signal } from '@lumino/signaling';

export interface IRestartsModel {

  readonly changed: ISignal<this, string[]>;

  readonly clicked: Signal<this, number>;

  restarts: string[];
  threadId: number;
}
