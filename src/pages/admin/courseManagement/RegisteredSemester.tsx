import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../types/global";
import { useGetAllRegesteredSemesterQuery, useUpdateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { FieldValues } from "react-hook-form";

type DataType = Pick<
  TSemester,
  "academicSemester" | "status" | "startDate" | "endDate"
>;

const items = [
    {
      label: 'Upcoming',
      key: 'UPCOMING',
    },
    {
      label: 'Ongoing',
      key: 'ONGOING',
    },
    {
      label: 'Ended',
      key: 'ENDED',
    },
  ];

const RegisteredSemester = () => {
  const [semesterId, setsemesterId] = useState()

  const [params, setParams] = useState<TQueryParams[]>([]);

  const { data: studentData, isFetching } =
    useGetAllRegesteredSemesterQuery(params);

    const [updateSemester] = useUpdateSemesterRegistrationMutation()

  const tableData = studentData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: academicSemester?.name,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusUpdate = (data: FieldValues) => {
   const updateData ={
    id: semesterId,
    data: {
      status: data.key
    }
   }
   
   updateSemester(updateData)
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Semester Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;

        if (item === "UPCOMING") {
          color = "blue";
        } else if (item === "ONGOING") {
          color = "green";
        } else if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item }</Tag>
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() =>setsemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div>
      <Table<DataType>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
    </div>
  );
};

export default RegisteredSemester;
