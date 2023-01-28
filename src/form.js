const btnSubmit = document.querySelector(".btn-submit"),
  loadingSpinner = document.querySelector(".loading"),
  successMessage = document.querySelector(".success-message"),
  progressBar = document.querySelector('[data-step="1"]'),
  btnPrev = document.querySelector('[data-btn="prev"]'),
  btnNext = document.querySelector('[data-btn="next"]'),
  rowTranslate = document.querySelector(".row-translate"),
  nameField = document.querySelector('input[name="name"]'),
  emailField = document.querySelector('input[name="email"]'),
  messageField = document.querySelector("textarea"),
  form = document.querySelector("form");

const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

btnSubmit.addEventListener("click", () => {
  loadingSpinner.classList.remove("d-none");
  btnSubmit.classList.add("d-none");
  successMessage.classList.remove("text-danger");

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LdmnDMkAAAAAG4dAz32VMYBav7jVwyrPwz-0sA1", { action: "submit" })
      .then(function (token) {
        // Add your logic to submit to your backend server here.
        fetch(
          isDev
            ? "http://localhost:3001/contact"
            : "https://gmail-api.onrender.com/contact",
          {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // {code, message}
            successMessage.innerHTML = data.message;
            successMessage.classList.add("visible");
            loadingSpinner.classList.add("d-none");

            if (data.code == 400 || data.code == 500) {
              btnSubmit.classList.remove("d-none");
              successMessage.classList.add("text-danger", "mt-2");
            } else {
              btnPrev.classList.add("d-none");
            }
          })
          .catch(() => {
            successMessage.innerHTML =
              "Errore! API non disponibile, riprova più tardi.";
            successMessage.classList.add("visible");
            loadingSpinner.classList.add("d-none");
            successMessage.classList.add("text-danger");
            btnPrev.classList.add("d-none");
          });
      });
  });
});

/**
 * param step {string} 'next' or 'prev'
 */
function changeStep(step) {
  const currentStep = parseInt(form.getAttribute("data-step"));
  if (step == "next") {
    form.setAttribute("data-step", currentStep + 1);
  } else if (step == "prev") {
    form.setAttribute("data-step", currentStep - 1);
  }
}

function validateEmail(email) {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return regex.test(email);
}

nameField.addEventListener("input", (e) => {
  if (!e.target.value.trim().length) {
    btnNext.classList.remove("clickable");
  } else {
    btnNext.classList.add("clickable");
  }
});

btnNext.addEventListener("click", () => {
  const currentStep = parseInt(form.getAttribute("data-step"));

  switch (currentStep) {
    case 0:
      if (!nameField.value.trim()) {
        nameField.nextElementSibling.classList.add("visible");
        return;
      }
      nameField.nextElementSibling.classList.remove("visible");
      changeStep("next");
      break;
    case 1:
      if (!validateEmail(emailField.value.trim())) {
        emailField.nextElementSibling.classList.add("visible");
        return;
      }
      emailField.nextElementSibling.classList.remove("visible");
      changeStep("next");
      break;
    case 2:
      if (!messageField.value.trim()) {
        messageField.nextElementSibling.classList.add("visible");
        return;
      }
      messageField.nextElementSibling.classList.remove("visible");
      changeStep("next");
      break;
    default:
      return;
  }
});

btnPrev.addEventListener("click", () => {
  successMessage.innerHTML = "";
  successMessage.classList.remove("visible", "text-danger", "mt-2");
  changeStep("prev");
});
