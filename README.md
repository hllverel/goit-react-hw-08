================================================================================
PHONEBOOK APP - GoIT React Homework #8
================================================================================

# PROJECT OVERVIEW

React phonebook app with Redux Toolkit, user authentication, and async API operations.
Features user registration/login, contact management with search filtering, and
persistent authentication with Redux Persist.

Key features:

- Redux Toolkit with Redux Persist for state persistence
- JWT authentication with token management
- Async API operations with error handling
- Form validation with Formik + Yup
- Memoized selectors with createSelector
- Search contacts by name AND phone number
- Delete confirmation modal
- Toast notifications for user feedback
- Protected routes with React Router

# TECH STACK

Core:

- React 18.2.0
- Redux Toolkit 2.11.2 with Redux Thunk
- Axios 1.15.0 (HTTP client)
- Formik 2.4.9 + Yup 1.7.1 (form validation)
- React Router DOM (routing)
- Redux Persist (state persistence)
- React Hot Toast (notifications)
- Vite 6.3.6 (build tool)
  Backend:
- Connections API: https://connections-api.goit.global/
  - /users/signup - register new user
  - /users/login - user login
  - /users/logout - user logout
  - /users/current - get current user
  - /contacts - contact CRUD operations

# PROJECT STRUCTURE

src/
├── components/
│ ├── App.jsx - main app with routes and user refresh
│ ├── AppBar/ - header with navigation
│ ├── Layout/ - wraps AppBar and content
│ ├── Navigation/ - nav links (home, contacts)
│ ├── AuthNav/ - auth links (register, login)
│ ├── UserMenu/ - user info and logout button
│ ├── PrivateRoute/ - protected route wrapper
│ ├── RestrictedRoute/ - redirect if already logged in
│ ├── ContactForm/ - add contact form with validation
│ ├── ContactList/ - display all filtered contacts
│ ├── Contact/ - single contact with delete confirmation modal
│ ├── LoginForm/ - user login form with validation
│ ├── RegistrationForm/ - user registration form with validation
│ ├── SearchBox/ - filter contacts by name and phone
│ ├── ConfirmModal/ - reusable delete confirmation modal
│ ├── AppBar/ - header navigation bar
│ └── UserMenu/ - user profile and logout
├── pages/
│ ├── HomePage/ - home page (public)
│ ├── LoginPage/ - login page (restricted)
│ ├── RegistrationPage/ - registration page (restricted)
│ └── ContactsPage/ - contacts management (private)
├── redux/
│ ├── auth/
│ │ ├── slice.js - auth state and reducers
│ │ ├── operations.js - register, login, logout, refreshUser thunks
│ │ └── selectors.js - auth state selectors
│ ├── contacts/
│ │ ├── slice.js - contacts state and reducers
│ │ ├── operations.js - fetchContacts, addContact, deleteContact thunks
│ │ └── selectors.js - contact selectors including filtered selector
│ ├── filters/
│ │ ├── slice.js - search filter state and actions
│ │ └── selectors.js - filter selectors
│ ├── store.js - Redux store with persistence configuration
│ └── api.js - axios base configuration
└── main.jsx - app entry point with axios baseURL configuration

# KEY FEATURES

1. User Authentication
   - Register with email, password, name (all required)
   - Login with email and password
   - Logout with automatic token cleanup
   - Auto user refresh on app startup
   - Token persisted to localStorage via Redux Persist
   - Session validation on each request
2. Contact Management
   - View all user contacts
   - Add new contact with form validation
   - Delete contact with confirmation modal showing contact name
   - Real-time search contacts by name AND phone number
   - Memoized filtered selector for performance
3. Form Validation
   - Registration: name (required), email (valid format), password (min 7 chars)
   - Login: email (valid format), password (min 7 chars)
   - Contact: name (3-50 chars), phone (numbers and hyphens allowed)
   - All forms use Formik with Yup validation schema
4. User Feedback
   - Success toast notification when contact is added
   - Error toast notification on failed operations
   - Loading states during data fetch and user refresh
   - Delete confirmation modal before removing contact
