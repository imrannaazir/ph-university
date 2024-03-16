import baseApi from "../../../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create new academic semester
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        body: data,
        method: "POST",
      }),
    }),

    // get all semester
    getAllSemesters: builder.query({
      query: () => ({
        url: "/academic-semester/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useCreateAcademicSemesterMutation } =
  academicSemesterApi;
