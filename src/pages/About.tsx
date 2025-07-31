import React from "react";
import { PublicNavigation } from "@/components/PublicNavigation";

const About = () => (
  <>
    <PublicNavigation />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">About</h1>
      <div>This is the About page.</div>
    </div>
  </>
);

export default About; 