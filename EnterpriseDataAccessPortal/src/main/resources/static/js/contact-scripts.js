document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your Public Key
  emailjs.init("KmB9FPxVgOqE3k70c"); // replace with your actual key

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // ✅ Check if reCAPTCHA is solved
      const captchaResponse = grecaptcha.getResponse();
      if (!captchaResponse) {
        alert("⚠️ Please complete the CAPTCHA before sending.");
        return;
      }

      // Send form via EmailJS
      emailjs.sendForm("service_g7a137p", "template_pzc5ttr", form)
        .then(function () {
          alert("✅ Message sent successfully!");
          form.reset();
          grecaptcha.reset(); // reset CAPTCHA for next submission
        })
        .catch(function (error) {
          console.error("❌ Failed to send message:", error);
          alert("Something went wrong. Please try again.");
        });
    });
  }
});
