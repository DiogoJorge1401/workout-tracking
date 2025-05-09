function Notification({ message }: { message: string }) {
  return (
    <div className="fixed top-4 right-4 px-4 py-3 bg-green-500 text-white rounded-md shadow-md z-50 transform transition-all duration-300 opacity-100 translate-y-0">
      {message}
    </div>
  );
}

export default Notification;