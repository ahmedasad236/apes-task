import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface BookingsContextProps {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  deleteBooking: (id: string) => void;
  updateBooking: (id: string, updatedBooking: Partial<Booking>) => void;
  filterBookingsByType: (type: BookingType) => Booking[];
}

const BookingsContext = createContext<BookingsContextProps | undefined>(
  undefined
);

export const BookingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on initial render
  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking = { ...booking, id: uuidv4() };
    setBookings((prev) => [...prev, newBooking]);
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      )
    );
  };

  const filterBookingsByType = (type: BookingType): Booking[] => {
    return bookings.filter((booking) => booking.type === type);
  };

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        addBooking,
        deleteBooking,
        updateBooking,
        filterBookingsByType
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = (): BookingsContextProps => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};
