document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const submitButton = document.getElementById('submitButton');
  const sourceSelect = document.getElementById('sourceSelect');
  const successModal = document.getElementById('successModal');
  const closeButton = document.querySelector('.close-button');

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
      const errorElement = document.getElementById(`${field.id}Error`);
      let isValid = true;
      let errorMessage = "";

      if (field.required && !field.value.trim()) {
          isValid = false;
          errorMessage = "This field is required.";
      } else if (validation) {
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

      if (errorElement) {
          if (!isValid) {
              errorElement.textContent = errorMessage;
              field.classList.add('invalid');
          } else {
              errorElement.textContent = '';
              field.classList.remove('invalid');
          }
      } else {
          console.warn(`Error element not found for field: ${field.id}`);
      }

      return isValid;
  }

  function validateForm() {
      let isValid = true;

      requiredFields.forEach(field => {
          if (!validateField(field)) {
              isValid = false;
              console.log(`Validation failed for field: ${field.id}`);
          }
      });

      if (sourceSelect.value === "") {
          document.getElementById('sourceSelectError').textContent = "Please select a source.";
          isValid = false;
          console.log('Validation failed for source');
      } else {
          document.getElementById('sourceSelectError').textContent = "";
      }

      console.log(`Form is ${isValid ? 'valid' : 'invalid'}`);
      submitButton.disabled = !isValid;
  }

  form.querySelectorAll('input, select').forEach(element => {
      element.addEventListener('input', () => {
          validateField(element);
          validateForm();
      });
  });

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (!submitButton.disabled) {
          const formData = {
              firstName: form.firstName.value,
              lastName: form.lastName.value,
              email: form.email.value,
              password: form.password.value,
              confirmPassword: form.confirmPassword.value,
              source: sourceSelect.value
          };

          displaySuccessModal(); // Show the success modal
          form.reset();
          validateForm();
      } else {
          alert('Please fill in all required fields correctly.');
      }
  });

  function displaySuccessModal() {
      successModal.style.display = 'block'; // Show the modal
  }

  closeButton.addEventListener('click', function() {
      successModal.style.display = 'none'; // Hide the modal when the close button is clicked
  });

  window.addEventListener('click', function(event) {
      if (event.target === successModal) {
          successModal.style.display = 'none'; // Hide the modal if the user clicks outside of it
      }
  });

  form.addEventListener('reset', function() {
      setTimeout(() => {
          document.querySelectorAll('.error').forEach(error => error.textContent = '');
          document.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
          validateForm();
      }, 0);
  });

  // Initial validation
  validateForm();
});
