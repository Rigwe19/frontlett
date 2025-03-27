import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Frontlett Virtualting" },
    { name: "description", content: "ransform the Way You Work: Flexible Hiring, Maximum Impact. Empowering companies and resources through timeslot hiring" },
  ];
}

export default function Home() {
  return <Welcome />;
}
