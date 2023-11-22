import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Checkbox, Input, Modal, Table } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { deleteTask, getTasks, postTask, putTask } from "../utils/apiRequests";

// here goes Table things

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: string;
  text: string;
  completed: any;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const TastListDetails = () => {
  const location = useLocation();
  const { state } = location;
  const [taskName, setTaskName] = useState("");
  const [openModal1, setOpenModal1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataType | null | any>(null);
  const [tasks, setTasks] = useState<any>([]);
  const [allTasks, setAllTasks] = useState<DataType[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getListTasks = async () => {
      const res = await getTasks(state.id);
      setTasks(res.data);
      const all = tasks.map((task: any) => ({
        completed: task.completed,
        text: task.text,
        key: task.uuid,
      }));
      setAllTasks(all);
      if (res.data.length > 0) {
        setVisible(true);
      }
    };

    getListTasks();
  }, [visible]);

  useEffect(() => {
    if (!allTasks.length) {
      setVisible(false);
    }
  }, [allTasks.length]);

  // api request
  const createTask = async () => {
    try {
      const res = await postTask(taskName, state.id);
      const data = res.data;
      setTasks([...tasks, data]);
      setOpenModal1(false);
      setVisible(true);
      setTaskName("");
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAllTasks(
      tasks.map((task: any) => ({
        completed: task.completed,
        text: task.text,
        key: task.uuid,
      }))
    );
  }, [tasks]);

  const handleDelete = async () => {
    try {
      await deleteTask(selectedItem?.key);
      const newData = allTasks.filter((task) => task.key !== selectedItem?.key);
      setAllTasks(newData);
      setSelectedItem(null);
      setDeleteModal(false);
    } catch (err: any) {
      console.log("err");
    }
  };

  const handleEdit = async () => {
    try {
      if (selectedItem?.key) {
        setSelectedItem((prevState: any) => {
          const a = prevState;
          a.text = taskName;
          return a;
        });
        await putTask(
          selectedItem?.key,
          selectedItem?.text,
          selectedItem?.completed,
          state.id
        );
        const index = allTasks.findIndex(
          (item) => item.key === selectedItem.key
        );
        setAllTasks((previousState) => {
          const a = previousState;
          a[index].text = selectedItem.text;
          a[index].key = selectedItem.key;
          a[index].completed = selectedItem.completed;
          return a;
        });
        setEditable(false);
        setTaskName("");
      }
    } catch (err) {
      console.log("err");
    }
  };

  const showDeleteModal = (item: any) => {
    if (item.key) {
      setSelectedItem(item);
    }
    setDeleteModal(true);
  };

  const showEditModal = (item: any) => {
    if (item.key) {
      setSelectedItem(item);
    }
    setEditable(true);
  };

  const handleCheck = async (record: any) => {
      await putTask(record?.key, record?.text, !record.completed, state.id);
      setAllTasks((previousState) => {
        let a = previousState;
        const index = allTasks.findIndex((item) => item.key === record.key);
        a[index].completed = !record.completed;
        return a;
      });
  };

  const defaultColumns = [
    {
      dataIndex: "checkbox",
      render: (_: any, record: any) =>
        allTasks.length > 0 ? (
          <Checkbox />
        ) : null,
    },
    {
      title: "Task",
      dataIndex: "text",
      editable: true,
    },
    {
      dataIndex: "delete",
      render: (_: any, record: any) =>
        allTasks.length >= 1 ? (
          <div
            className="cursor-pointer"
            onClick={() => showDeleteModal(record)}
          >
            <DeleteOutlined />
          </div>
        ) : null,
    },
    {
      dataIndex: "edit",
      render: (_: any, record: any) =>
        allTasks.length > 0 ? (
          <div className="cursor-pointer" onClick={() => showEditModal(record)}>
            <EditOutlined />
          </div>
        ) : null,
    },
  ];

  return (
    <div className="bg-blue1 w-full flex flex-col items-center text-white py-4 px-4 md:px-8 lg:px-12 min-h-screen h-full">
      <div className="max-w-[1440px] w-full flex justify-center">
        <div className="text-white flex flex-col items-center w-full">
          <div className="border-b border-white pb-4 w-full flex item-center justify-around">
            <h1 className="text-center text-3xl font-serif">
              Doingly <span>&#x2637; </span>
              <span className="capitalize">{state.title}</span>
            </h1>
            <Link to="/protectedRoute">
              <button className="border border-white py-2 px-4 rounded-xl hover:bg-blue2 hover:border-blue2 duration-300">
                <ArrowLeftOutlined /> Back
              </button>
            </Link>
          </div>
          <div className="mt-6 max-w-[400px] md:max-w-[700px] w-full">
            {visible && (
              <Table
                className="w-full"
                rowClassName={() => "editable-row"}
                dataSource={allTasks}
                columns={defaultColumns as ColumnTypes}
                pagination={false}
              />
            )}
          </div>
          <button
            className="bg-blue2 rounded-2xl px-3 py-2 mt-4 hover:bg-blue3 duration-300 focus:outline-none w-[50px] h-[50px] flex justify-center items-center"
            onClick={() => setOpenModal1(true)}
          >
            <PlusOutlined />
          </button>
        </div>
        <Modal
          title="Add task"
          centered
          open={openModal1}
          onOk={createTask}
          onCancel={() => setOpenModal1(false)}
        >
          <Input.TextArea
            rows={3}
            placeholder="task name here"
            value={taskName}
            onChange={(e: any) => setTaskName(e.target.value)}
          />
        </Modal>
        <Modal
          title="Sure to delete?"
          centered
          width={300}
          open={deleteModal}
          onOk={handleDelete}
          onCancel={() => setDeleteModal(false)}
        />
        <Modal
          title="Edit task"
          centered
          open={editable}
          onOk={handleEdit}
          onCancel={() => setEditable(false)}
        >
          <Input.TextArea
            rows={3}
            placeholder="task name here"
            value={taskName}
            onChange={(e: any) => setTaskName(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default TastListDetails;
