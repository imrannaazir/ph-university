import {
  TAcademicDepartment,
  TQueryParam,
  TResponseRedux,
} from "../../../../../types";
import baseApi from "../../../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create academic department
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: `/academic-department`,
        method: "POST",
        body: data,
      }),
    }),

    // get all department
    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, `${item.value}`);
          });
        }

        return {
          url: `/academic-department`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = academicDepartmentApi;
