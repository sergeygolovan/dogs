  
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../_store/reducers";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector