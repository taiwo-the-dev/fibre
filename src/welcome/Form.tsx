import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';

const Form = ({ updateData, personalData, setIsValid }: any) => {
  const formik = useFormik({
    initialValues: {
      name: personalData.name || '',
      age: personalData.age === 0 ? '' : personalData.age.toString(),
      gender: personalData.gender || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      age: Yup.number()
        .typeError('Age must be a number')
        .required('Age is required')
        .min(1, 'Age must be at least 1'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: (values) => {
      updateData({ ...values, age: Number(values.age) });
    },
    validateOnMount: true,
  });

  useEffect(() => {
    setIsValid(formik.isValid);
  }, [formik.isValid]);

  // 🔥 Fix: Update personalData whenever form values change
  useEffect(() => {
    updateData({
      name: formik.values.name,
      age: formik.values.age ? Number(formik.values.age) : '',
      gender: formik.values.gender,
    });
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-4'>
      <Input
        label='Name'
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.name && typeof formik.errors.name === 'string'
            ? formik.errors.name
            : undefined
        }
      />
      <Input
        label='Age'
        name='age'
        type='number'
        value={formik.values.age}
        onChange={(e) => {
          const value = e.target.value;
          formik.setFieldValue('age', value === '' ? '' : Number(value));
        }}
        onBlur={(e) =>
          formik.handleBlur(e as React.FocusEvent<HTMLInputElement>)
        }
        error={
          formik.touched.age && typeof formik.errors.age === 'string'
            ? formik.errors.age
            : undefined
        }
      />
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Gender
        </label>
        <div className='flex items-center gap-4 mt-1'>
          <button
            type='button'
            className={`relative w-10 h-6 flex items-center rounded-full p-1 transition-all ${
              formik.values.gender === 'male' ? 'bg-[#F56630]' : 'bg-gray-300'
            }`}
            onClick={() =>
              formik.setFieldValue(
                'gender',
                formik.values.gender === 'male' ? '' : 'male'
              )
            }>
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                formik.values.gender === 'male'
                  ? 'translate-x-4'
                  : 'translate-x-0'
              }`}
            />
          </button>
          <span className='text-gray-700'>Male</span>
          <button
            type='button'
            className={`relative w-10 h-6 flex items-center rounded-full p-1 transition-all ${
              formik.values.gender === 'female' ? 'bg-[#F56630]' : 'bg-gray-300'
            }`}
            onClick={() =>
              formik.setFieldValue(
                'gender',
                formik.values.gender === 'female' ? '' : 'female'
              )
            }>
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                formik.values.gender === 'female'
                  ? 'translate-x-4'
                  : 'translate-x-0'
              }`}
            />
          </button>
          <span className='text-gray-700'>Female</span>
        </div>
        {formik.touched.gender && typeof formik.errors.gender === 'string' && (
          <p className='text-red-500 text-sm mt-1'>{formik.errors.gender}</p>
        )}
      </div>
    </form>
  );
};

export default Form;
