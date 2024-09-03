import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCategoryEntity } from '../pages/categoryPage/components/categoryTable/types/categoryTypes';


export type TMode = 'view' | 'edit' | 'add';

interface EditorState {
    category: {
        title: string ,
        data: TCategoryEntity[],
    },
    mode: TMode,
    targetRow: number
}

const initialState: EditorState = {
    category: {
        title: '' ,
        data: [],
    },
    mode:'view',
    targetRow: -1
};

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducerPath: 'editor',
    reducers: {
        updateData: (state, action: PayloadAction<TCategoryEntity[]>) => {
            state.category.data = action.payload;
        },
        updateTitle: (state, action: PayloadAction<string>) => {        
            state.category.title = action.payload;
        },
        setMode: (state, action: PayloadAction<TMode>) => {
            state.mode = action.payload;
        },
        setTargetRow: (state, action: PayloadAction<number>) => {
            state.targetRow = action.payload;    
        }
    },
});

export const { updateData, updateTitle, setMode, setTargetRow } = editorSlice.actions;
export const selectEditor = (state: any) => state.editor;

export default editorSlice.reducer;