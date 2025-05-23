const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen py-5 px-5 pt-24 md:pt-28 flex flex-col justify-center items-center text-center bg-neutral-850" // Slightly different bg for depth
    >
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">Get In Touch</h2>
      <p className="max-w-lg md:max-w-xl mb-8 text-lg text-neutral-300">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
        Feel free to reach out!
      </p>
      <div>
        <a
          href="mailto:me@zyriltamargo.dev"
          className="py-3 px-6 text-base font-medium cursor-pointer bg-sky-600 text-white border-none rounded-md shadow-md no-underline hover:bg-sky-700 transition-colors"
        >
          Send Me An Email
        </a>
        {/* Add links to LinkedIn, GitHub, etc. here */}
        <a href="https://linkedin.com/in/zyrilt2000" className="ml-4 text-blue-600 hover:underline">LinkedIn</a>
      </div>
    </section>
  );
};
export default Contact;