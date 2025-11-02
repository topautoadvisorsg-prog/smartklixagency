import TeamGrid from "../TeamGrid";

export default function TeamGridExample() {
  const members = [
    {
      name: "Jovan Palomera",
      role: "Director of Strategy & Solutions",
      bio: "Strategic visionary with over 8 years of experience helping businesses leverage technology for growth.",
      initials: "JP"
    },
    {
      name: "Christian De La Rosa",
      role: "Director of Operations",
      bio: "Operations expert focused on delivering projects on time and exceeding client expectations.",
      initials: "CD"
    },
    {
      name: "Sofia Martínez",
      role: "Lead Web Designer",
      bio: "Creative designer with a passion for creating beautiful, functional websites.",
      initials: "SM"
    }
  ];

  return <TeamGrid members={members} />;
}
