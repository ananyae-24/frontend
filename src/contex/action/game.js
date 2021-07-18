// eslint-disable-next-line import/no-anonymous-default-export
export default (data) => async (dispatch) => {
  dispatch({ type: "START", payload: data });
  return true;
};
