
const Navbar = () => {
  return (
    <div className="w-full flex justify-between h-[8vh] items-center px-5 p-5 bg-gray-200">
      <div className="w-[10%] flex items-center">
        <h1 className="font-bold text-2xl">LOGO</h1>
      </div>
      <div className="w-[50%]">
        <ul className="w-full flex gap-6 justify-end items-center font-medium text-xl">
            <li className="l cursor-pointer ">Home</li>
            <li className=" cursor-pointer">About</li>
            <li className="cursor-pointer ">Contact</li>
        </ul>
         
      </div>
    </div>
  )
}

export default Navbar
