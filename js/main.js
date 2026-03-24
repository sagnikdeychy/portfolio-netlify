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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    console.log("Response:", result); // 👈 debug

    // ✅ Show message OR error
    alert(result.message || result.error);

    form.reset();
  } catch (err) {
    console.error("Frontend error:", err);
    alert("Error submitting form");
  }
});