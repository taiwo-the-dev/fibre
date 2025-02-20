import Section from './components/Section';
import info from './assets/info.svg';
import share from './assets/share.svg';

const Result = () => {
  return (
    <>
      {' '}
      <Section className='py-16'>
        <div className='flex justify-start items-center gap-x-1.5 mb-6'>
          <p className='text-xl'>Recommended Daily Fiber Intake</p>
          <img src={info} alt='info' />
        </div>

        <div className='w-full flex items-center justify-center bg-[#FFEFED] p-16 rounded-lg mt-3'>
          <h1 className='text-8xl font-bold bg-white border-24 border-[#FF6347] rounded-full h-100 w-100 flex flex-col items-center justify-center text-center gap-y-1.5'>
            20g <br /> <span className='text-5xl font-normal'>of 44g</span>
          </h1>
        </div>

        <p className='text-xl mt-4'>
          Based on your daily meal intake, you should consume this much <br />
          fiber every day to maintain a healthy diet
        </p>
      </Section>
      <Section className=' w-[80%] flex gap-x-12 items-center justify-center'>
        <div className='flex items-center justify-between gap-x-3 cursor-pointer'>
            <img src={share} alt="share" className='w-8 h-8 p-2 rounded-full bg-[#FF6347]' />
            <p className='text-2xl'>Share result</p>
        </div>
        <div className='flex items-center justify-between gap-x-3'>
            <img src={share} alt="share" className='w-8 h-8 p-2 rounded-full bg-[#FF6347]'/>
            <p className='text-2xl'>Reload counter</p>
        </div>
      </Section>
    </>
  );
};

export default Result;
