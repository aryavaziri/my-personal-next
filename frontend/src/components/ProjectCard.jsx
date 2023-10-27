"use client";
import Input from "@components/form/Input";
import { useForm, Form } from "react-hook-form";
import { useEffect } from "react";
import { ApolloWrapper } from "@lib/ApolloWrapper";
import { gql, useMutation } from "@apollo/client";

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
    uploadFile(file: $file){filename}
  }
`;


const ProejctCard = ({ item }) => {
  const { register, control, handleSubmit, watch, formState: { errors }, } = useForm();
  const [fetchData] = useMutation(MUTATION);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const onSubmit = async (payload) => {
    try {
      const { media, ...rest } = payload
      const fileExtension = media[0].name.substring(media[0].name.lastIndexOf('.'));
      const { data } = await fetchData({ variables: { project: rest , extention: fileExtension} });
      console.log(data)
      const newFile = new File([media[0]], data.addProject._id + fileExtension, { type: media[0].type })
      await uploadFile({ variables: { file: newFile } });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (errors != {}) {
      console.log(errors);
    }
  }, [errors]);
  return (
    <div className="w-full shadow-[0_3px_20px_3px] shadow-dark/40 dark:shadow-light/40 rounded overflow-hidden bg-gradient h-full">
      <Form
        className="w-full pt-2 px-6 bg-gradient-to-b h-full from-purple-500/20 to-pink-500/40 pb-6"
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      // action="/admin"
      // onSuccess={() => {
      //   alert("Success");
      // }}
      // onError={() => {
      //   alert("error");
      // }}
      >
        <h1 className="mt-2 mb-4 pb-1 border-b border-current">
          Add Project
        </h1>
        <Input
          name="title"
          label="title"
          autoFocus
          control={control}
        // required
        />
        <Input
          name="link"
          label="link"
          // required={`Please fill this field...`}
          control={control}
        />
        <Input
          name="tech"
          label="tech"
          placeholder="add techs you used. seperate with ;"
          control={control}
        />
        <input
          {...register('media',{required:true})}
          type="file"
        />
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
