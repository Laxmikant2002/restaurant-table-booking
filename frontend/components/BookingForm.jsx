import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './BookingForm.module.css';

const BookingForm = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [errors, setErrors] = useState({});
    const [availableTimes, setAvailableTimes] = useState([]);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        fetchAvailableTimes(date);
    }, [date]);

    const fetchAvailableTimes = async (selectedDate) => {
        try {
            const formattedDate = selectedDate.toLocaleDateString('en-CA'); // 'YYYY-MM-DD'
            const response = await fetch(`/api/available-slots?date=${formattedDate}`);
            const times = await response.json();
            setAvailableTimes(times);
        } catch (error) {
            console.error('Error fetching available times:', error);
            alert('Failed to fetch available times. Please try again later.');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!contact) newErrors.contact = 'Contact details are required';
        if (!time) newErrors.time = 'Time is required';
        if (numberOfGuests < 1) newErrors.numberOfGuests = 'Guests must be at least 1';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const bookingData = { name, contact, date, time, numberOfGuests };
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const result = await response.json();
                setBookingDetails(result);
                setBookingConfirmed(true);
                setName('');
                setContact('');
                setDate(new Date());
                setTime('');
                setNumberOfGuests(1);
                setErrors({});
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    if (bookingConfirmed && bookingDetails) {
        const { name = 'N/A', contact = 'N/A', date = '', time = '', numberOfGuests = 1 } = bookingDetails;
        return (
            <div className={styles.confirmation}>
                <h2>Booking Confirmed!</h2>
                <p>Thank you for your reservation. Here are your booking details:</p>
                <ul>
                    <li><strong>Name:</strong> {name}</li>
                    <li><strong>Contact:</strong> {contact}</li>
                    <li><strong>Date:</strong> {new Date(date).toLocaleDateString()}</li>
                    <li><strong>Time:</strong> {time}</li>
                    <li><strong>Number of Guests:</strong> {numberOfGuests}</li>
                </ul>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        aria-label="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Contact Details:</label>
                    <input
                        type="text"
                        aria-label="Enter your contact details"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                    {errors.contact && <span className="error">{errors.contact}</span>}
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <Calendar
                        onChange={setDate}
                        value={date}
                    />
                    {errors.date && <span className="error">{errors.date}</span>}
                </div>
                <div className="form-group">
                    <label>Time:</label>
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    >
                        <option value="">Select a time</option>
                        {availableTimes.map((timeSlot) => (
                            <option key={timeSlot} value={timeSlot}>
                                {timeSlot}
                            </option>
                        ))}
                    </select>
                    {errors.time && <span className="error">{errors.time}</span>}
                </div>
                <div className="form-group">
                    <label>Number of Guests:</label>
                    <input
                        type="number"
                        aria-label="Enter number of guests"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                        min="1"
                        required
                    />
                    {errors.numberOfGuests && <span className="error">{errors.numberOfGuests}</span>}
                </div>
                <button type="submit" className={styles.button}>Book Table</button>
            </form>
        </div>
    );
};

export default BookingForm;