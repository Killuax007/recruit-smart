"use client";

import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-16 p-4 md:p-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Verify and land your next dream job
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Upload your resume and get matched instantly with the best roles.
        </p>
        <Link to={"/jobs"}>
          <Button size={"lg"} className="mt-6 text-lg px-6 py-4 cursor-pointer">
            Get Started
          </Button>
        </Link>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        <Card className="shadow-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">No Sign Up Needed</h3>
            <p className="text-gray-600 mt-2">
              Easily upload your resume and explore jobs without creating an
              account.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">Fast and Easy</h3>
            <p className="text-gray-600 mt-2">
              Just a few clicks to upload your resume and discover relevant job
              matches.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold">Plenty of Job Roles</h3>
            <p className="text-gray-600 mt-2">
              We constantly update our listings to ensure fresh and diverse job
              options.
            </p>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
