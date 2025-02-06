import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semesters",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemesterQuery, useAddAcademicSemesterMutation } = academicManagementApi;
