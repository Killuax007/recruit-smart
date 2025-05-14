import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Job } from "../types/job";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function Jobdetails() {
  const [job, setJob] = useState<Job>();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function getJobs() {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}jobs/${id}/`
      );
      const data = await res.data;
      setJob(data);
    }
    getJobs();
  }, [id]);
  const skills =
    typeof job?.skills_required === "string"
      ? job.skills_required.split(",").map((s) => s.trim())
      : job?.skills_required;
  console.log(skills);
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] my-10 md:my-5">
      <Card className="shadow-xl w-full max-w-xl p-4 ">
        {job && (
          <>
            <CardContent className="p-6 text-center">
              <h3 className="text-4xl font-semibold">{job.title}</h3>
            </CardContent>
            <CardContent>
              <p>{job.description}</p>
            </CardContent>
          </>
        )}
        <CardContent className="space-x-4 ">
          {skills?.map((skill) => {
            return (
              <span className=" p-2 text-sm ring-1 font-bold cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-white hover:text-black">
                {skill}
              </span>
            );
          })}
        </CardContent>
        <Link to="/resume" className="">
          <Button className=" font-semibold cursor-pointer " size={"lg"}>
            Check Score{" "}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
