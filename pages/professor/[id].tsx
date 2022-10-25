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
import { HttpResponse } from "../../util/http.response.model";
import { getFetcher } from "../../util/fetcher";
import { Fragment, useEffect, useRef, useState } from "react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import AddCourseForm from "../../components/addCourseForm";
import { useFormik } from "formik";
import { Review } from "../../controllers/models";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Dialog, Transition } from "@headlessui/react";

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
        <div className="w-[1200px] m-4 shrink">
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
      className="shadow-lg bg-gradient-to-tr from-slate-600 to-green-500 rounded-lg p-6 flex flex-col justify-center items-center"
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
      className="shadow-lg bg-gradient-to-tr from-slate-600 to-green-500 rounded-lg p-6 flex flex-col justify-center items-center"
      style={{ height: "500px" }}
    >
      TODO
    </div>
  );
};

type CommentProps = CourseComment & { Course: Course };

const CommentSection = (props: ProfessorPageProps) => {
  const { data, error, mutate } = useSWR<HttpResponse<CommentProps>>(
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
            {data.data.map(
              (comment) =>
                comment.comment && (
                  <Comment key={comment.id} data={comment}></Comment>
                )
            )}
          </div>
        );
    }
  }

  const cancelReview = () => {
    setAddingReview(false);
  };

  const reloadComments = (newComment: CommentProps) => {
    mutate({ ...data, data: [...(data?.data as CommentProps[]), newComment] });
  };

  return addingReview ? (
    <div>
      <AddReview
        cancel={cancelReview}
        reload={reloadComments}
        professor={props}
      />
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
  const { comment, Course, createdOn, id } = props.data;
  console.log(id, createdOn);
  return (
    <div className="p-4">
      <div className="w-full">
        <div className="text-sm text-slate-700"></div>
        <div className="text-sm text-slate-700">
          {Course.name} ({Course.code})
        </div>
      </div>
      <div className="text-md">{comment}</div>
    </div>
  );
};

const AddReview = (props: {
  cancel: () => void;
  reload: (newComment: CommentProps) => void;
  professor: ProfessorPageProps;
}) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik<Review>({
    initialValues: {
      comment: null,
      course: null,
      isAnonymous: false,
      section: null,
      year: null,
      semester: null,
      grade: null,
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
    },
    onSubmit: async (values) => {
      setLoading(true);

      const req = await fetch("/api/university/course/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: values,
          professorId: props.professor.professor.id,
        }),
      });
      const res = await req.json();

      if (res.data) {
        props.cancel();
        props.reload(res.data as CommentProps);

        // TODO - add section API call when ready
      }
      setLoading(false);
    },
  });

  const transitionDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = transitionDiv.current;
    if (formik.values.course) {
      div?.classList.add("max-h-0");
      div?.classList.add("max-h-[3000px]");
    } else {
      div?.classList.remove("max-h-[3000px]");
      div?.classList.add("max-h-0");
    }
    return () => {
      div?.classList.remove("max-h-[3000px]");
      div?.classList.add("max-h-0");
    };
  });
  const setRating = (rating: number, index: number) => {
    formik.setFieldValue(`rating${index}`, rating);
  };

  return (
    <form
      className="relative overflow-y-hidden h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="z-10 relative bg-white">
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">Add your review below</div>
          <button
            className="hover:bg-slate-500 hover:outline-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300"
            onClick={() => props.cancel()}
          >
            <XMarkIcon height="2em" width="2em"></XMarkIcon>
          </button>
        </div>
        <div className="my-6 mx-0 lg:mx-3 lg:p-3">
          <label className="text-md">
            Which course did you take with {props.professor.professor.firstName}
            ?
          </label>
          <div className="mt-3">
            <CourseSearch
              setCourse={(course) => {
                formik.setFieldValue("course", course);
              }}
            />
          </div>
        </div>
      </div>

      <div
        ref={transitionDiv}
        className="max-h-0 transition-[max-height] relative ease-in-out overflow-y-hidden duration-1000 delay-50"
      >
        <div className="m-3 p-3">
          <div className="text-center lg:text-left text-md">
            Rate your experience with {props.professor.professor.firstName}
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <label className="text-sm text-center">
                How easy was it to understand their lessons?
              </label>
              <Rating setRating={(rating) => setRating(rating, 1)}></Rating>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-sm text-center">
                How easy were the assignments / exams?
              </label>
              <Rating setRating={(rating) => setRating(rating, 2)}></Rating>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-sm text-center">
                Did they show responsibility to the class?
              </label>
              <Rating setRating={(rating) => setRating(rating, 3)}></Rating>
            </div>
            <div className="flex flex-col items-center">
              <label className="text-sm text-center">
                What would you rate their personality?
              </label>
              <Rating setRating={(rating) => setRating(rating, 4)}></Rating>
            </div>
          </div>
        </div>
        <div className="md:m-6">
          <div className="p-3 border border-slate-500 rounded-lg">
            <label className="text-lg">Course Section Information</label>
            <div className="text-sm">
              This information is optional and completely anonymous but it&nbsp;
              <br className="hidden lg:visible" />
              will help calculate some objective measurements on the professor.
            </div>

            <div className="m-3">
              <label htmlFor="grade" className="text-md">
                Grade Obtained
              </label>
              <select
                className="input-primary"
                defaultValue={"0"}
                id="grade"
                name="grade"
                onChange={formik.handleChange}
              >
                <option value="0">Select a letter grade...</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
                <option value="f">F</option>
              </select>
            </div>

            <div className="m-3">
              <label htmlFor="section" className="text-md">
                Section
              </label>
              <input
                className="input-primary"
                type="text"
                id="section"
                name="section"
                placeholder="e.g. 010"
                onChange={formik.handleChange}
              ></input>
            </div>
            <div className="m-3">
              <label htmlFor="year" className="text-md">
                Year
              </label>
              <select
                className="input-primary"
                defaultValue={"0"}
                id="year"
                name="year"
                onChange={formik.handleChange}
              >
                <option value="0">Select a year...</option>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-3">
              <label htmlFor="semester" className="text-md">
                Semester
              </label>
              <select
                className="input-primary"
                defaultValue={"0"}
                id="semester"
                name="semester"
                onChange={formik.handleChange}
              >
                <option value="0">Select a semester...</option>
                <option value="fall">Fall</option>
                <option value="fall">Spring</option>
              </select>
            </div>
          </div>
        </div>
        <div className="my-6 lg:m-3 lg:p-3">
          <label className="text-md">Leave a comment (optional)</label>
          <textarea
            className="input-primary"
            id="comment"
            name="comment"
            rows={4}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <div className="m-3 flex items-center justify-center">
        {loading ? (
          <button className="disabled p-4 m-6 bg-slate-500 text-slate-100 font-semibold rounded-lg shadow-md cursor-not-allowed">
            Submitting...
          </button>
        ) : (
          <button
            type="submit"
            className="p-4 m-6  bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300"
          >
            Submit Review
          </button>
        )}
      </div>
    </form>
  );
};

