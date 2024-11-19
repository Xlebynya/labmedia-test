document.querySelectorAll('.sort-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.sort-button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        //Здесь должна быть реализация сортировки
    });
});


const apiUrl = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users';
const tableBody = document.querySelector('tbody');
const searchInput = document.querySelector('.search-bar input');

fetch(apiUrl)
    .then(response => response.json())
    .then(renderTable)

function renderTable(users) {
    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.registration_date}</td>
            <td>${user.rating}</td>
            <td>
                <button class="remove-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L20 20" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M4 20L20 4" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}