export default (id) => async (dispatch) => {
  dispatch({ type: "MYID", payload: id });
  return true;
};
