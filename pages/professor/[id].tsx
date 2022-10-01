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
import { Textarea, TextInput } from "flowbite-react";
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
        <div className="w-[1024px] m-4 shrink">
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
    <div>
      <AddReview cancel={cancelReview} professor={props} />
    </div>
  ) : (
    <div>
      <div className="flex justify-between items-center">
        <span className=" font-bold text-2xl">Comments</span>
        <button
          onClick={() => setAddingReview(true)}
          className="p-4 m-6 mr-0 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300"
        >
          Add a review
        </button>
      </div>
      <hr className="bg-black border border-black"></hr>
      <div className="m-6 ml-0">{commentsSection}</div>
    </div>
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

const AddReview = (props: {
  cancel: () => void;
  professor: ProfessorPageProps;
}) => {
  const [comment, setComment] = useState({
    comment: "",
    courseId: -1,
    isAnonymous: false,
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
  });

  const setCourse = (course: Course) => {
    setComment({ ...comment, courseId: course.id });
  };

  return (
    <form className="p-3">
      <div className="m-3 flex justify-between items-center">
        <div className="font-bold text-lg">Add your review below</div>
        <button
          className="hover:bg-slate-500 hover:outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300"
          onClick={() => props.cancel()}
        >
          <XMarkIcon height="2em" width="2em"></XMarkIcon>
        </button>
      </div>
      <div className="m-3">
        <label className="text-md">
          Which course did you take with {props.professor.professor.firstName}?
        </label>
        <CourseSearch setCourse={setCourse} />
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." rows={4} />
    </form>
  );
};

const CourseSearchOrNew = (props: { setCourse: (course: Course) => void }) => {
  const [addingCourse, setAddingCourse] = useState(false);
};

const CourseSearch = (props: { setCourse: (course: Course) => void }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const { data, error } = useSWRImmutable<HttpResponse<Course>>(
    selected === "" && query && query.length > 0
      ? "/api/university/course?search=" + query
      : null,
    getFetcher
  );

  const formatResult = (courseCode: string) => {
    const lowerCaseFullName = courseCode.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    const index = lowerCaseFullName.indexOf(lowerCaseQuery);
    if (index === 0) {
      return (
        <span>
          <b>{courseCode.substring(0, query.length)}</b>
          {courseCode.substring(query.length, courseCode.length)}
        </span>
      );
    } else if (index !== -1) {
      const beginning = courseCode.substring(0, index);
      const middle = courseCode.substring(index, index + query.length);
      const end = courseCode.substring(index + query.length, courseCode.length);
      return (
        <span>
          {beginning}
          <b>{middle}</b>
          {end}
        </span>
      );
    }
    return <span>{courseCode}</span>; // this shouldn't happen but just in case
  };

  const renderResults = () => {
    // render loading
    if (selected === "" && query.length > 0 && !data && !error) {
      return (
        <ul className="search-result bg-white border border-gray-100 w-full absolute">
          Loading...
        </ul>
      );
    }
    // render results
    if (data && Array.isArray(data.data)) {
      if (data.data.length === 0) {
        return (
          <ul className="bg-white border border-gray-100 w-full absolute">
            <li className="search-result pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer text-gray-600">
              No results. Click to add a new course.
            </li>
          </ul>
        );
      }
      return (
        <ul className="bg-white border border-gray-100 w-full absolute">
          {data.data.map((course) => (
            <li
              className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-green-50 hover:text-gray-900 search-result"
              key={course.id}
              onClick={() => {
                console.log(course);
                props.setCourse(course);
                setSelected(course.code);
              }}
            >
              {formatResult(course.code)}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div
      onBlur={(e) => {
        console.log(e.relatedTarget);
      }}
      className="w-full relative"
    >
      <TextInput
        placeholder="Search for a course"
        value={selected === "" ? query : selected}
        onFocus={() => {
          setQuery(selected);
          setSelected("");
        }}
        required={true}
        onChange={(e) => {
          if (selected === "") {
            setQuery(e.target.value);
          }
        }}
      ></TextInput>
      {renderResults()}
    </div>
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
