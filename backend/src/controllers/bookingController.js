import Booking from '../models/bookingModel.js';

export const createBooking = async (req, res) => {
    try {
        const { name, date, time, numberOfGuests, contact } = req.body;

        if (!name || !date || !time || !numberOfGuests || !contact) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const bookingExists = await Booking.findOne({ date, time });
        if (bookingExists) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const booking = new Booking({ name, date, time, numberOfGuests, contact });
        await booking.save();

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};
