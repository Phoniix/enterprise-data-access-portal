  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Stop default form behavior

      emailjs.sendForm("service_g7a137p", "template_pzc5ttr", form)
        .then(function () {
          alert("Message sent successfully!");
          form.reset(); // Clear the form after success
        }, function (error) {
          console.error("Failed to send message:", error);
          alert("Something went wrong. Please try again.");
        });
    });
  });