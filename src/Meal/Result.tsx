import cancel from '../assets/cancel.svg';

const Result = () => {
  return (
    <div className='w-[80%] flex items-center justisfy-start gap-x-3'>
      <div className='w-full bg-[#FFEFED] p-4'>
        <h3 className='text-lg'>Apple, fresh, medium, dole</h3>
        <p className='text-[#667185]'>80 Calories | Serving: 1 Each</p>
      </div>
      <img src={cancel} alt='cancel' className='cursor-pointer' />
    </div>
  );
};

export default Result;
