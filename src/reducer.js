export const initialState = {
  user: null,
  token: null,
  userRole: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        accesstoken: action.accesstoken,
        userRole: action.userRole,
      };
    default:
      return state;
  }
};

export default reducer;
