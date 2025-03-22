import { Formik, Form, Field } from 'formik';
import MultiSelect from '../components/MultiSelect';
import { foodList, popularFoodList } from './foodList';
import { useState } from 'react';

const mealOptions = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Snacks', value: 'snacks' },
];

const popularMeals = ['breakfast', 'lunch', 'dinner', 'snacks'];

interface ExcelRow {
  "Food name in English": string;
  "Fibre (g)": number;
}

interface FormValues {
  meal: string;
  mealContent: string[];
  yourMeal: string[];
}

interface MealFormProps {
  data: ExcelRow[];
  updateMealData: (values: Partial<FormValues>) => void;
  mealData: FormValues;
  setTotalFibre: (value: string) => void;
}

const MealForm: React.FC<MealFormProps> = ({ data, mealData, updateMealData, setTotalFibre }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <Formik<FormValues>
      initialValues={{ meal: mealData.meal, mealContent: mealData.mealContent, yourMeal: mealData.yourMeal }}
      onSubmit={(values) => updateMealData(values)}
    >
      {({ values, setFieldValue }) => {
        // ✅ Ensure selected values are arrays
        const filteredData = data
          .filter((item) => {
            const itemName = item['Food name in English'].toLowerCase();
            return values.mealContent.some((food) => itemName.includes(food.toLowerCase()));
          })
          .slice(0, visibleCount);

        // ✅ Handles adding/removing selected food items
        const handlePickListClick = (foodName: string) => {
          const updatedYourMeal = values.yourMeal.includes(foodName)
            ? values.yourMeal.filter((item) => item !== foodName)
            : [...values.yourMeal, foodName];
        
          // Calculate total fiber from selected food items
          const totalFibre = data
            .filter((item) => updatedYourMeal.includes(item['Food name in English']))
            .reduce((sum, item) => sum + item['Fibre (g)'], 0);
        
          setFieldValue('yourMeal', updatedYourMeal);
          updateMealData({ ...values, yourMeal: updatedYourMeal });
          setTotalFibre(totalFibre.toFixed(1)); // Update fiber state
        };
        

        return (
          <Form className='space-y-6 w-full lg:w-[80%]'>
            {/* Meal Selection */}
            <div>
              <label htmlFor='meal' className='block mb-3'>
                Meal
              </label>
              <Field name='meal'>
                {() => (
                  <MultiSelect
                    options={mealOptions}
                    popularOptions={popularMeals}
                    selectedValue={values.meal}
                    onChange={(value) => {
                      // ✅ Ensure single value selection
                      const selectedMeal = typeof value === 'string' ? value : '';
                      setFieldValue('meal', selectedMeal);
                      updateMealData({ ...values, meal: selectedMeal });
                    }}
                    isMulti={false}
                    placeholder='Select a meal...'
                  />
                )}
              </Field>
            </div>

            {/* Meal Content Selection */}
            <div>
              <label htmlFor='mealContent' className='block mb-3'>
                Meal Contents
              </label>
              <Field name='mealContent'>
                {() => (
                  <MultiSelect
                    options={foodList}
                    popularOptions={popularFoodList}
                    selectedValue={values.mealContent}
                    onChange={(value) => {
                      // ✅ Ensure multi-select values are always an array
                      const selectedMealContent = Array.isArray(value) ? value : [value];
                      setFieldValue('mealContent', selectedMealContent);
                      updateMealData({ ...values, mealContent: selectedMealContent });
                    }}
                    isMulti
                    placeholder='Select meal contents...'
                  />
                )}
              </Field>
            </div>

            {/* Display Selected Foods */}
            {filteredData.length > 0 ? (
              <div className='bg-[#F2F6FF] p-4'>
                {filteredData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handlePickListClick(item['Food name in English'])}
                    className={`cursor-pointer p-2 pb-4 border-b border-[#cccccc] ${
                      values.yourMeal.includes(item['Food name in English']) ? 'bg-[#FFEFED]' : 'bg-transparent'
                    }`}
                  >
                    <h3 className='text-lg'>{item['Food name in English']}</h3>
                    <p className='text-[#667185]'>80 Calories | Serving: 1 Each</p>
                  </div>
                ))}

                {/* Load More Button */}
                <div className='w-full flex justify-center'>
                  {filteredData.length >= visibleCount && (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 5)}
                      className='mt-4 px-4 py-2 bg-[#FF6347] text-white rounded-lg'
                      type='button'
                    >
                      Load more +
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className='text-gray-500'>No matching items found.</p>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default MealForm;
