import notfound from "../assets/notfound.png";
function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={notfound} alt="notFound" className="w-[30rem] md:w-[60rem]" />
    </div>
  );
}

export default NotFound;
