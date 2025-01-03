import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    contact: { type: String, required: true },
}, { timestamps: true });

const Booking = model('Booking', bookingSchema);

export default Booking;
