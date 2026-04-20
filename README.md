================================================================================
PHONEBOOK APP - GoIT React Homework #8
================================================================================

# PROJECT OVERVIEW

React phonebook app with Redux Toolkit and async operations. Contacts are stored
on a backend API (MockAPI) instead of local storage. The app demonstrates:

- Redux Thunk for async API operations
- Axios HTTP client integration
- Loading and error state management
- Form validation with Formik + Yup
- Memoized selectors with createSelector

# TECH STACK

Core:

- React 18.2.0
- Redux Toolkit 2.11.2 with Redux Thunk
- Axios 1.15.0 (HTTP client)
- Formik 2.4.9 + Yup 1.7.1 (form validation)
- Vite 6.3.6 (build tool)

Backend:

- MockAPI: https://69d8f9030576c938825a58fb.mockapi.io/contacts

# PROJECT STRUCTURE

src/
├── components/
│ ├── Contact/ - delete button
│ ├── ContactForm/ - add contact (POST)
│ ├── ContactList/ - display with filtering
│ └── SearchBox/ - filter input
├── redux/
│ ├── contactsOps.js - async thunks (fetch/add/delete)
│ ├── contactsSlice.js - reducer + extra reducers for async
│ ├── filtersSlice.js - search filter reducer
│ ├── selectors.js - state selectors
│ └── store.js - Redux store config
└── App.jsx - fetches contacts on mount

# KEY FEATURES

1. Fetch Contacts (GET /contacts)
   - Dispatched in App.jsx useEffect on mount
   - Sets isLoading = true during request
   - Stores contacts array in state.contacts.items

2. Add Contact (POST /contacts)
   - Form validates name (3-50 chars) and number
   - Dispatches addContact thunk
   - After success, fetches updated list
   - Resets form

3. Delete Contact (DELETE /contacts/:id)
   - Click delete button on contact card
   - Removes from state.contacts.items

4. Search Contacts
   - Real-time filter by name
   - Uses createSelector for memoization
   - Case-insensitive matching

5. Loading & Error States
   - state.contacts.isLoading for UI feedback
   - state.contacts.error for error messages

# COMPONENTS

App.jsx

- useEffect fetches contacts on mount
- Shows "Loading contacts..." while isLoading
- Displays error if present

ContactForm.jsx

- Formik form with Yup validation
- Dispatches addContact, then fetchContacts
- Uses .then() to chain async operations

ContactList.jsx

- Uses selectFilteredContacts selector
- Memoized filtering with createSelector

SearchBox.jsx

- Input dispatches changeFilter action
- Real-time updates to filter state

Contact.jsx

- Shows name and number with icons
- Delete button dispatches deleteContact thunk

# RESOURCES

Redux Toolkit: https://redux-toolkit.js.org
Formik: https://formik.org
Yup: https://github.com/jquense/yup
Vite: https://vitejs.dev

Repository: https://github.com/hllverel/goit-react-hw-07
MockAPI: https://mockapi.io

================================================================================
