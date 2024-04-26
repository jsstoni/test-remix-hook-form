import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { parseFormData, useRemixForm } from "remix-hook-form";
import { Form, json, useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix-Hook-Form" },
    { name: "description", content: "useRemixForm" },
  ];
};

type Inputs = {
  name: string;
  phone: string;
  age: number;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData: Inputs = await parseFormData(request);
  console.log(formData);
  //get access: formData.name, formData.phone, formData.age
  return json(formData);
}

export default function Index() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<Inputs>({
    mode: "onSubmit",
    submitData: {
      age: 14,
    },
  });

  const data = useActionData<typeof action>();

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <label htmlFor="name">Your name</label>
        <input type="text" {...register("name")} />
        {errors.name && <small>{errors.name.message}</small>}

        <label htmlFor="phone">Your phone</label>
        <input type="text" {...register("phone")} />
        {errors.phone && <small>{errors.phone.message}</small>}

        <button type="submit" style={{ marginRight: "auto" }}>
          Send
        </button>
      </Form>

      {data && (
        <>
          My name is {data.name} and my phone number is: {data.phone}{" "}
          Additionally, I am {data.age} years old.
        </>
      )}
    </>
  );
}
