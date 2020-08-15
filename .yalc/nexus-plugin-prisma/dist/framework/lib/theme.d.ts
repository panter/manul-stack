export interface Theme {
    comment: (str: string) => string;
    variable?: (str: string) => string;
    string?: (str: string) => string;
    function?: (str: string) => string;
    keyword?: (str: string) => string;
    boolean?: (str: string) => string;
    number?: (str: string) => string;
    operator?: (str: string) => string;
    punctuation?: (str: string) => string;
    directive?: (str: string) => string;
    entity?: (str: string) => string;
    value?: (str: string) => string;
}
export declare const orange: any;
export declare const darkBrightBlue: any;
export declare const blue: any;
export declare const brightBlue: any;
export declare const identity: (str: any) => any;
export declare const theme: Theme;
//# sourceMappingURL=theme.d.ts.map