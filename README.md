
# Sign-Up Form Project

This project is a responsive sign-up form built using HTML, CSS, JavaScript, and Bootstrap. The form captures user details such as first name, last name, email, password, and how they heard about the platform. It includes real-time validation, error feedback, and a success modal upon form submission.

## Features
- Responsive design using Bootstrap 4
- Real-time validation for form fields
- Custom error handling
- A success modal on form submission

## Bootstrap Components Used

### 1. **Card**
- **Classes**: `card`, `card-title`, `card-body`, `mt-5`
- **Description**: The form is placed inside a card for a well-structured and padded container. The `card-title` styles the heading, while `card-body` adds padding around the form contents. The `mt-5` class adds top margin for spacing.
- **Working**: The card ensures the form appears centered and structured on the page with padding and shadow for a clean appearance.

### 2. **Form Controls**
- **Classes**: `form-group`, `form-control`, `btn btn-primary`, `btn-block`
- **Description**: 
  - `form-group` wraps each form element, providing proper spacing.
  - `form-control` styles the input and select elements with consistent padding, borders, and hover effects.
  - `btn btn-primary` gives the submit button Bootstrap’s primary color, and `btn-block` makes it span the full width.
- **Working**: Form controls provide a consistent, clean user interface for text inputs, dropdowns, and the submit button.

### 3. **Typography Utilities**
- **Class**: `text-center`
- **Description**: Centers the text within the container.
- **Working**: The heading (`h2`) and the "Already have an account?" section are centered for a balanced design.

### 4. **Modal**
- **Classes**: `modal`, `modal-content`, `close-button`
- **Description**: 
  - `modal` creates an overlay that shows the success message.
  - `modal-content` styles the content inside the modal.
  - `close-button` provides a button to close the modal.
- **Working**: The modal appears when the form is submitted successfully and provides feedback. Users can close the modal by clicking the close button or outside the modal.

### 5. **Utility Classes**
- **Classes**: `mt-3`, `mt-5`
- **Description**: Adds vertical spacing between elements using Bootstrap's margin utility classes.
- **Working**: These classes are used to control the spacing between elements like the card, form fields, and the text below the form.

## Form Validation
The form includes real-time validation to ensure that user input is correct:
- **First Name** and **Last Name**: Must be 2-30 alphanumeric characters.
- **Email**: Must be a valid `@northeastern.edu` email address.
- **Password**: Must be at least 6 characters long and match the confirmation password.
- **Source Selection**: Users must choose an option from the "Where did you hear about us?" dropdown.

If any field is invalid, error messages are displayed, and the submit button remains disabled until all errors are resolved.

## Modal Behavior
Upon successful submission, a modal appears with a success message. The modal can be dismissed by clicking the close button or clicking outside the modal.
