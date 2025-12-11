// settings_Mamyjean.js
document.addEventListener("DOMContentLoaded", () => {
  // ====== Recover current user ======
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const currentEmail = localStorage.getItem("currentUserEmail");

  if (!currentEmail || !users.length) {
    window.location.href = "login_MamyJean.html";
    return;
  }

  const userIndex = users.findIndex(
    (u) => u.email && u.email.toLowerCase() === currentEmail.toLowerCase()
  );
  if (userIndex === -1) {
    window.location.href = "login_MamyJean.html";
    return;
  }

  const user = users[userIndex];

  // ====== ELEMENTS GENERAL / PROFILE ======
  const fullNameInput = document.getElementById("profileFullName");
  const emailInput = document.getElementById("profileEmail");
  const nameHeading = document.getElementById("profileNameHeading");
  const saveProfileButton = document.getElementById("saveProfileButton");
  const logoutButton = document.getElementById("logoutButton");
  const langButtons = document.querySelectorAll(".language-options button");

  // pre-filled profil
  if (fullNameInput) fullNameInput.value = user.name || "";
  if (emailInput) emailInput.value = user.email || "";
  if (nameHeading) nameHeading.textContent = user.name || "User";

  // Language
  let currentLang = user.lang || "en";
  langButtons.forEach((btn) => {
    const lang = btn.dataset.lang;
    const active = lang === currentLang;
    btn.classList.toggle("active-language", active);
    btn.classList.toggle("language", !active);
  });

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      langButtons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("active-language", isActive);
        b.classList.toggle("language", !isActive);
      });
    });
  });

  // save profil
  if (saveProfileButton) {
    saveProfileButton.addEventListener("click", (e) => {
      e.preventDefault();

      const newName = (fullNameInput?.value || "").trim();
      const newEmail = (emailInput?.value || "").trim().toLowerCase();

      if (!newName || !newEmail) {
        alert("Name and email cannot be empty.");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
        alert("Please enter a valid email.");
        return;
      }

      const exists = users.find(
        (u, i) =>
          i !== userIndex &&
          u.email &&
          u.email.toLowerCase() === newEmail
      );
      if (exists) {
        alert("This email is already used by another account.");
        return;
      }

      users[userIndex].name = newName;
      users[userIndex].email = newEmail;
      users[userIndex].lang = currentLang;

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUserEmail", newEmail);

      if (nameHeading) nameHeading.textContent = newName;
      alert("Profile updated!");
    });
  }

  // ====== LOGOUT (sidebar) ======
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("currentUserEmail");
      alert("You have been logged out.");
      window.location.href = "login_MamyJean.html";
    });
  }

  // ====== SECURITY : CHANGE PASSWORD ======
  const securityForm = document.getElementById("securityForm");
  const currentPasswordInput = document.getElementById("currentPassword");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  if (securityForm && currentPasswordInput && newPasswordInput && confirmPasswordInput) {
    securityForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const currentPass = currentPasswordInput.value.trim();
      const newPass = newPasswordInput.value.trim();
      const confirmPass = confirmPasswordInput.value.trim();

      if (!currentPass || !newPass || !confirmPass) {
        alert("Please fill all password fields.");
        return;
      }

      if (!user.password) {
        alert("No password stored for this user.");
        return;
      }

      if (currentPass !== user.password) {
        alert("Current password is incorrect.");
        return;
      }

      if (newPass.length < 6) {
        alert("New password must be at least 6 characters.");
        return;
      }

      if (newPass !== confirmPass) {
        alert("New password and confirmation do not match.");
        return;
      }

      users[userIndex].password = newPass;
      localStorage.setItem("users", JSON.stringify(users));

      alert("Password updated successfully!");
      securityForm.reset();
    });
  }

  // Voir / cacher password (Security)
  function setupTogglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input || !icon) return;

    icon.addEventListener("click", () => {
      const hidden = input.type === "password";
      input.type = hidden ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }

  setupTogglePassword("currentPassword", "toggleCurrentPassword");
  setupTogglePassword("newPassword", "toggleNewPassword");

  // ====== LOGOUT GLOBAL (Security) ======
  const logoutAllButton = document.getElementById("logoutAllButton");
  if (logoutAllButton) {
    logoutAllButton.addEventListener("click", () => {
      localStorage.removeItem("currentUserEmail");
      alert("You have been logged out.");
      window.location.href = "login_MamyJean.html";
    });
  }

  // ====== DELETE ACCOUNT ======
  const deleteAccountButton = document.getElementById("deleteAccountButton");
  if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", () => {
      const sure = confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (!sure) return;

      users.splice(userIndex, 1);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("currentUserEmail");

      alert("Your account has been deleted.");
      window.location.href = "login_MamyJean.html";
    });
  }

  // ====== TABS : GENERAL / SECURITY / PRIVACY ======
  const sidebarItems = document.querySelectorAll(".sidebar li[data-panel]");
  const panels = document.querySelectorAll(".content-panel");

  function showPanel(name) {
    panels.forEach((panel) => {
      const isActive = panel.id === `panel-${name}`;
      panel.classList.toggle("active", isActive);
    });

    sidebarItems.forEach((item) => {
      const isCurrent = item.dataset.panel === name;
      item.classList.toggle("current", isCurrent);
    });
  }

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const panelName = item.dataset.panel;
      if (!panelName) return;
      showPanel(panelName);
    });
  });

  // panel by defaut
  showPanel("general");

});

// ===== CLEAR ALL DATA (Privacy) =====
const clearDataButton = document.getElementById("clearDataButton");
if (clearDataButton) {
    clearDataButton.addEventListener("click", () => {
        const sure = confirm("This will erase ALL user data. Continue?");
        if (!sure) return;

        localStorage.clear();
        alert("All data has been cleared. Restarting app...");
        window.location.href = "login_MamyJean.html";
    });
}

