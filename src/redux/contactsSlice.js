import { createSlice } from '@reduxjs/toolkit';
import initialContacts from '../contacts.json';

const slice = createSlice({
    name: 'contacts',
    initialState: {items: initialContacts},
    reducers: {
        addContact: (state, action) => {
            state.items.push(action.payload)
        },
        deleteContact: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },
    }
});

export const { addContact, deleteContact } = slice.actions;
export const selectContacts = (state) => state.contacts.items;

export default slice.reducer;