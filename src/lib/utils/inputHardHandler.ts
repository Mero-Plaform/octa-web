type CallbackParams = {
  curValue: string;
  prevValue: string;
  event: InputEvent & { target: HTMLInputElement; };
};

export type ConstructorParams = {
  checker: (value: string) => boolean;
  prevValue?: string;
  resolveCallback?: (data: CallbackParams) => void;
  rejectCallback?: (data: CallbackParams) => void;
};

export class InputHardHandler {
  prevValue: NonNullable<ConstructorParams["prevValue"]>;
  checker: ConstructorParams["checker"];
  resolveCallback?: ConstructorParams["resolveCallback"];
  rejectCallback?: ConstructorParams["rejectCallback"];

  constructor(config: ConstructorParams) {
    this.prevValue = config.prevValue || "";
    this.checker = config.checker;
    this.resolveCallback = config.resolveCallback;
    this.rejectCallback = config.rejectCallback;
  }

  handleEvent(event: CallbackParams["event"]) {
    const curValue = String(event.target.value);
    const isValidCurValue = this.checker(curValue);

    if (isValidCurValue) {
      this.onResolveInput(curValue, event);
    } else {
      this.onRejectInput(curValue, event);
    }
  }

  onResolveInput(curValue: string, event: CallbackParams["event"]) {
    this.updatePrevValue(curValue);
    this.resolveCallback?.({
      event,
      curValue,
      prevValue: this.prevValue,
    });
  }

  onRejectInput(curValue: string, event: CallbackParams["event"]) {
    const curCaretPos = event.target.selectionStart || 0;
    this.restore(event.target, curValue, curCaretPos);
    this.rejectCallback?.({
      event,
      curValue,
      prevValue: this.prevValue,
    });
  }

  restore(elem: HTMLInputElement, curValue: string, curCaretPos: number) {
    this.restorePrevValue(elem);
    this.restorePrevCaretPos(elem, curValue, curCaretPos);
  }

  restorePrevValue(elem: HTMLInputElement) {
    elem.value = this.prevValue;
  }

  restorePrevCaretPos(elem: HTMLInputElement, curValue: string, curCaretPos: number) {
    const curValueLength = curValue.length;
    const prevCaretPos = curCaretPos - (curValueLength - this.prevValue.length);
    elem.setSelectionRange(prevCaretPos, prevCaretPos);
  }

  updatePrevValue(value: string) {
    this.prevValue = value;
  }

  getPrevValue(): string {
    return this.prevValue;
  }
};
