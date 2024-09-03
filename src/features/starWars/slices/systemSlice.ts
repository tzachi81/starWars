import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SystemState {
    isModalOpen: boolean;
}

const initialState: SystemState = {
    isModalOpen: false,
};

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducerPath: 'system',
    reducers: {

        //TODO: consider using toggleModal
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const { openModal, closeModal } = systemSlice.actions;

export default systemSlice.reducer;