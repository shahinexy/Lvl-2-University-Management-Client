import { TQueryParams } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllStudents: builder.query({
      query: (args) =>{
        const params = new URLSearchParams()

        if(args){
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string)
          });
        }

        return {
          url: '/students',
          method: "GET",
          params: params
        }
      }
    }),

    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentsQuery } = userManagementApi;
