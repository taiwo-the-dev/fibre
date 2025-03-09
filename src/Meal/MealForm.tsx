import { Formik, Form, Field } from 'formik';
import MultiSelect from '../components/MultiSelect';
import { foodList, popularFoodList } from './foodList';
import PickList from './PickList';
import { useState } from 'react';

const mealOptions = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Snacks', value: 'snacks' },
];

const popularMeals = ['breakfast', 'lunch', 'dinner', 'snacks'];

interface FoodItem {
  'Food name in English': string;
  Fibre?: number;
}

interface FormValues {
  meal: string;
  mealContent: string[];
  yourMeal: string[]; // ✅ Separate field for PickList selections
}

const MealForm = ({ data }: { data: FoodItem[] }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <Formik<FormValues>
      initialValues={{ meal: '', mealContent: [], yourMeal: [] }} // ✅ Include yourMeal
      onSubmit={(values) => console.log(values)}>
      {({ values, setFieldValue }) => {
        const filteredData = data
          .filter((item) => {
            const itemName = item['Food name in English'].toLowerCase();
            const selectedItems = values.mealContent.map((food) =>
              food.toLowerCase()
            );

            return selectedItems.some((food) => itemName.includes(food));
          })
          .slice(0, visibleCount); // ✅ Limit displayed items initially

        // ✅ Toggle selection for PickList (Separate from mealContent)
        const handlePickListClick = (foodName: string) => {
          const updatedYourMeal = values.yourMeal.includes(foodName)
            ? values.yourMeal.filter((item) => item !== foodName) // Remove if selected
            : [...values.yourMeal, foodName]; // Add if not selected

          setFieldValue('yourMeal', updatedYourMeal);
        };

        return (
          <Form className='space-y-6 w-[80%]'>
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
                    onChange={(value) => setFieldValue('meal', value)}
                    isMulti={false}
                    placeholder='Select a meal...'
                  />
                )}
              </Field>
            </div>

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
                    onChange={(value) => setFieldValue('mealContent', value)}
                    isMulti
                    placeholder='Select meal contents...'
                  />
                )}
              </Field>
            </div>

            {/* ✅ Render PickList for selection (Separate from mealContent) */}
            {filteredData.length > 0 ? (
              <div className='bg-[#F2F6FF] p-4'>
                {filteredData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handlePickListClick(item['Food name in English'])
                    }
                    className={`cursor-pointer p-2 pb-4 border-b border-[#cccccc] ${
                      values.yourMeal.includes(item['Food name in English'])
                        ? 'bg-[#FFEFED]'
                        : 'bg-transparent'
                    }`} // ✅ Highlight selected items
                  >
                    <h3 className='text-lg'>{item['Food name in English']}</h3>
                    <p className='text-[#667185]'>
                      80 Calories | Serving: 1 Each
                    </p>
                  </div>
                ))}

                <div className='w-full flex justify-center'>
                  {/* ✅ "Show More" button */}
                  {filteredData.length >= visibleCount && (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 5)}
                      className='mt-4 px-4 py-2 bg-[#FF6347] text-white rounded-lg'
                      type='button'>
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
