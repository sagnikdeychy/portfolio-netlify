const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const res = await fetch("/.netlify/functions/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message);
    form.reset();
  } catch (err) {
    alert("Error submitting form");
    console.error(err);
  }
});