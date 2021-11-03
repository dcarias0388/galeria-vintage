import { ActionTypes } from "./../actions/actionTypes";

export function users(state = {}, action) {
  switch (action.type) {
    //GET ALL
    case ActionTypes.GETALL_REQUEST:
      return {
        loading: true,
      };
    case ActionTypes.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case ActionTypes.GETALL_FAILURE:
      return {
        error: action.error,
      };

    //UPDATE
    case ActionTypes.UPDATE_REQUEST:
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.newUser.id ? { ...user, updating: true } : user
        ),
      };

    case ActionTypes.UPDATE_SUCCESS:
      let itemsCopy = [...state.items];

      let newState = itemsCopy.filter((user) => user.id !== action.newUser.id);
      console.log("esto es el action" + JSON.stringify(action.newUser));
      newState.push(action.newUser);

      return {
        items: newState,
      };

    case ActionTypes.UPDATE_FAILURE:
      return {
        error: action.error,
      };

    //DELETE
    case ActionTypes.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case ActionTypes.DELETE_SUCCESS:
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case ActionTypes.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    default:
      return state;
  }
}
