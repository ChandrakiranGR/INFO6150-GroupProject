document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const submitButton = document.getElementById('submitButton');
  const sourceSelect = document.getElementById('sourceSelect');
  const successModal = document.getElementById('successModal');
  const closeButton = document.querySelector('.close-button');

  // Error fields
  const errorFields = {
      firstName: document.getElementById('firstNameError'),
      lastName: document.getElementById('lastNameError'),
      email: document.getElementById('emailError'),
      password: document.getElementById('passwordError'),
      confirmPassword: document.getElementById('confirmPasswordError'),
      sourceSelect: document.getElementById('sourceSelectError'),
  };

  // Initially hide all error messages
  Object.values(errorFields).forEach(errorField => {
      errorField.style.display = 'none';  // Hide all errors on page load
  });

  let touchedFields = {};  // Track fields that have been interacted with

  const requiredFields = form.querySelectorAll('input[required], select[required]');

  const validations = {
      firstName: {
          minLength: 2,
          maxLength: 30,
          pattern: /^[a-zA-Z0-9]+$/,
          errorMessage: "First name must be 2-30 alphanumeric characters."
      },
      lastName: {
          minLength: 2,
          maxLength: 30,
          pattern: /^[a-zA-Z0-9]+$/,
          errorMessage: "Last name must be 2-30 alphanumeric characters."
      },
      email: {
          pattern: /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/,
          errorMessage: "Email must be a valid Northeastern email (yourname@northeastern.edu)."
      },
      password: {
          minLength: 6,
          errorMessage: "Password must be at least 6 characters long."
      },
      confirmPassword: {
          matches: 'password',
          errorMessage: "Passwords must match."
      },
      sourceSelect: {
          errorMessage: "Please select a source."
      }
  };

  function validateField(field) {
      const validation = validations[field.id];
      const errorElement = errorFields[field.id];
      let isValid = true;
      let errorMessage = "";

      // Only validate the field if the user has interacted with it
      if (touchedFields[field.id] && field.required && !field.value.trim()) {
          isValid = false;
          errorMessage = "This field is required.";
      } else if (touchedFields[field.id] && validation) {
          if (validation.minLength && field.value.length < validation.minLength) {
              isValid = false;
              errorMessage = validation.errorMessage;
          } else if (validation.matches && field.value !== document.getElementById(validation.matches).value) {
              isValid = false;
              errorMessage = validation.errorMessage;
          } else if (validation.pattern && !validation.pattern.test(field.value)) {
              isValid = false;
              errorMessage = validation.errorMessage;
          }
      }

      if (!isValid) {
          errorElement.textContent = errorMessage;
          errorElement.style.display = 'block';  // Show error message if invalid
          field.classList.add('invalid');
      } else {
          errorElement.style.display = 'none';  // Hide error message if valid
          field.classList.remove('invalid');
      }

      return isValid;
  }

  function validateForm() {
      let isValid = true;

      requiredFields.forEach(field => {
          if (!validateField(field)) {
              isValid = false;
          }
      });

      if (touchedFields[sourceSelect.id] && sourceSelect.value === "") {
          errorFields.sourceSelect.textContent = "Please select a source.";
          errorFields.sourceSelect.style.display = 'block';
          isValid = false;
      } else {
          errorFields.sourceSelect.style.display = 'none';
      }

      // Disable the submit button and grey it out if the form is invalid
      submitButton.disabled = !isValid;
      submitButton.style.backgroundColor = isValid ? '#007BFF' : '#cccccc';  // Blue when enabled, grey when disabled
  }

  form.querySelectorAll('input, select').forEach(element => {
      element.addEventListener('input', () => {
          touchedFields[element.id] = true;  // Mark the field as interacted with
          validateField(element);
          validateForm();
      });
  });

  form.addEventListener('submit', function (event) {
      event.preventDefault();
      Object.keys(touchedFields).forEach(fieldId => validateField(document.getElementById(fieldId)));
      validateForm();
      if (!submitButton.disabled) {
          displaySuccessModal(); // Show the success modal
          form.reset();
          touchedFields = {};  // Reset interaction tracking when the form is successfully submitted
          validateForm();
      } else {
          alert('Please fill in all required fields correctly.');
      }
  });

  function displaySuccessModal() {
      successModal.style.display = 'block'; // Show the modal
  }

  closeButton.addEventListener('click', function () {
      successModal.style.display = 'none'; // Hide the modal when the close button is clicked
  });

  window.addEventListener('click', function (event) {
      if (event.target === successModal) {
          successModal.style.display = 'none'; // Hide the modal if the user clicks outside of it
      }
  });

  form.addEventListener('reset', function () {
      setTimeout(() => {
          Object.values(errorFields).forEach(errorField => errorField.style.display = 'none');  // Hide errors on reset
          form.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
          touchedFields = {};  // Reset touched fields on form reset
          validateForm();
      }, 0);
  });

  // Initial state: disable and grey out the submit button on page load
  submitButton.disabled = true;
  submitButton.style.backgroundColor = '#cccccc';  // Set button to grey on page load

  // Initial validation to disable submit button on page load
  validateForm();
});
