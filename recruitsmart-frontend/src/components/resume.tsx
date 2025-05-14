import Resumeform from "./resume-form";

export default function Resume() {
  return (
    <div className="w-full max-w-2xl mx-auto my-10 ">
      <div className="flex flex-col justify-center items-center h-[80vh] my-10 ">
        <h1 className="font-semibold text-3xl md:text-5xl p-4 my-10 ">
          Fill Details to check your score
        </h1>
        <Resumeform />
      </div>
    </div>
  );
}
