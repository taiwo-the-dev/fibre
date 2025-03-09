interface PickListProps {
    title: string;
}
const PickList = ({title}:PickListProps) => {
    return (
      <div className='w-full flex items-center justisfy-start gap-x-3 p-3'>
        <div className='w-full border-b border-[#cccccc] p-4'>
          <h3 className='text-lg'>{title}</h3>
          <p className='text-[#667185]'>80 Calories | Serving: 1 Each</p>
        </div>
      </div>
    );
  };
  
  export default PickList;