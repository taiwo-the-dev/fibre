import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Section from '../components/Section';
import Form from './Form';
import Result from './Result';

const Welcome = ({ nextStep, updateData, personalData }: any) => {
  const [isFormValid, setIsFormValid] = useState(false); 
  const [fibre, setFibre] = useState('0');

  // 🔥 Update fibre value based on personalData.age
  useEffect(() => {
    if (!personalData.age) {
      setFibre('0');
      return;
    }
    
    const age = Number(personalData.age);
    if (age >= 2 && age < 5) setFibre('15');
    else if (age >= 5 && age < 11) setFibre('20');
    else if (age >= 11 && age < 17) setFibre('25');
    else if (age >= 17) setFibre('30');
    else setFibre('0'); // Default case
  }, [personalData.age]);

  return (
    <>
      <Section>
        <div className='flex flex-col gap-y-3'>
          <h1 className='text-2xl'>Welcome to Fiber Counter</h1>
          <p>Please enter your details to get started</p>
        </div>

        <div className='flex flex-col gap-y-3 mt-8'>
          <Form updateData={updateData} personalData={personalData} setIsValid={setIsFormValid} />
        </div>
      </Section>
      
      {/* 🔥 Pass the updated fibre value to Result */}
      <div>
        <Result fibre={fibre} />
      </div>

      <div className='w-full lg:w-1/2 mx-auto'>
        <div className='w-full flex justify-center lg:justify-end items-start mt-5'>
          <Button onClick={nextStep} disabled={!isFormValid}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
