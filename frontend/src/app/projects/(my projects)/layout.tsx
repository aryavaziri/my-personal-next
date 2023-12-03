const ProjectLayout = ({ children }: React.PropsWithChildren  ) => {
  return (
    <div className={`relative w-screen px-4 sm:px-20 md:px-28 text-justify`}>
      {children}{" "}
    </div>
  );
};

export default ProjectLayout;
