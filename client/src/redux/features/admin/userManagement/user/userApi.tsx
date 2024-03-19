import baseApi from "../../../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create student
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateStudentMutation } = userApi;
