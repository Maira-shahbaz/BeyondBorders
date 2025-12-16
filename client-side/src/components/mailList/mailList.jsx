const MailList = () => {
  return (
    <div className="w-full mt-12 bg-blue-900 text-white flex flex-col items-center gap-5 py-12 px-4">
      <h1 className="text-3xl font-bold">Save time, save money!</h1>
      <span className="text-lg">Sign up and we'll send the best deals to you</span>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Your Email"
          className="w-72 h-10 px-3 rounded-md text-black focus:outline-none"
        />
        <button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MailList;
