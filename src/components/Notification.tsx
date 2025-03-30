function Notification({ message }:{ message: string }) {
  return (
    <div className="notification show">
      {message}
    </div>
  );
}

export default Notification;