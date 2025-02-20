import Section from '../components/Section';
import MealForm from './MealForm';
import Result from './Result';

const Meal = () => {
  return (
    <>
      <Section>
        <div className='flex flex-col gap-y-3'>
          <h1 className='text-2xl'>Indicate meal of the day</h1>
        </div>

        <div className='flex flex-col gap-y-3 mt-8'>
          <MealForm />
          <h1 className='text-2xl my-3'>Your Food</h1>
          <Result />
          <Result />
        </div>
      </Section>
      <div></div>
      <div className='w-full flex justify-center mt-8'>
        <button type='submit' className='px-20 py-3 rounded-lg bg-[#FF6347] cursor-pointer text-white text-2xl'>Calculate</button>
      </div>
    </>
  );
};

export default Meal;
