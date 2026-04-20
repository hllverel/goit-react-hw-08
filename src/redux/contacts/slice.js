import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { selectNameFilter } from '../filters/slice';
import { selectContacts } from './selectors';

const handlePending = state => {
    state.isLoading = true;
};

const handleError = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const slice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, handleError)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, handleError)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(
                    contact => contact.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addCase(deleteContact.rejected, handleError);
    }
});

export const contactsReducer = slice.reducer;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, filter) => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) || 
            contact.number.toLowerCase().includes(filter.toLowerCase()))
    }
);