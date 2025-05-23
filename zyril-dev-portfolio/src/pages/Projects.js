const projectData = [
  { id: 1, title: 'Flutter Portfolio (Old)', description: 'A dynamic portfolio built with Flutter, showcasing skills in cross-platform development. (Previous Version)', imageUrl: 'https://via.placeholder.com/350x200/673AB7/FFFFFF?text=Flutter+Portfolio' },
  { id: 2, title: 'E-commerce App UI', description: 'Sleek and user-friendly UI/UX design for a conceptual mobile e-commerce platform.', imageUrl: 'https://via.placeholder.com/350x200/00897B/FFFFFF?text=E-commerce+UI' },
  { id: 3, title: 'Task Manager Pro', description: 'A concept for a feature-rich task management application aimed at boosting productivity.', imageUrl: 'https://via.placeholder.com/350x200/FFB300/000000?text=Task+Manager' },
  { id: 4, title: 'Social Connect App', description: 'Conceptual design for a social networking app focusing on real-time interactions.', imageUrl: 'https://via.placeholder.com/350x200/E91E63/FFFFFF?text=Social+App' },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-0 pt-24 md:pt-28 flex flex-col items-center bg-neutral-900 text-center"
    >
      <h2 className="mb-2 text-3xl md:text-4xl font-bold text-neutral-100">My Projects</h2>
      <p className="text-lg text-neutral-300 mb-10 max-w-xl md:max-w-2xl px-4">
        Here's a glimpse of what I've been working on.
      </p>
      {/* Carousel Container - For better scrollbar hiding, consider a plugin like tailwind-scrollbar-hide */}
      <div className="flex overflow-x-auto py-5 px-5 pb-8 gap-6 w-full snap-x snap-mandatory scrollbar-hide ">
        {projectData.map(project => (
          // Project Card
          <div
            key={project.id}
            className="flex-none w-72 md:w-80 bg-neutral-800 rounded-xl shadow-lg overflow-hidden text-left snap-center transition-all hover:shadow-xl hover:-translate-y-1 border border-neutral-700"
          >
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 md:h-52 object-cover" />
            <div className="p-5">
              <h3 className="mt-0 mb-2 text-sky-400 text-lg md:text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Projects;