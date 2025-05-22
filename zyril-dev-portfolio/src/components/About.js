const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-5 px-5 pt-24 md:pt-28 flex flex-col justify-center items-center text-center border-b border-neutral-700 bg-neutral-900"
    >
      {/* iPhone Cutout */}
      <div className="w-[300px] h-[600px] bg-neutral-800 rounded-[45px] p-3 shadow-2xl relative flex flex-col overflow-hidden border border-neutral-700">
        {/* Notch */}
        <div className="self-center w-[140px] h-7 bg-black rounded-b-2xl mt-[-2px] z-10"></div>
        {/* Screen Content */}
        <div className="bg-white text-neutral-800 flex-grow rounded-[33px] p-6 pt-8 -mt-[18px] overflow-y-auto text-left z-0">
          <h2 className="mt-0 text-blue-600 text-2xl font-semibold mb-4"> {/* Blue on white is fine */}
            Hello, I'm Zyril!
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-neutral-700">
            A passionate and dedicated Mobile Application Developer with a knack for
            crafting intuitive, engaging, and high-performance apps for both iOS and Android.
          </p>
          <p className="text-sm leading-relaxed text-neutral-700">
            I thrive on turning complex problems into elegant solutions and continuously explore
            new technologies to enhance user experiences. My journey in tech is driven by a love for innovation and a commitment to quality.
          </p>
        </div>
        {/* Home Indicator */}
        <div className="self-center w-[120px] h-[5px] bg-gray-600 rounded-full mt-2 mb-1"></div>
      </div>
    </section>
  );
};
export default About;