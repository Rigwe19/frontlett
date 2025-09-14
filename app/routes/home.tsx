import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Frontlett Virtualting" },
    { name: "description", content: "transform the Way You Work: Flexible Hiring, Maximum Impact. Empowering companies and resources through timeslot hiring" },
  ];
}

export default function Home() {
  // return <Navigate to="/onboarding/get-started" />
  return <Welcome />;
}
