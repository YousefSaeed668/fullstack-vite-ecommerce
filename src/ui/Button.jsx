function Button({ onClick, buttonStyle, children, buttonType, disabled }) {
  const styles = {
    admin:
      " bg-primary px-4 py-2 text-white  justify-center font-bold space-x-2 rounded-md",
    client:
      "hover:bg-pblack  text-pblack duration-300 border border-pblack hover:text-white px-2 md:px-4 py-2 mt-4 text-sm md:text-lg",
    details:
      "  text-white duration-300 bg-pblack border border-pblack hover:text-white px-2 md:px-4 py-2 mt-4 text-sm md:text-lg",
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${buttonStyle} ${styles[buttonType]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
