// Dialog reducer for managing confirmation dialog state
export interface DialogReducerState {
  open: boolean;
  data: Record<any, any>;
}

export interface DialogReducerAction {
  type: 'OPEN' | 'CLOSE' | 'SET_FIELD';
  payload?: Record<any, any>;
  field?: string;
  value?: any;
}

export const dialogReducer = (
  state: DialogReducerState,
  action: DialogReducerAction,
): DialogReducerState => {
  switch (action.type) {
    case 'OPEN':
      return { open: true, data: action.payload || {} }; // Set data when opening
    case 'CLOSE':
      return { open: false, data: {} }; // Clear data when closing
    case 'SET_FIELD': {
      return {
        ...state,
        data: {
          ...state.data,
          [action.field!]: action.value, // Update specific field in data
        },
      };
    }
    default:
      return state;
  }
};
