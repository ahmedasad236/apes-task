import { useBookings } from '../contexts/BookingsContext';
import BookingCard from './BookingCard';

function CategoryContainer({
  categoryType,
  bookings
}: {
  categoryType: string;
  bookings: Booking[];
}) {
  const { updateBooking } = useBookings();
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allows dropping
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const bookingId = e.dataTransfer.getData('bookingId'); // Retrieve the dragged booking ID
    if (bookingId) {
      updateBooking(bookingId, { type: categoryType as BookingType }); // Update the type to move to this category
    }
  };
  return (
    <div
      onDragOver={handleDragOver} // Event triggered when dragging over this container
      onDrop={handleDrop} // Event triggered when dropping into this container
      className="flex flex-col gap-2 bg-slate-300 h-[50vh] sm:h-[70vh]  w-full p-2 rounded-md"
    >
      <header className="flex justify-between items-center text-slate-900">
        <h3 className="text-sm font-bold">{categoryType}</h3>
        <h4 className="text-sm font-bold rounded-full w-4 h-4 bg-white text-center">
          {bookings.length}
        </h4>
      </header>
      <div className="flex flex-col gap-2 h-full overflow-y-auto">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            {...booking}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryContainer;
