const bookingForm = document.getElementById('booking-form');
const viewBookingsButton = document.getElementById('view-bookings');
const updateBookingButton = document.getElementById('update-booking');
const deleteBookingButton = document.getElementById('delete-booking');
const bookingsList = document.getElementById('bookings-list');

// Функция для создания бронирования
bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const field = document.getElementById('field').value;

    try {
        const response = await fetch('http://localhost:8080/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time, field }),
        });
        const data = await response.json();
        alert('Booking created: ' + JSON.stringify(data));
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для просмотра всех бронирований
viewBookingsButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8080/booking');
        const data = await response.json();

        bookingsList.innerHTML = '';
        data.forEach((booking) => {
            const bookingItem = document.createElement('div');
            bookingItem.innerText = `ID: ${booking._id}, Date: ${booking.date}, Time: ${booking.time}, Field: ${booking.field}`;
            bookingItem.style.borderBottom = "1px solid #000";
            bookingsList.appendChild(bookingItem);
        });
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для обновления бронирования
updateBookingButton.addEventListener('click', async () => {
    const bookingId = prompt('Введите ID бронирования:');
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const field = document.getElementById('field').value;

    try {
        const response = await fetch(`http://localhost:8080/booking/${bookingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time, field }),
        });

        const data = await response.json();
        alert('Booking updated: ' + JSON.stringify(data));
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Функция для удаления бронирования
deleteBookingButton.addEventListener('click', async () => {
    const bookingId = prompt('Введите ID бронирования для удаления:');

    try {
        const response = await fetch(`http://localhost:8080/booking/${bookingId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Booking deleted');
        } else {
            const data = await response.json();
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
