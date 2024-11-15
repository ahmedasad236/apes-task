import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import Modal from './Modal';
import { useBookings } from '../contexts/BookingsContext';
import BookingForm from './BookingForm';
import toast from 'react-hot-toast';

function BookingCard({ name, phone, age, email, id, type }: Booking) {
  const { deleteBooking, updateBooking } = useBookings();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-slate-900 text-white relative">
      <header className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="flex gap-2">
          <button onClick={openEditModal}>
            <MdModeEdit className="w-5 h-5 text-blue-500" />
          </button>
          <button onClick={openDeleteModal}>
            <MdDelete className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </header>
      <p className="text-sm mt-2">Age: {age}</p>
      <p className="text-sm mt-2">Phone: {phone}</p>
      <p className="text-sm mt-2">Email: {email}</p>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <p className="text-slate-800">
          Are you sure you want to delete this booking?
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-gray-200 rounded text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteBooking(id)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      >
        <BookingForm
          updateBooking={updateBooking}
          bookingToUpdate={{
            name,
            age,
            phone,
            email,
            id,
            type
          }}
          onSuccess={() => {
            closeEditModal();
            toast.success('Booking updated successfully');
          }}
        />
      </Modal>
    </div>
  );
}

export default BookingCard;
