import { TCourse, TSemester } from "../../../types/courseManagement.type";
import { TQueryParams, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegesteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/semester-regestrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: ["semester"],
    }),

    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-regestrations/create-semester-regestration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),

    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `/semester-regestrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    getAllCourese: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },

      providesTags: ["course"],
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),

    assignFaculty: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegesteredSemesterQuery,
  useUpdateSemesterRegistrationMutation,
  useGetAllCoureseQuery,
  useAddCourseMutation,
  useAssignFacultyMutation,
} = courseManagementApi;
