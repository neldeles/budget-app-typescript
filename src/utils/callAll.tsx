interface ICallBack<Params extends any[]> {
  (...args: Params): void;
}

export function callAll<Params extends any[]>(
  ...fns: Array<ICallBack<Params> | undefined>
) {
  return (...args: Params) => {
    fns.forEach((fn) => typeof fn === "function" && fn(...args));
  };
}
