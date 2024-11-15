import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { useBookings } from '../contexts/BookingsContext';

function BookingForm({
  onSuccess,
  updateBooking,
  bookingToUpdate
}: {
  onSuccess: () => void;
  updateBooking?: (id: string, updatedBooking: Partial<Booking>) => void;
  bookingToUpdate?: Booking;
}) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<BookingFormData>({
    defaultValues: {
      name: bookingToUpdate?.name || '',
      email: bookingToUpdate?.email || '',
      phone: bookingToUpdate?.phone || '',
      type: bookingToUpdate?.type || ('Unclaimed' as BookingType),
      age: bookingToUpdate?.age || 10
    }
  });

  const { addBooking } = useBookings();

  function submitForm() {
    if (updateBooking && bookingToUpdate) {
      updateBooking(bookingToUpdate.id, getValues());
    } else addBooking(getValues());
    onSuccess();
  }

  return (
    <form
      className="flex flex-col gap-4 m-2 text-gray-900"
      onSubmit={handleSubmit(submitForm)}
    >
      <h3 className="text-center text-2xl font-bold">Add booking</h3>

      <FormInput
        label="Name:"
        id="name"
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name should be at least 3 characters'
          }
        })}
        error={errors.name?.message}
      />
      <FormInput
        label="Age:"
        id="age"
        type="number"
        {...register('age', {
          valueAsNumber: true,
          min: {
            value: 10,
            message: 'Age should be at least 10'
          }
        })}
        error={errors.age?.message}
      />
      <FormInput
        label="Email:"
        id="email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email'
          }
        })}
        error={errors.email?.message}
      />
      <FormInput
        label="Phone:"
        id="phone"
        type="tel"
        {...register('phone', {
          required: 'Phone is required',
          pattern: {
            value: /^01[0-2]{1}[0-9]{8}$/,
            message: 'Invalid phone number'
          }
        })}
        error={errors.phone?.message}
      />

      <button className="bg-green-600 hover:bg-green-500 transition-all text-white p-2 rounded-md mt-2">
        Submit
      </button>
    </form>
  );
}

export default BookingForm;
