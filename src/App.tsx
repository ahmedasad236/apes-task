import { Toaster } from 'react-hot-toast';
import BookingForm from './components/BookingForm';
import { HiFolderAdd } from 'react-icons/hi';
import Modal from './components/Modal';
import { useState } from 'react';

function App() {
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
          <BookingForm />
        </Modal>

        {/* Kanban Board Section */}
        <div className="flex flex-col w-full text-center">
          <div className="flex flex-row h-full justify-between gap-2">
            <div className="flex-1">
              <b>Unclaimed</b>
              <div className="bg-blue-500 border border-white h-full mt-2"></div>
            </div>
            <div className="flex-1">
              <b>First Contact</b>
              <div className="bg-blue-500 border border-white h-full mt-2"></div>
            </div>
            <div className="flex-1">
              <b>Preparing Work Offer</b>
              <div className="bg-blue-500 border border-white h-full mt-2"></div>
            </div>
            <div className="flex-1">
              <b>Send to Therapists</b>
              <div className="bg-blue-500 border border-white h-full mt-2"></div>
            </div>
          </div>
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
