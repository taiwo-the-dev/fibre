import Section from '../components/Section'

const Result = ({fibre}:{fibre:string}) => {
  return (
    <Section>
        <p>Recommended Daily Fiber Intake</p>
        <div className='w-full flex items-center justify-center bg-[#FFEFED] p-16 rounded-lg mt-3'>
            <h1 className='text-8xl font-bold'>{fibre}g</h1>
        </div>
    </Section>
  )
}

export default Result
