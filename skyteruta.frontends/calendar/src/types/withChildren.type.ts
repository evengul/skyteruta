export type WithChildren<T extends Record<string, unknown> = {}> = T & { children: JSX.Element | JSX.Element[] };
