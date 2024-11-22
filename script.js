const apiUrl = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users';
let defaultItems = []
let items = [];

const itemsPerPage = 5;
let currentPage = 1;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => defaultItems = data)
    .then(() => resetTable())
    .then(() => renderTable());

function resetTable() {
    items = defaultItems
}


async function renderTable() {
    const pages = []
    for (let index = 0; index <= Math.ceil(items.length / itemsPerPage); index++) {
        pages.push(index)
    }
    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = items.slice(indexOfFirstPage, indexOfLastPage);

    document.querySelector('tbody').innerHTML = currentItems.map(item =>
        `
        <tr>
            <td>${item.username}</td>
            <td>${item.email}</td>
            <td>${item.registration_date}</td>
            <td>${item.rating}</td>
            <td>
                <button class="remove-button" onclick = "remove(${item.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L20 20" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M4 20L20 4" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </button>
            </td>
        </tr>
        `
    ).join("");
}

function prevBtn() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextBtn() {
    if (currentPage < Math.ceil(items.length / itemsPerPage)) {
        currentPage++;
        renderTable();
    }
}




function remove(id) {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    document.addEventListener('mouseup', function (e) {
        if (!popup.contains(e.target)) {
            popup.remove();
        }
    });


    popup.innerHTML = `
        <p>Вы уверены, что хотите удалить пользователя?</p>
        <div>
            <button id="confirmDelete">Да</button>
            <button id="cancelDelete">Нет</button>
        <div>
    `;
    document.body.appendChild(popup);

    const confirmButton = popup.querySelector('#confirmDelete');
    const cancelButton = popup.querySelector('#cancelDelete');

    confirmButton.addEventListener('click', () => {
        defaultItems = defaultItems.filter(item => item.id != id);
        items = defaultItems;
        renderTable()
        popup.remove();
    });

    cancelButton.addEventListener('click', () => popup.remove());
}

async function handleSearch() {
    document.querySelectorAll('.sort-button').forEach(b => b.classList.remove('active'));
    const searchTerm = document.querySelector('input').value.toLowerCase();
    items = defaultItems.filter(item => {
        return (
            item.username.toLowerCase().includes(searchTerm) ||
            item.email.toLowerCase().includes(searchTerm)
        );
    });
    currentPage = 1;
    renderTable();
}

function sortTable(sortBy) {
    if (items == 0) {
        return
    }
    document.querySelectorAll('.sort-button').forEach(b => b.classList.remove('active'));
    items.sort((a, b) => {
        if (sortBy === 'date') {
            btn = document.getElementById('dateSort')
            const dateA = new Date(a.registration_date);
            const dateB = new Date(b.registration_date);
            return dateA - dateB;
        }
        if (sortBy === 'rating') {
            btn = document.getElementById('ratingSort')

            return a.rating - b.rating;
        }
    })
    btn.classList.add('active');
    currentPage = 1;
    renderTable()
}