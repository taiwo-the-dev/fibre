import cancel from '../assets/cancel.svg';

interface ResultProps {
  yourMeal: string[];
  updateMealData: (values: Partial<{ yourMeal: string[] }>) => void;
}

const Result: React.FC<ResultProps> = ({ yourMeal, updateMealData }) => {
  const handleRemove = (food: string) => {
    const updatedMeal = yourMeal.filter(item => item !== food);
    updateMealData({ yourMeal: updatedMeal }); // ✅ Updates state directly
  };

  return (
    <div className='w-[80%] flex flex-col gap-y-3'>
      {yourMeal.map((food, index) => (
        <div key={index} className='w-full flex items-center gap-x-3 justify-between'>
          <div className='w-full bg-[#FFEFED] p-4'>
            <h3 className='text-lg'>{food}</h3>
          </div>
          <img
            src={cancel}
            alt='cancel'
            className='cursor-pointer'
            onClick={() => handleRemove(food)}
          />
        </div>
      ))}
    </div>
  );
};

export default Result;
