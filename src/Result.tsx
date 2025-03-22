import Section from './components/Section';
import info from './assets/info.svg';
import share from './assets/share.svg';

const Result = ({ personalData, mealData, totalFibre, fibre }: any) => {
  console.log('Personal Data:', personalData);
  console.log('Meal Data:', mealData);

  return (
    <>
      <Section className='py-16'>
        <div className='flex justify-start items-center gap-x-1.5 mb-6'>
          <p className='text-xl'>Percentage of RDA Fiber per Meal</p>
          <img src={info} alt='info' />
        </div>

        <div className='w-full flex items-center justify-center bg-[#FFEFED] p-16 rounded-lg mt-3'>
          <h1 className='text-5xl lg:text-8xl font-bold bg-white border-24 border-[#FF6347] rounded-full h-60 w-60 lg:h-100 lg:w-100 flex flex-col items-center justify-center text-center gap-y-1.5'>
            {totalFibre}g <br /> <span className='text-3xl lg:text-5xl font-normal'>of {fibre}g</span>
          </h1>
        </div>

        <p className='text-xl mt-4'>
        Your meal contains this amount of fiber content
        </p>
      </Section>
      <Section className=' w-[80%] flex gap-x-12 items-center justify-center'>
        <div className='flex items-center justify-between gap-x-3 cursor-pointer'>
          <img src={share} alt='share' className='w-8 h-8 p-2 rounded-full bg-[#FF6347]' />
          <p className='text-lg lg:text-2xl'>Share result</p>
        </div>
        <div className='flex items-center justify-between gap-x-3'>
          <img src={share} alt='share' className='w-8 h-8 p-2 rounded-full bg-[#FF6347]' />
          <p className='lg:text-2xl text-lg'>Reload counter</p>
        </div>
      </Section>
    </>
  );
};

export default Result;
