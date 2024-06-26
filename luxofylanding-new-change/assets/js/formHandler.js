document
  .getElementById("form-contact")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = {
      records: [
        {
          fields: {
            Name: document.getElementById("form-contact-name").value,
            Email: document.getElementById("form-contact-email").value,
            Message: document.getElementById("form-contact-message").value,
            PhoneNumber: document.getElementById("form-contact-phoneNumber")
              .value,
          },
        },
      ],
    };

    fetch("https://api.airtable.com/v0/appQpniWr4E7QKleh/tblCzjk34wjnvX370", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer pat1tMaB3rL7BrU4q.92c241900e9d001bf889ab0158640742dcabbad1e83f2fd466cd6ca28e7608b7", // Handle this securely
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        document.getElementById("form-contact-status").innerText =
          "Message sent successfully!";
      })
      .catch((error) => {
        document.getElementById("form-contact-status").innerText =
          "Error: " + error.message;
      });
  });
