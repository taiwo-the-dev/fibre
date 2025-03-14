import { Formik, Form, Field } from 'formik';
import MultiSelect from '../components/MultiSelect';
import { foodList, popularFoodList } from './foodList';
import { useState } from 'react';
import Result from './Result';

const mealOptions = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Snacks', value: 'snacks' },
];

const popularMeals = ['breakfast', 'lunch', 'dinner', 'snacks'];

interface ExcelRow {
  "Food name in English": string;
  Fibre?: number;
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
  disabled: boolean;
}

const ReviewForm: React.FC<MealFormProps> = ({ data, mealData, updateMealData, disabled }) => {

  return (
    <Formik<FormValues>
      initialValues={{ meal: mealData.meal, mealContent: mealData.mealContent, yourMeal: mealData.yourMeal }}
      onSubmit={(values) => updateMealData(values)}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className='space-y-6 w-[80%]'>
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
                    disabled={disabled}
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
                    disabled={disabled}
                  />
                )}
              </Field>
            </div>
           
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReviewForm;
