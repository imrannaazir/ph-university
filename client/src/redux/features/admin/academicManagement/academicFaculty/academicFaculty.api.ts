import {
  TAcademicFaculty,
  TQueryParam,
  TResponseRedux,
} from "../../../../../types";
import baseApi from "../../../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create academic faculty
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicFaculties"],
    }),
    // get all academic faculty
    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, `${item.value}`);
          });
        }

        return {
          url: `/academic-faculties`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["academicFaculties"],
    }),
  }),
});

export const {
  useCreateAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
} = academicFacultyApi;
