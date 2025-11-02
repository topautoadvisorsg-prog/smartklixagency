import TeamCard from "../TeamCard";

export default function TeamCardExample() {
  return (
    <div className="p-8 bg-background">
      <TeamCard
        name="Jovan Palomera"
        role="Director of Strategy & Solutions"
        initials="JP"
      />
    </div>
  );
}
