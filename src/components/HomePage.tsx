import Robot3DModel from "./Robot3DModel";

const HomePage = () => {
  return (
    <div className="w-screen min-h-screen relative">
      <div className="w-full h-full absolute top-0 right-0">
        <Robot3DModel />
      </div>
    </div>
  );
};

export default HomePage;
