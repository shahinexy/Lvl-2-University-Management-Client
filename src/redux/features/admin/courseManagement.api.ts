import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        addSemesterRegistration: builder.mutation({
            query: (data) => ({
              url: "/semester-regestrations/create-semester-regestration",
              method: "POST",
              body: data,
            }),
          }),
    })
})

export const {useAddSemesterRegistrationMutation} = courseManagementApi