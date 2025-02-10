import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { useState } from "react";
import {
  useAssignFacultyMutation,
  useGetAllCoureseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types/courseManagement.type";
import HookForm from "../../../components/form/HookForm";
import HookFormSelector from "../../../components/form/HookFormSelector";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { FieldValues } from "react-hook-form";

type DataType = Pick<TCourse, "title" | "prefix" | "code">;

const Courses = () => {
  const [page, setPage] = useState(2);

  const { data: courseData, isFetching } = useGetAllCoureseQuery(undefined);

  const metaData = courseData?.meta;

  const tableData = courseData?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    prefix,
    code,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <AssignFacultyModal courseData={item}></AssignFacultyModal>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table<DataType>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

const AssignFacultyModal = ({ courseData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignFaculty] = useAssignFacultyMutation();
  
  const { data: facultyData } = useGetAllFacultiesQuery(undefined);

  const facultyOptions = facultyData?.data.map((item) => ({
    label: item.fullName,
    value: item._id,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: FieldValues) => {
    const assignData = {
      courseId: courseData.key,
      data,
    };

    assignFaculty(assignData)
    console.log(assignData);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <HookForm onSubmit={handleSubmit}>
          <HookFormSelector
            label="Faculty"
            name="faculties"
            options={facultyOptions}
            mode="multiple"
          />

          <Button htmlType="submit">Submit</Button>
        </HookForm>
      </Modal>
    </>
  );
};

export default Courses;
