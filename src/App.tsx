import toast, { Toaster } from 'react-hot-toast';
import BookingForm from './components/BookingForm';
import { HiFolderAdd } from 'react-icons/hi';
import Modal from './components/Modal';
import { useMemo, useState } from 'react';
import CategoryContainer from './components/CategoryContainer';
import { useBookings } from './contexts/BookingsContext';
function App() {
  const { bookings } = useBookings();

  console.log('bookings: ', bookings);
  const unclaimedBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => booking.type === ('Unclaimed' as BookingType)
      ),
    [bookings]
  );
  const firstContactBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => booking.type === ('First Contact' as BookingType)
      ),
    [bookings]
  );
  const preparingWorkOfferBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => booking.type === ('Preparing Work Offer' as BookingType)
      ),
    [bookings]
  );
  const sentToTherapistBookings = useMemo(
    () =>
      bookings.filter(
        (booking) => booking.type === ('Sent to Therapist' as BookingType)
      ),
    [bookings]
  );

  console.log('unclaimedBookings: ', unclaimedBookings);
  console.log('firstContactBookings: ', firstContactBookings);
  console.log('preparingWorkOfferBookings: ', preparingWorkOfferBookings);
  console.log('sentToTherapistBookings: ', sentToTherapistBookings);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="bg-gray-800 min-h-screen  overflow-y-hidden">
      <header className="flex items-center gap-2 justify-between bg-slate-400 px-1 sm:px-6 py-4 border-b-2 w-screen text-white mb-8">
        <h2 className="text-2xl">Kanban</h2>
        <button
          onClick={openModal}
          className="bg-green-600 text-white px-1 py-2 sm:px-4 sm:py-2 flex items-center hover:bg-green-500 transition-all"
        >
          <span>Add booking</span>
          <HiFolderAdd className="ml-2" />
        </button>
      </header>

      <div className="flex flex-row text-white">
        {/* Form Section */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <BookingForm
            onSuccess={() => {
              setIsModalOpen(false);
              toast.success('Booking added successfully');
            }}
          />
        </Modal>

        {/* Kanban Board Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full px-4">
          <CategoryContainer
            categoryType={'Unclaimed'}
            bookings={unclaimedBookings}
          />

          <CategoryContainer
            categoryType={'First Contact'}
            bookings={firstContactBookings}
          />

          <CategoryContainer
            categoryType={'Preparing Work Offer'}
            bookings={preparingWorkOfferBookings}
          />

          <CategoryContainer
            categoryType={'Sent to Therapist'}
            bookings={sentToTherapistBookings}
          />
        </div>
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: '8px'
        }}
        toastOptions={{
          success: {
            duration: 4000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '16px',
            padding: '16px 24px',
            fontWeight: '500',
            color: 'var(--color-grey-700)'
          }
        }}
      />
    </div>
  );
}

export default App;
