const SuccessModal = ({ message }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-color-dark">{message}</h2>
        </div>
      </div>
    );
  };
  
  export default SuccessModal;
  