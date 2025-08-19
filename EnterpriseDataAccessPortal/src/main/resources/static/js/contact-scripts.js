// contact.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your Public Key
  emailjs.init("KmB9FPxVgOqE3k70c");

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_g7a137p", "template_pzc5ttr", form)
        .then(function () {
          alert("Message sent successfully!");
          form.reset();
        })
        .catch(function (error) {
          console.error("Failed to send message:", error);
          alert("Something went wrong. Please try again.");
        });
    });
  }
});
