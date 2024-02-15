import baseApi from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
