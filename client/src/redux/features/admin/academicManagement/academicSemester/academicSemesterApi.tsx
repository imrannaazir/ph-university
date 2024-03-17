import {
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from "../../../../../types";
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
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, `${item.value}`);
          });
        }

        return {
          url: "/academic-semester/all",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useCreateAcademicSemesterMutation } =
  academicSemesterApi;
