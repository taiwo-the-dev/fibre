import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Section from '../components/Section';
import Button from '../components/Button';
import Result from './Result';
import ReviewForm from './ReviewForm';

interface ExcelRow {
  'Food name in English': string;
  Fibre?: number;
}

const ReviewMeal = ({
  nextStep,
  previousStep,
  updateMealData,
  mealData,
  disabled,
}: any) => {
  const [allData, setAllData] = useState<ExcelRow[]>([]);
  const [isMealValid, setIsMealValid] = useState(false);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch('/data.xlsx');
        const file = await response.blob();
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (!e.target?.result) return;

          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const parsedData: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);
          setAllData(parsedData);
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error('Error loading Excel file:', error);
      }
    };

    fetchExcelData();
  }, []);

  useEffect(() => {
    setIsMealValid(!!mealData.meal && mealData.yourMeal.length > 0);
  }, [mealData]);

  return (
    <>
      <Section>
        <div className='flex flex-col gap-y-3'>
          <h1 className='text-2xl'>Indicate meal of the day</h1>
        </div>

        <div className='flex flex-col gap-y-3 mt-8'>
          <ReviewForm
            data={allData}
            mealData={mealData}
            updateMealData={updateMealData}
            disabled={disabled}
          />
        </div>
        <h1 className='text-2xl my-8'>Your Food</h1>
        <Result yourMeal={mealData.yourMeal} updateMealData={updateMealData} />
      </Section>

      <div className='w-full flex gap-x-4 justify-center mt-8'>
        <Button
          onClick={previousStep}
          disabled={!isMealValid}
          className='bg-[#F7F7F7] border border-[#8E98A8] text-black'>
          Previous
        </Button>
        <Button onClick={nextStep} disabled={!isMealValid}>
          Next
        </Button>
      </div>
    </>
  );
};

export default ReviewMeal;
