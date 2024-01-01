import { useSelector,TypedUseSelectorHook } from "react-redux"; 
import {AppState}  from '../store'
export const useAppSelector:TypedUseSelectorHook<AppState>=useSelector;