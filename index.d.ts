type Event<P> = ((data: P) => void) & [((data: P) => void)[]];

export declare const event: <P = void>() => Event<P>;
export declare const listen: <P>(event: Event<P>, listener: (data: P) => void) => (() => void);
