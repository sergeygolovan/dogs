import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../_store/creators";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
