import baseApi from "../../../../api/baseApi";

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create faculty
    createFaculty: builder.mutation({
      query: (data) => ({
        url: `/users/create-faculty`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateFacultyMutation } = facultyApi;
