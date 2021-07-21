import { ISignal, Signal } from '@lumino/signaling';

import { IRestartsModel } from './tokens';


export class RestartsModel implements IRestartsModel {

  private _restarts: string[] = [];
  private _threadId: number = 1;
  private _changed = new Signal<this, string[]>(this);
  private _clicked = new Signal<this, number>(this);

  get changed(): ISignal<this, string[]> {
    return this._changed;
  }

  get clicked(): Signal<this, number> {
    return this._clicked;
  }

  get restarts(): string[] {
    return this._restarts;
  }

  set restarts(restarts: string[]) {
    this._restarts = restarts;
    this._changed.emit(restarts);
  }

  get threadId(): number {
    return this._threadId;
  }

  set threadId(threadId: number) {
    this._threadId = threadId;
  }
}
