import {
  Course,
  CourseComment,
  Department,
  Professor,
  University,
} from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import defaultPic from "../../public/defaultpic.png";
import { NextPageContext } from "next";
import professorController from "../../controllers/professor";
import { Textarea } from "flowbite-react";
import useSWRImmutable from "swr/immutable";
import { HttpResponse } from "../../util/http.response.model";
import { getFetcher } from "../../util/fetcher";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ProfessorPageProps {
  professor: Professor & {
    university: University;
    department: Department | null;
  };
}

const ProfessorPageWrapper = ({
  professor,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return status === 200 ? (
    <ProfessorPage professor={professor}></ProfessorPage>
  ) : (
    <div>Error {status}</div>
  );
};

const ProfessorPage = (props: ProfessorPageProps) => {
  return (
    <>
      <div className="p-2 lg:p-5 grid grid-cols-1 md:grid-cols-2">
        <div className="m-2">
          <ProfessorBasicInfo professor={props.professor} />
        </div>
        <div className="m-2">
          <ProfessorCourseStatistics professor={props.professor} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl mx-3">
          <CommentSection professor={props.professor}></CommentSection>
        </div>
      </div>
    </>
  );
};

const ProfessorBasicInfo = (props: ProfessorPageProps) => {
  const { firstName, lastName, university, department, picture } =
    props.professor;

  return (
    <div
      className="shadow-lg bg-green-500 rounded-lg p-6 flex flex-col justify-center items-center"
      style={{ height: "500px" }}
    >
      <div className="text-3xl text-center font-bold text-white">
        {firstName} {lastName}
      </div>
      <div className="flex justify-center m-6">
        <Image
          src={defaultPic}
          alt={`${firstName} ${lastName}`}
          width={defaultPic.width > 300 ? 300 : defaultPic.width}
          height={
            defaultPic.width > 300
              ? (300 / defaultPic.width) * defaultPic.height
              : defaultPic.height
          }
        ></Image>
      </div>
      <div className="text-xl text-center text-gray-100">
        {university.name}, {department?.name} Department
      </div>
    </div>
  );
};

const ProfessorCourseStatistics = (props: ProfessorPageProps) => {
  return (
    <div
      className="shadow-lg bg-green-500 rounded-lg p-6 flex flex-col justify-center items-center"
      style={{ height: "500px" }}
    >
      TODO
    </div>
  );
};

type CommentProps = {
  comment: CourseComment & { course: Course };
};

const CommentSection = (props: ProfessorPageProps) => {
  const { data, error } = useSWRImmutable<HttpResponse<CommentProps>>(
    "/api/university/course/comment?professorId=" + props.professor.id,
    getFetcher
  );

  const [addingReview, setAddingReview] = useState(false);

  let commentsSection = <div>Loading...</div>;
  if (error) {
    commentsSection = <div>Error: could not load comments</div>;
  } else if (data && data.data) {
    if (Array.isArray(data.data)) {
      commentsSection =
        data.data.length === 0 ? (
          <div>No comments yet</div>
        ) : (
          <div>
            {data.data.map((data) => (
              <Comment key={data.comment.id} data={data}></Comment>
            ))}
          </div>
        );
    }
  }

  const cancelReview = () => {
    setAddingReview(false);
  };

  return addingReview ? (
    <AddReview cancel={cancelReview} />
  ) : (
    <>
      <div className="flex justify-between items-center">
        <span className=" font-bold text-2xl">Comments</span>
        <button
          onClick={() => setAddingReview(true)}
          className="p-4 m-6 mr-0 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Add a review
        </button>
      </div>
      <hr className="bg-black border border-black"></hr>
      <div className="m-6 ml-0">{commentsSection}</div>
    </>
  );
};

const Comment = (props: { data: CommentProps }) => {
  const { comment } = props.data;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col justify-center items-center">
          <div>
            Comment for {comment.course.name} ({comment.course.code})
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="text-lg">{comment.comment}</div>
      </div>
    </div>
  );
};

const AddReview = (props: { cancel: () => void }) => {
  return (
    <form className="p-3">
      <div className="flex justify-between items-center">
        <div className=" text-lg">Add your review below</div>
        <button onClick={() => props.cancel()}>
          <XMarkIcon height="2em" width="2em"></XMarkIcon>
        </button>
      </div>
      <div></div>
      <Textarea id="comment" placeholder="Leave a comment..." rows={4} />
    </form>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  if (id && typeof id === "string") {
    const parsedId = parseInt(id);
    if (!isNaN(parsedId)) {
      const professor = await professorController.findProfessorWithIncludeById(
        parsedId
      );
      return professor
        ? { props: { professor, status: 200 } }
        : { props: { professor: null, status: 404 } };
    }
    return { props: { professor: null, status: 405 } };
  }
  return { props: { professor: null, status: 500 } };
}

export default ProfessorPageWrapper;
