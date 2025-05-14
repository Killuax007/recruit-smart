import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "./ui/button";

export default function ScoreCheck() {
  const location = useLocation();
  const result = location.state;
  console.log(result);
  const score = result?.score || 0;

  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score > 100 ? 100 : score; // max out at 100
    const duration = 1000; // animation duration in ms
    const stepTime = 10;
    const step = (end / duration) * stepTime;

    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setAnimatedScore(Math.round(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);
  const getColor = (value: number) => {
    if (value < 50) return "#ef4444"; // red
    if (value < 80) return "#f59e0b"; // orange
    return "#22c55e"; // green
  };

  const getDescription = (value: number) => {
    if (value < 50) {
      return "Your resume could be improved. Try adding more job-related keywords and highlighting relevant experience.";
    }
    if (value < 80) {
      return "Decent match! Consider fine-tuning your resume for better alignment with the job.";
    }
    return "Excellent match! Your resume aligns well with the job requirements.";
  };

  const progressColor = getColor(animatedScore);
  const description = getDescription(animatedScore);
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <h1 className="text-5xl font-semibold my-10">Score analysis </h1>
      <div className="w-40 h-40">
        <CircularProgressbar
          value={animatedScore}
          text={`${animatedScore}%`}
          styles={buildStyles({
            pathColor: progressColor,
            trailColor: "#e5e7eb",
            textSize: "25px",
          })}
        />
      </div>
      <h2 className="text-xl font-semibold mt-4">Resume Match Score</h2>
      <p className="text-gray-600 mt-2">
        Based on your uploaded resume and job role
      </p>
      <p className="my-6 text-md max-w-md ">{description}</p>
      <Link to={"/jobs"}>
        <Button size={"lg"} className="cursor-pointer">
          Check another
        </Button>
      </Link>
    </div>
  );
}
