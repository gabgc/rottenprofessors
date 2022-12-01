import useSWR from "swr";
import { getFetcher } from "../util/fetcher";
import ProfessorCard from "./ProfessorsCard";

const ProfessorCardWrapper = () => {
  const { data, error } = useSWR("/api/professor", getFetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="overflow-x-scroll flex flex-row scrollbar-hidden h-full">
      {data.data.slice(0, 5).map((professor: any) => {
        return <ProfessorCard key={professor.id} professor={professor} />;
      })}
    </div>
  );
};
export default ProfessorCardWrapper;
