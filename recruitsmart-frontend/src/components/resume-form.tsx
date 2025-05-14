"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "./ui/button";
import type { Job } from "../types/job";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Enter a valid email" }),
  resume_file: z.any(),
  job: z.string(),
});

export default function Resumeform() {
  const [isSubmit, setisSubmit] = useState(false);
  const [jobs, setjobs] = useState<Job[]>([]);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      resume_file: "",
      job: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setisSubmit(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}resumes/`,
        {
          candidate_name: values.username,
          email: values.email,
          job: values.job,
          resume_file: values.resume_file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Score fetched successfully ✅");
      navigate("/score-check", { state: res.data });
      console.log(res.data);
    } catch (error) {
      setisSubmit(false);
      console.log(error);
    }
  }
  useEffect(() => {
    async function getJobs() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}jobs/`);
      const data = await res.data;
      setjobs(data);
    }
    getJobs();
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-xl"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume_file"
          render={() => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Select your resume"
                  onChange={(e) =>
                    form.setValue(
                      "resume_file",
                      e.target.files?.[0] as unknown as FileList
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobs &&
                    jobs.map((job, i) => {
                      return (
                        <SelectItem key={i} value={job.id.toString()}>
                          {job?.title}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" className="font-bold" size={"lg"}>
            {isSubmit ? (
              <span className="flex">
                <Loader2 className=" animate-spin mr-1 size-5" />
                Calculating
              </span>
            ) : (
              <span>Check</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
