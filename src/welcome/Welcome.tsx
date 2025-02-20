import Section from '../components/Section';
import Form from './Form';
import Result from './Result';

const Welcome = () => {
  return (
    <>
      <Section>
        <div className='flex flex-col gap-y-3'>
          <h1 className='text-2xl'>Welcome to Fiber Counter</h1>
          <p>Please enter your details to get started</p>
        </div>

        <div className='flex flex-col gap-y-3 mt-8'>
          <Form />
        </div>
      </Section>
      <div>
        <Result />
      </div>
      <div className='w-1/2 mx-auto'>
        <div className='w-full flex justify-end items-start mt-5'>
          <p className='text-orange-400'>Set My Custom Daily Allowance</p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
