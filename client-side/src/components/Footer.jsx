const Footer = () => {
  const lists = [
    ["Countries","Regions","Cities","Districts","Airports","Hotels"],
    ["Homes","Apartments","Resorts","Villas","Hostels","Guest houses"],
    ["Unique places to stay","Reviews","Unpacked: Travel articles","Travel communities","Seasonal and holiday deals"],
    ["Car rental","Flight Finder","Restaurant reservations","Travel Agents"],
    ["Customer Service","Partner Help","Careers","Sustainability","Press center","Safety Resource Center","Investor relations","Terms & conditions"]
  ];

  return (
    <footer className="bg-gray-100 mt-16 py-10 w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between gap-6">
        {lists.map((list, idx) => (
          <ul key={idx} className="flex flex-col gap-2 text-blue-600 text-sm">
            {list.map((item, i) => <li key={i} className="cursor-pointer hover:text-blue-800">{item}</li>)}
          </ul>
        ))}
      </div>
      <div className="text-center text-gray-500 text-xs mt-8">
        Copyright © 2022 Lamabooking.
      </div>
    </footer>
  );
};

export default Footer;
