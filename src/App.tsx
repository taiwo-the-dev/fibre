import { useState } from 'react';
import Header from './components/Header';
import Meal from './Meal/Meal';
import Welcome from './welcome/Welcome';
import Result from './Result';
import ReviewMeal from './Review/ReviewMeal';


interface PersonalData {
  name: string;
  age: string;
  gender: string;
}

interface MealData {
  meal: string;
  mealContent: string[];
  yourMeal: string[];
}

function App() {
  const [step, setStep] = useState(1);
  const [disabled, seDisabled] = useState(true);
  const [personalData, setFormData] = useState<PersonalData>({
    name: '',
    gender: '',
    age: '',
  });
  const [mealData, setMealData] = useState<MealData>({
    meal: '',
    mealContent: [],
    yourMeal: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updatePersonalData = (values: Partial<PersonalData>) => {
    setFormData((prev) => ({ ...prev, ...values }));
  };

  const updateMealData = (values: Partial<MealData>) => {
    setMealData((prev) => ({ ...prev, ...values }));
  };

  return (
    <div>
      <Header />
      {step === 1 && <Welcome nextStep={nextStep} updateData={updatePersonalData} personalData={personalData} />}
      {step === 2 && <Meal nextStep={nextStep} updateMealData={updateMealData} mealData={mealData} />}
      {step === 3 && <ReviewMeal nextStep={nextStep} updateMealData={updateMealData} mealData={mealData} disabled={disabled} prevStep={prevStep} />}
      {step === 4 && <Result personalData={personalData} mealData={mealData} />}
    </div>
  )
}

export default App;
