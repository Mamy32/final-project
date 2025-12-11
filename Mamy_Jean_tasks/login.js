// login.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleLink = document.getElementById("toggleLink");
  const nameField = document.getElementById("nameField");
  const forgotLink = document.getElementById("forgotLink");
  const forgotButton = document.getElementById("forgotButton");
  const mainButton = document.getElementById("mainButton");
  const authForm = document.getElementById("authForm");
  const messageEl = document.getElementById("message");
  const togglePassword = document.getElementById("togglePassword");

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  // true = Sign up mode, false = Log in mode
  let isSignup = true;

  // --------- localStorage helpers ---------
  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const setCurrentUser = (email) => {
    if (!email) return;
    localStorage.setItem("currentUserEmail", email.toLowerCase());
  };

  const findUser = (email) =>
    getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());


  if (getUsers().length > 0) {
    isSignup = false;
  }

  // --------- message helpers ---------
  function showMessage(msg, type) {
    if (!messageEl) return;
    messageEl.textContent = msg;
    if (!msg) {
      messageEl.className = "";
    } else {
      messageEl.className =
        type === "error" ? "error-message" : "success-message";
    }
  }

  const showError = (msg) => showMessage(msg, "error");
  const showSuccess = (msg) => showMessage(msg, "success");
  const clearMessage = () => showMessage("", "");

  // --------- show / hide password ---------
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  }

  // --------- Switch Sign up / Log in ---------
  function updateModeUI() {
    clearMessage();

    if (isSignup) {
      // mode Sign up
      if (nameField) nameField.style.display = "block";
      if (forgotLink) forgotLink.style.display = "none";
      if (mainButton) mainButton.textContent = "Sign up";
      if (toggleLink) toggleLink.textContent = "Log in";
    } else {
      // mode Log in
      if (nameField) nameField.style.display = "none";
      if (forgotLink) forgotLink.style.display = "inline";
      if (mainButton) mainButton.textContent = "Log in";
      if (toggleLink) toggleLink.textContent = "Sign up";
    }
  }

  if (toggleLink) {
    toggleLink.addEventListener("click", () => {
      isSignup = !isSignup;
      updateModeUI();
    });
  }

  // état initial
  updateModeUI();

  // --------- Forgot Password ---------
  if (forgotButton) {
    forgotButton.addEventListener("click", (e) => {
      e.preventDefault();

      let email =
        (emailInput && emailInput.value.trim().toLowerCase()) || "";

      if (!email) {
        email = prompt("Enter your email address:") || "";
        email = email.trim().toLowerCase();
      }

      if (!email) return;

      const user = findUser(email);
      if (!user) {
        alert("No account found with that email.");
        return;
      }

      alert(
        `Password hint: it starts with "${user.password.slice(
          0,
          2
        )}" and has ${user.password.length} characters.`
      );
    });
  }

  // --------- Submit Sign up / Log in ---------
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearMessage();

      const name = (nameInput && nameInput.value.trim()) || "";
      const email =
        (emailInput && emailInput.value.trim().toLowerCase()) || "";
      const password =
        (passwordInput && passwordInput.value.trim()) || "";

      if (!email || !password || (isSignup && !name)) {
        showError("All fields are required.");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError("Please enter a valid email address.");
        return;
      }

      if (isSignup && password.length < 6) {
        showError("Password must be at least 6 characters.");
        return;
      }

      if (isSignup) {
        // ------- SIGN UP (only create an account) -------
        const users = getUsers();
        if (users.some((u) => u.email.toLowerCase() === email)) {
          showError("This email is already registered. Please log in.");
          return;
        }

        users.push({
          name,
          email,
          password,
          lang: "en",
          createdAt: Date.now(),
        });

        saveUsers(users);
        showSuccess("Account created! You can now log in.");
        isSignup = false;
        updateModeUI();

        if (nameInput) nameInput.value = "";
        if (passwordInput) passwordInput.value = "";
      } else {
        // ------- LOG IN -------
        const user = findUser(email);
        if (!user) {
          showError("No account found with this email.");
          return;
        }
        if (user.password !== password) {
          showError("Incorrect password.");
          return;
        }

        setCurrentUser(user.email);
        showSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "home_MamyJean.html";
        }, 800);
      }
    });
  }
});
