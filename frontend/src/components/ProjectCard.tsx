"use client";
import Input from "@components/form/Input3";
import { useForm, Form, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, RefObject } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ProjectMedia } from "./ProjectItem";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import OK from "./modals/OK";

export const dynamic = "force-dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z
    .string()
    .min(1, "This field is required.")
    .max(20, "This field must be 20 characters or less."),
  link: z.string().toLowerCase().min(1, "This field is Required"),
  tech: z.array(z.string()).or(z.string()).optional(),
  media: z.any(),
  // media: z.object(
  //   { 0: z.object({ name: z.string() }) },
  //   {message:"Please provide a cover image or video"}
  // ),
});

type ProjectInputs = z.infer<typeof schema>;

const ADD_PROJECT = gql`
  mutation AddProject($project: ProjectInput!, $extention: String!) {
    addProject(project: $project, extention: $extention) {
      _id
    }
  }
`;
const EDIT_PROJECT = gql`
  mutation EditProject($project: ProjectInput!, $extention: String!, $Id: ID!) {
    editProject(project: $project, extention: $extention, projectId: $Id) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
import type { Project } from "@../src/__generated__/graphql";

type Props = {
  close: () => void;
  item: Project | null;
};

const ProejctCard = ({ close, item }: Props) => {
  const { register, control, handleSubmit, watch, formState } =
    useForm<ProjectInputs>({
      defaultValues: {
        title: item?.title || "",
        link: item?.link || "",
        tech: [item?.tech?.join(", ")] || [],
        media: null,
        // media: null,
      },
      resolver: zodResolver(schema),
    });
  const { errors } = formState;
  const [addProject, { loading, error }] = useMutation(ADD_PROJECT);
  const [editProject, { loading: editing }] = useMutation(EDIT_PROJECT);
  const [uploadFile, { loading: uploading }] = useMutation(UPLOAD_FILE);
  const [errMode, setErrMode] = useState(false);
  const router = useRouter();
  const hiddenFileInput = useRef<HTMLInputElement>();

  const { ref, ...rest } = register("media", {
    required: !item && "Please upload an image or a video...",
  });

  const onSubmit: SubmitHandler<ProjectInputs> = async (
    payload: ProjectInputs
  ) => {
    try {
      const { media, ...rest } = payload;
      console.log(media);
      const fileExtension: string =
        media &&
        (media[0]?.name?.substring(media[0].name.lastIndexOf(".")) ||
          item?.extention);
      if (!Array.isArray(rest.tech)) {
        rest.tech = rest.tech ? [rest.tech] : [];
      }
      const { data } = item
        ? await editProject({
            variables: {
              project: rest,
              extention: fileExtension || item.extention,
              Id: item._id,
            },
          })
        : await addProject({
            variables: { project: rest, extention: fileExtension },
          });
      if (item) {
        close();
        router.refresh();
      } else {
        const newFile = new File(
          [media[0]],
          data.addProject._id + fileExtension,
          { type: media[0].type }
        );
        const res = await uploadFile({ variables: { file: newFile } });
        if (res.data.uploadFile == "OK") {
          close();
          router.refresh();
        }
      }
    } catch (e) {
      setErrMode(true);
      console.log(e);
    }
  };

  useEffect(() => {
    if (errors?.root?.server) {
      console.log(errors);
    }
  }, [formState.errors]);
  useEffect(() => {
    console.log(item);
  }, [item]);

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (item && event.target.files && event.target.files.length > 0) {
      const fileExtension =
        event.target.files[0]?.name?.substring(
          event.target.files[0].name.lastIndexOf(".")
        ) || item.extention;
      const updatedFile = new File(
        [event.target.files[0]],
        item._id + fileExtension,
        { type: event.target.files[0].type }
      );
      const res = await uploadFile({ variables: { file: updatedFile } });
      console.log(res);
      if (res.data.uploadFile == "OK") {
        close();
        // router.refresh()
      }
    }
  };
  if (loading) return "Submiting...";
  if (editing) return "Chainging...";
  if (uploading) return "Uploading...";
  return (
    <>
      {!loading && !editing && !uploading && (
        <div
          className={`absolute z-[40] top-4 right-4 text-sm cursor-pointer`}
          onClick={() => close()}
        >
          <AiOutlineClose />
        </div>
      )}
      <div className="max-w-xs w-full shadow-[0_3px_20px_3px] shadow-dark/40 dark:shadow-light/40 z-[60] rounded overflow-hidden bg-gradient h-full">
        <form
          className="w-full pt-2 px-4 bg-gradient-to-b h-full from-purple-500/20 to-pink-500/40 pb-6 flex flex-col gap-2"
          // control={control}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="mt-2 mb-4 pb-1 border-b border-current text-center text-xl">
            {item ? `Edit ${item.title} ` : `Add `}Project
          </h1>
          <OK
            active={errMode}
            setActive={setErrMode}
            message={error?.message}
          />
          <Input
            name="title"
            label
            autoFocus
            control={control}
          />
          <Input
            name="link"
            label="link"
            control={control}
          />
          <Input
            name="tech"
            label="tech"
            placeholder="add techs you used. seperate with ;"
            control={control}
          />
          {item && (
            <>
              <button
                className={`relative overflow-hidden rounded-[30px] sm:rounded-lg mt-4`}
                onClick={(e) => {
                  e.preventDefault();
                  hiddenFileInput.current!.click();
                }}
              >
                <ProjectMedia item={item} />
                <div
                  className={`absolute top-0 left-0 w-full h-full z-[70] max-sm:bg-slate-300/60 hover:bg-slate-300/80 pt-12`}
                >
                  Click to change the media
                </div>
              </button>
            </>
          )}
          <input
            ref={(e) => {
              ref(e);
              e && (hiddenFileInput.current = e);
            }}
            className={`${item?._id ? "hidden" : ""}`}
            {...rest}
            type="file"
            onChange={onUpload}
          />
          {errors?.media && (
            <span className="text-danger text-sm ml-12">
              {errors.media.message?.toString() || "This field is required"}
            </span>
          )}
          <button
            className="mt-4 w-full text-light bg-dark/80 hover:bg-dark shadow shadow-dark/50 hover:shadow-dark/50 hover:shadow-md py-2 px-6 font-semibold text-2xl rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProejctCard;
