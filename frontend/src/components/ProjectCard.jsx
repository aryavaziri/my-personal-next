"use client";
import Input from "@components/form/Input";
import { useForm, Form } from "react-hook-form";
import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

const MUTATION = gql`
mutation AddProject($project: ProjectInput!, $extention: String!) {
  addProject(project: $project, extention: $extention) {
    _id
    extention
  }
}`;

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;


const ProejctCard = ({ close }) => {
  const { register, control, handleSubmit, watch, formState: { errors }, } = useForm();
  const [fetchData] = useMutation(MUTATION);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const router = useRouter()
  const onSubmit = async (payload) => {
    try {
      const { media, ...rest } = payload
      const fileExtension = media[0].name.substring(media[0].name.lastIndexOf('.'));
      const { data } = await fetchData({ variables: { project: rest, extention: fileExtension } });
      const newFile = new File([media[0]], data.addProject._id + fileExtension, { type: media[0].type })
      const res = await uploadFile({ variables: { file: newFile } });
      if (res.data.uploadFile == "OK") {
        close()
        router.refresh()
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
  return (
    <div className="w-full shadow-[0_3px_20px_3px] shadow-dark/40 dark:shadow-light/40 rounded overflow-hidden bg-gradient h-full">
      <Form
        className="w-full pt-2 px-4 bg-gradient-to-b h-full from-purple-500/20 to-pink-500/40 pb-6 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      >
        <h1 className="mt-2 mb-4 pb-1 border-b border-current text-center text-xl">
          Add Project
        </h1>
        <Input
          name="title"
          label="title"
          autoFocus
          control={control}
          required
        />
        <Input
          name="link"
          label="link"
          required={`Please fill this field...`}
          control={control}
          errors={errors}
        />
        <Input
          name="tech"
          label="tech"
          placeholder="add techs you used. seperate with ;"
          control={control}
        />
        <input
          className={`self-center`}
          {...register('media', { required: "Please upload an image or a video..." })}
          type="file"
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
