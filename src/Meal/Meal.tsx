import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Section from '../components/Section';
import MealForm from './MealForm';

interface ExcelRow {
  "Food name in English": string;
  Fibre?: number;
}

const Meal = () => {
  const [allData, setAllData] = useState<ExcelRow[]>([]); 

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch("/data.xlsx");
        const file = await response.blob();
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (!e.target?.result) return;

          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const parsedData: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);
          setAllData(parsedData); // Store all data
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    };

    fetchExcelData();
  }, []);
  return (
    <>
      <Section>
        <div className='flex flex-col gap-y-3'>
          <h1 className='text-2xl'>Indicate meal of the day</h1>
        </div>

        <div className='flex flex-col gap-y-3 mt-8'>
          <MealForm data={allData} />
          <h1 className='text-2xl my-3'>Your Food</h1>
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
