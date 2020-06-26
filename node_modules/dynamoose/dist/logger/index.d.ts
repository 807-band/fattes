declare const _default: {
    pause: () => void;
    resume: () => void;
    status: () => "active" | "paused";
    providers: {
        set: (provider: any) => void;
        clear: () => void;
        add: (provider: any) => void;
        delete: (id: string | string[]) => void;
        list: () => any[];
    };
};
export = _default;
