"use client";
import Input from "@components/form/Input";
import { useForm, Form } from "react-hook-form";
import { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { ProjectMedia } from "./ProjectItem";
export const dynamic = "force-dynamic";

const ADD_PROJECT = gql`
mutation AddProject($project: ProjectInput!, $extention: String!) {
  addProject(project: $project, extention: $extention) {
    _id
  }
}`;
const EDIT_PROJECT = gql`
mutation EditProject($project: ProjectInput!, $extention: String!, $Id:ID!) {
  editProject(project: $project, extention: $extention, projectId: $Id) {
    _id
  }
}`;

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;


const ProejctCard = ({ close, item }) => {
  const { register, control, handleSubmit, watch, formState: { errors }, } = useForm();
  const [addProject, { loading }] = useMutation(ADD_PROJECT);
  const [editProject, { loading: editing }] = useMutation(EDIT_PROJECT);
  const [uploadFile, { loading: uploading }] = useMutation(UPLOAD_FILE);
  const router = useRouter()
  const hiddenFileInput = useRef();

  const { ref, ...rest } = register('media', { required: !item && "Please upload an image or a video..." });

  const onSubmit = async (payload) => {
    try {
      const { media, ...rest } = payload
      const fileExtension = media[0]?.name?.substring(media[0].name.lastIndexOf('.')) || item.extention;
      if (!Array.isArray(rest.tech)) { rest.tech = [rest.tech] }
      const { data } = item
        ? await editProject({ variables: { project: rest, extention: fileExtension, Id: item._id } })
        : await addProject({ variables: { project: rest, extention: fileExtension } })
      if (item) {
        close();
        router.refresh()
      } else {
        const newFile = new File([media[0]], data.addProject._id + fileExtension, { type: media[0].type })
        const res = await uploadFile({ variables: { file: newFile } });
        if (res.data.uploadFile == "OK") {
          close()
          router.refresh()
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (errors?.root?.server) {
      console.log(errors);
    }
  }, [errors]);

  const onUpload = async (event) => {
    if (item) {
      const fileExtension = event.target.files[0]?.name?.substring(event.target.files[0].name.lastIndexOf('.')) || item.extention;
      const updatedFile = new File([event.target.files[0]], item._id + fileExtension, { type: event.target.files[0].type })
      const res = await uploadFile({ variables: { file: updatedFile } });
      console.log(res)
      if (res.data.uploadFile == "OK") {
        close()
        router.refresh()
      }
    }
  }
  if (loading) return 'Submiting...'
  if (editing) return 'Chainging...'
  if (uploading) return 'Uploading...'
  return (
    <div className="max-w-xs w-full shadow-[0_3px_20px_3px] shadow-dark/40 dark:shadow-light/40 rounded overflow-hidden bg-gradient h-full">
      <Form
        className="w-full pt-2 px-4 bg-gradient-to-b h-full from-purple-500/20 to-pink-500/40 pb-6 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      >
        <h1 className="mt-2 mb-4 pb-1 border-b border-current text-center text-xl">
          {item ? `Edit ${item.title} ` : `Add `}Project
        </h1>
        <Input
          name="title"
          label="title"
          autoFocus
          control={control}
          required
          value={item?.title}
        />
        <Input
          name="link"
          label="link"
          required={`Please fill this field...`}
          control={control}
          errors={errors}
          value={item?.link}
        />
        <Input
          name="tech"
          label="tech"
          placeholder="add techs you used. seperate with ;"
          control={control}
          value={item?.tech.join(', ')}
        />
        {item && <>
          <button className={`relative overflow-hidden rounded-lg mt-4`} onClick={(e) => { e.preventDefault(); hiddenFileInput.current.click() }} >
            <ProjectMedia item={item} />
            <div className={`absolute top-0 left-0 w-full h-full z-[70] hover:bg-slate-300/80 pt-12`} >Click to change the media</div>
          </button>
        </>}
        <input
          ref={e => { ref(e); hiddenFileInput.current = e }}
          className={`${item ? 'hidden' : ''}`}
          {...rest}
          type="file"
          onChange={onUpload}
        />
        {errors?.media && (
          <span className="text-danger text-sm ml-12">
            {errors.media.message || "This field is required"}
            {console.log(errors.media)}
          </span>
        )}
        <button
          className="mt-4 w-full text-light bg-dark/80 hover:bg-dark shadow shadow-dark/50 hover:shadow-dark/50 hover:shadow-md py-3 px-6 font-semibold text-md rounded"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default ProejctCard;
