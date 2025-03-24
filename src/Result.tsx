import React from 'react';
import Section from './components/Section';
import info from './assets/info.svg';
import share from './assets/share.svg';
import reload from './assets/reload.svg';
import html2canvas from 'html2canvas';

interface ResultProps {
  personalData: any;
  mealData: any;
  totalFibre: string;
  fibre: string;
}

const Result: React.FC<ResultProps> = ({ personalData, mealData, totalFibre, fibre }) => {
  console.log('Personal Data:', personalData);
  console.log('Meal Data:', mealData);

  // Function to reload the page
  const handleReload = () => {
    window.location.reload();
  };

  // Function to capture screenshot and share
  const handleShare = async () => {
    const element = document.getElementById('result-section');
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL('image/png');

      // Create a temporary link to download the screenshot
      const link = document.createElement('a');
      link.href = image;
      link.download = 'result-screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <>
      {/* Top Section for Screenshot */}
      <Section  className="py-16">
        <section id="result-section" className='p-4'>
        <div className="flex justify-start items-center gap-x-1.5 mb-6">
          <p className="text-xl">Percentage of RDA Fiber per Meal</p>
          <img src={info} alt="info" />
        </div>

        <div className="w-full flex items-center justify-center bg-[#FFEFED] p-16 rounded-lg mt-3">
          <h1 className="text-3xl lg:text-8xl font-bold bg-white border-14 lg:border-24 border-[#FF6347] rounded-full h-50 w-50 lg:h-100 lg:w-100 flex flex-col items-center justify-center text-center gap-y-1.5">
            {totalFibre}g <br /> <span className="text-lg lg:text-5xl font-normal">of {fibre}g</span>
          </h1>
        </div>

        <p className="text-xl mt-4">Your meal contains this amount of fiber content</p>
        </section>
      </Section>

      {/* Action Buttons */}
      <Section className="w-[80%] flex gap-x-12 items-center justify-center">
        {/* Share Result */}
        <div
          className="flex items-center justify-between gap-x-3 cursor-pointer"
          onClick={handleShare}
        >
          <img src={share} alt="share" className="w-8 h-8 p-2 rounded-full bg-[#FF6347]" />
          <p className="text-lg lg:text-2xl">Share result</p>
        </div>

        {/* Reload Page */}
        <div
          className="flex items-center justify-between gap-x-3 cursor-pointer"
          onClick={handleReload}
        >
          <img src={reload} alt="reload" className="w-8 h-8 p-2 rounded-full bg-[#FF6347]" />
          <p className="lg:text-2xl text-lg">Reload counter</p>
        </div>
      </Section>
    </>
  );
};

export default Result;
