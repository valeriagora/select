export const delayReject = <TResolved, TReason = any>(delayMs: number) => {
    return (reason: TReason) =>
        new Promise<TResolved>((resolve, reject) => {
            setTimeout(reject.bind(null, reason), delayMs);
        });
};

export const retry = <TReturn>(action: () => Promise<TReturn>, maxRetries = 5, delayMs = 1000) => {
    let promise = action();
    for (let idx = 0; idx < maxRetries; idx++) {
        promise = promise.catch(action).catch(delayReject(delayMs));
    }
    return promise;
};
export const sleep = (ms: number) => {
    return new Promise((resolve: (value: any) => void) => {
        setTimeout(resolve, ms);
    });
};
