import { useDispatch } from 'react-redux';
import {AppDispatch} from '../store'
export const useAppDisPatch =()=>useDispatch<AppDispatch>()