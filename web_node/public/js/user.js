document.addEventListener('DOMContentLoaded', () => {
    // Extract name from url
    const name = window.location.pathname.split('/').pop();
    fetch(`/user/${name}`)
        .then(response => response.json())
        .then(user => {
            const greetingElement = document.getElementById('greeting');
            greetingElement.textContent = `Welcome, ${user.name}!`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});