import { Course } from "@prisma/client";

export type Review = {
  course: Course | null;
  section: string | null;
  year: string | null;
  semester: string | null;
  grade: string | null;
  comment: string | null;
  isAnonymous: boolean;
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
};
