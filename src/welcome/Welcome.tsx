import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Section from '../components/Section';
import Form from './Form';
import Result from './Result';

const Welcome = ({ nextStep, updateData, personalData }: any) => {
  const [isFormValid, setIsFormValid] = useState(false); 
  const [fibre, setFibre] = useState('0');

  useEffect(() => {
    if (!personalData.age || !personalData.gender) {
      setFibre('0');
      return;
    }
  
    const age = Number(personalData.age);
    const gender = personalData.gender.toLowerCase();
  
    let recommendedFibre = 0;
  
    if (age >= 1 && age <= 3) recommendedFibre = 19;
    else if (age >= 4 && age <= 8) recommendedFibre = 25;
    else if (age >= 9 && age <= 13) recommendedFibre = gender === 'male' ? 31 : 26;
    else if (age >= 14 && age <= 18) recommendedFibre = gender === 'male' ? 38 : 26;
    else if (age >= 19 && age <= 30) recommendedFibre = gender === 'male' ? 38 : 25;
    else if (age >= 31 && age <= 50) recommendedFibre = gender === 'male' ? 38 : 25;
    else if (age >= 51) recommendedFibre = gender === 'male' ? 30 : 21;
  
    setFibre(recommendedFibre.toString());
  }, [personalData.age, personalData.gender]);
  

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
