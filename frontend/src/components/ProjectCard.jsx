"use client";
import Input from "@components/form/Input";
import { useForm, Form } from "react-hook-form";
import { useEffect } from "react";
import { ApolloWrapper } from "@lib/ApolloWrapper";

import { gql, useMutation } from "@apollo/client";
const MUTATION = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;

const [queryRef] = useBackgroundQuery(GetPollDocument, {
  variables: { id: "1", delay: 0 },
});



const fetchData = async (data) => {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  const map = { 0: ["variables.project.file"] };
  formData.append(
    "operations",
    JSON.stringify({
      query: `mutation ($file: Upload!) {singleUpload($file: Upload!)} `,
      variables: { file: null },
    })
  );
  formData.append("map", JSON.stringify(map));
  formData.append("0", data.media[0]);
  const response = await fetch(`http://localhost:3000/graphql`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      subscriptionSpec: "1.0",
      boundary: "graphql",
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: formData,
  });
  console.log(response);
  const data2 = await response.json();
  return data2;
};

const ProejctCard = ({ item }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const arya = await fetchData(data);
      console.log(arya);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <ApolloWrapper>
      <div className="w-full shadow-[0_3px_20px_3px] shadow-dark/40 dark:shadow-light/40 rounded overflow-hidden bg-gradient h-full">
        <Form
          className="w-full pt-2 px-6 bg-gradient-to-b h-full from-purple-500/20 to-pink-500/40 pb-6"
          onSubmit={handleSubmit(onSubmit)}
          // action="/api"
          control={control}
          onSuccess={() => {
            alert("Success");
          }}
          onError={() => {
            alert("error");
          }}
        >
          <h1 className="mt-2 mb-4 pb-1 border-b border-current">
            Add Project
          </h1>
          {/* <Input
          name="title"
          label="title"
          placeholder="title"
          autoFocus
          required={true}
          register={register}
          errors={errors}
          />
          <Input
          name="link"
          label="link"
          placeholder="link"
          register={register}
          required={"Fill this form"}
          errors={errors}
          />
          <Input
          name="tech"
          label="tech"
          placeholder="add techs you used. seperate with ;"
          register={register}
          required={"Fill this form"}
          errors={errors}
        /> */}
          <Input
            type={"file"}
            name="media"
            label="media"
            placeholder="Media Place Holder"
            register={register}
            required={"Add a photo please"}
            errors={errors}
          />
          <button
            className="mt-4 w-full text-light bg-dark/80 hover:bg-dark shadow shadow-dark/50 hover:shadow-dark/50 hover:shadow-md py-3 px-6 font-semibold text-md rounded"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </div>
    </ApolloWrapper>
  );
};

export default ProejctCard;
