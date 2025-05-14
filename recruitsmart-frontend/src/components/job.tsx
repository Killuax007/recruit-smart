import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import type { Job } from "../types/job";
export default function Job() {
  const [jobs, setjobs] = useState<Job[]>([]);
  useEffect(() => {
    async function getJobs() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}jobs/`);
      const data = await res.data;
      setjobs(data);
    }
    getJobs();
  }, []);
  return (
    <div className="max-w-screen-2xl flex flex-wrap items-center  mx-auto p-2 rounded-md  cursor-pointer">
      <h1 className="text-4xl md:text-5xl my-10  mx-auto ">
        Click to match your job role
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 w-full m-10">
        {jobs &&
          jobs.map((job, i) => {
            return (
              <Card
                className="shadow-xl w-full max-w-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600 "
                key={i}
              >
                <Link key={i} to={`${job.id}`}>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
