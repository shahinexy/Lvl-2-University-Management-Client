import { TSemester } from "../../../types/courseManagement.type";
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
    }),

    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-regestrations/create-semester-regestration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegesteredSemesterQuery,
} = courseManagementApi;