5. Route Protection
   - Public routes: Home page (accessible to everyone)
   - Restricted routes: Login and Registration (redirect to /contacts if logged in)
   - Private routes: Contacts page (redirect to /login if not authenticated)
   - Auto user refresh on app load to maintain session

# COMPONENTS OVERVIEW

App.jsx

- Dispatches refreshUser on mount to restore session
- Routes configured with proper guards
- Shows loading placeholder while refreshing user
- Wraps pages with Layout component
  Layout.jsx
- Renders AppBar at the top
- Renders {children} for page content below AppBar
  AppBar.jsx
- Always shows Navigation component
- Shows UserMenu if user is logged in
- Shows AuthNav if user is logged out
  Navigation.jsx
- Always shows link to Home page
- Conditionally shows link to Contacts page if logged in
- Uses useSelector to check isLoggedIn status
  AuthNav.jsx
- Shows Register link to /register
- Shows Login link to /login
- Only visible when user is not authenticated
  UserMenu.jsx
- Displays current user name from Redux state
- Logout button dispatches logout action
- Only visible when user is authenticated
  PrivateRoute.jsx
- Requires user to be authenticated
- Shows loading if session is refreshing
- Redirects to /login if not authenticated
- Shows component if logged in
  RestrictedRoute.jsx
- Redirects to /contacts if already logged in
- Shows component if not authenticated
- Used for login and registration pages
  ContactList.jsx
- Uses memoized selectFilteredContacts selector
- Maps through contacts and renders Contact component
- Automatically updates when filter or contacts change
  Contact.jsx
- Displays contact name and phone number
- Delete button opens confirmation modal
- Modal shows contact name in confirmation message
- Dispatches deleteContact on confirmation
  ContactForm.jsx
- Formik form with Yup validation
- Shows success toast on add
- Resets form after successful submission
  RegistrationForm.jsx
- Formik form with Yup validation
- Password requires minimum 7 characters
- Shows error/success toasts
- Dispatches register action
  LoginForm.jsx
- Formik form with Yup validation
- Password requires minimum 7 characters
- Shows error/success toasts
- Dispatches login action
  SearchBox.jsx
- Real-time search input
- Filters contacts by name AND phone number
- Case-insensitive matching
  ConfirmModal.jsx
- Reusable modal for confirmations
- Shows title, message, and buttons
- Styled with overlay and animation

# REDUX STATE STRUCTURE

auth/

- State: { user: {name, email}, token, isLoggedIn, isRefreshing, error }
- Operations: register, login, logout, refreshUser
- Selectors: selectUser, selectToken, selectIsLoggedIn, selectIsRefreshing
- Persisted: token saved to localStorage
  contacts/
- State: { items: [], isLoading, error }
- Operations: fetchContacts, addContact, deleteContact
- Selectors: selectContacts, selectIsLoading, selectError, selectFilteredContacts
- selectFilteredContacts: Memoized with createSelector
  filters/
- State: { name: '' }
- Actions: changeFilter
- Selectors: selectNameFilter
  store.js
- Redux Persist configuration
- authPersistConfig: { key: 'auth', storage, whitelist: ['token'] }
- Middleware configured for serialization

# API ENDPOINTS

POST /users/signup - Register new user
POST /users/login - Login user
POST /users/logout - Logout user
GET /users/current - Get current user
GET /contacts - Fetch all contacts
POST /contacts - Create new contact
DELETE /contacts/:id - Delete contact

All contact endpoints require Authorization header with Bearer token.

# RESOURCES

Redux Toolkit: https://redux-toolkit.js.org
Redux Persist: https://github.com/rt2zz/redux-persist
React Router: https://reactrouter.com
Formik: https://formik.org
Yup: https://github.com/jquense/yup
React Hot Toast: https://react-hot-toast.com

Repository: https://github.com/hllverel/goit-react-hw-08
Connections API: https://connections-api.goit.global/

================================================================================
