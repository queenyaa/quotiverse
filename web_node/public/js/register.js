document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Load form data into JavaScript object
        const formData = new FormData(registrationForm);

        // Convert form data to JSON object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send data to server
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url; // Redirect to a new page
            } else {
                return response.json(); // Continue processing the response
            }
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});