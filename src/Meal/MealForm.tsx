import { Formik, Form, Field } from 'formik';
import MultiSelect from '../components/MultiSelect';

const mealOptions = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Snacks', value: 'snacks' },
];

const mealContents = [
  { label: 'Pancakes', value: 'pancakes' },
  { label: 'Omelette', value: 'omelette' },
  { label: 'Toast', value: 'toast' },
  { label: 'Burger', value: 'burger' },
  { label: 'Pizza', value: 'pizza' },
  { label: 'Salad', value: 'salad' },
  { label: 'Steak', value: 'steak' },
  { label: 'Pasta', value: 'pasta' },
  { label: 'Soup', value: 'soup' },
];

const popularMeals = ['breakfast', 'lunch', 'dinner', 'snacks'];
const popularMealContents = ['pancakes', 'burger', 'pasta'];

const MealForm = () => {
  return (
    <Formik
      initialValues={{ meal: '', mealContent: [] as string[] }}
      onSubmit={(values) => console.log('Form Submitted:', values)}>
      {({ values, setFieldValue }) => (
        <Form className='space-y-6 w-[80%]'>
          {/* Meal Selection (Single Select) */}
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

          {/* Meal Content Selection (Multi Select) */}
          <div>
            <label htmlFor='meal' className='block mb-3'>
              Input content of food
            </label>
            <Field name='mealContent'>
              {() => (
                <MultiSelect
                  options={mealContents}
                  popularOptions={popularMealContents}
                  selectedValue={values.mealContent}
                  onChange={(value) => setFieldValue('mealContent', value)}
                  isMulti
                  placeholder='Select meal contents...'
                  quickLabel='Add from popular food'
                />
              )}
            </Field>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default MealForm;
