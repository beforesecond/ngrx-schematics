export interface State {
    data: any | null;
    isLoading: boolean;
    error: string;
}

export const initialState: State = {
    data: null,
    isLoading: false,
    error: null
}