const Rating = (props: { setRating: (rating: number) => void }) => {
  const [rating, setRating] = useState(0);

  const setRatingAndPropagate = (rating: number) => {
    setRating(rating);
    props.setRating(rating);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <button
          className={`${
            rating >= 1 ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300`}
          onClick={(e) => {
            e.preventDefault();
            setRatingAndPropagate(1);
          }}
        >
          <StarIcon height="2em" width="2em"></StarIcon>
        </button>
        <button
          className={`${
            rating >= 2 ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300`}
          onClick={(e) => {
            e.preventDefault();
            setRatingAndPropagate(2);
          }}
        >
          <StarIcon height="2em" width="2em"></StarIcon>
        </button>
        <button
          className={`${
            rating >= 3 ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300`}
          onClick={(e) => {
            e.preventDefault();
            setRatingAndPropagate(3);
          }}
        >
          <StarIcon height="2em" width="2em"></StarIcon>
        </button>
        <button
          className={`${
            rating >= 4 ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300`}
          onClick={(e) => {
            e.preventDefault();
            setRatingAndPropagate(4);
          }}
        >
          <StarIcon height="2em" width="2em"></StarIcon>
        </button>
        <button
          className={`${
            rating >= 5 ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300`}
          onClick={(e) => {
            e.preventDefault();
            setRatingAndPropagate(5);
          }}
        >
          <StarIcon height="2em" width="2em"></StarIcon>
        </button>
      </div>
    </div>
  );
};

const CourseSearch = (props: {
  setCourse: (course: Course | null) => void;
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Course | null>(null);
  const [addingCourse, setAddingCourse] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useOutsideClick(dropdownRef, searchRef, setQuery);

  const { data, error } = useSWR<HttpResponse<Course>>(
    !selected && query && query.length > 0
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
    if (!selected && query.length > 0 && !data && !error) {
      return (
        <ul className="search-result bg-white border border-slate-300 ring-1 ring-slate-300 w-full absolute rounded-b-xl">
          <li className="p-2 relative cursor-pointer text-gray-600">
            Loading...
          </li>
        </ul>
      );
    }
    // render results
    if (data && Array.isArray(data.data)) {
      if (data.data.length === 0) {
        return (
          <ul className="bg-white border border-slate-300 ring-1 ring-slate-300 w-full absolute rounded-b-xl">
            <li
              tabIndex={0}
              className="last:rounded-b-xl p-2 relative cursor-pointer text-gray-600"
              onClick={() => setAddingCourse(true)}
            >
              No results. Click to add a new course.
            </li>
          </ul>
        );
      }
      return (
        <ul className="bg-white border border-slate-300 ring-1 ring-slate-300 w-full absolute rounded-b-xl">
          {data.data.map((course) => (
            <li
              tabIndex={0}
              className="last:rounded-b-xl last:border-none border-b-2 border-gray-100 relative cursor-pointer hover:bg-green-50 hover:text-gray-900"
              key={course.id}
              onClick={() => {
                props.setCourse(course);
                setSelected(course);
              }}
            >
              <div className="p-2 w-full h-full">
                {formatResult(course.code)} -{" "}
                <span className="text-gray-600">{course.name}</span>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="w-full relative">
      <AddCourseFormModal
        isOpen={addingCourse}
        onClose={() => setAddingCourse(false)}
        onAdd={(course) => {
          props.setCourse(course);
          setSelected(course);
        }}
      />

      <div>
        <input
          type="text"
          ref={searchRef}
          className={`input-primary rounded-xl ${
            query.length > 0 ? "rounded-b-none" : null
          }`}
          placeholder="Search for a course"
          value={!selected ? query : selected.code}
          onKeyDown={() => {
            if (selected) {
              setQuery(selected.code);
              setSelected(null);
              props.setCourse(null);
            }
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
      </div>
      <div ref={dropdownRef}>{renderResults()}</div>
    </div>
  );
};

const AddCourseFormModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (course: Course | null) => void;
}) => {
  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog onClose={props.onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-6">
            <Dialog.Panel className="mx-auto w-full md:w-3/4 rounded bg-white">
              <Dialog.Title className="text-center font-bold text-xl p-6">
                Add a course
              </Dialog.Title>
              <AddCourseForm
                setCourse={(course) => {
                  props.onAdd(course);
                }}
                close={props.onClose}
              ></AddCourseForm>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
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
