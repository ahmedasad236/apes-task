import BookingCard from './BookingCard';

function CategoryContainer({
  categoryType,
  bookings
}: {
  categoryType: string;
  bookings: Booking[];
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-300 h-[50vh] sm:h-[70vh]  w-full p-2 rounded-md">
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
            name={booking.name}
            age={booking.age}
            phone={booking.phone}
            email={booking.email}
            id={booking.id}
            type={booking.type}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryContainer;
