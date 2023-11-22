import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Navbar } from "../pages/Home";
import { deleteList, getLists, postList, putList } from "../utils/apiRequests";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";

const Dashboard = () => {
  const [listTitle, setListTitle] = useState("");
  const [lists, setLists] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLists = async () => {
      const res: any = await getLists();
      setLists(res.data);
    };

    getUserLists();
  }, []);

  const createList = async () => {
    try {
      const res = await postList(listTitle);
      const data = res.data;
      console.log(data);
      setLists([...lists, data]);
      setOpen(false);
      setListTitle('');
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteList(selectedItem.uuid);
      const newData = lists.filter((list: any) => list.uuid !== selectedItem.uuid);
      setLists(newData);
      setSelectedItem(null);
      setDeleteModal(false);
    } catch (err: any) {
      console.log("err");
    }
  };

  const handleEdit = async () => {
    try {
      if (selectedItem.uuid) {
        setSelectedItem((prevState: any) => {
          const a =  prevState;
          a.name = listTitle;
          return a;
        });
        await putList(selectedItem.name, selectedItem.uuid);
        const index = lists.findIndex((list: any) => list.uuid === selectedItem.uuid);
        setLists((prevState: any) => {
          const a = prevState;
          a[index].name = selectedItem.name;
          return a;
        })
        setEditable(false);
        setListTitle('');
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  const showDeleteModal = (item: any) => {
    if (item.uuid) {
      setSelectedItem(item);
    }
    setDeleteModal(true);
  };

  const showEditModal = (item: any) => {
    if (item.uuid) {
      setSelectedItem(item);
    }
    setEditable(true);
  };

  const handleListClick = (uuid: any, title: string) => {
    navigate(`/tasks/${uuid}`, {
      state: {
        id: uuid,
        title: title,
      },
    });
  };

  return (
    <div className="w-full h-screen bg-blue1">
      <Navbar className="flex justify-center">
        <div className="flex justify-between items-center w-full md:max-w-[70vw] lg:max-w-[50vw]">
          <div className="text-white text-3xl font-serif">
            Doingly <span>Lists</span>
          </div>
          <button
            className="text-white py-2 px-4 border border-blue4 rounded-md hover:bg-blue2 hover:border-blue2 duration-300"
            onClick={() => setOpen((o) => !o)}
          >
            Add List
          </button>
          <Modal
            title="Add List"
            centered
            width={400}
            open={open}
            onOk={createList}
            onCancel={() => setOpen(false)}
          >
            <Input
              placeholder="list name here"
              value={listTitle}
              onChange={(e: any) => setListTitle(e.target.value)}
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
            title="Edit list"
            centered
            width={400}
            open={editable}
            onOk={handleEdit}
            onCancel={() => setEditable(false)}
          >
            <Input
              placeholder="list name here"
              value={listTitle}
              onChange={(e: any) => setListTitle(e.target.value)}
            />
          </Modal>
        </div>
      </Navbar>
      {/* Main */}
      <div className="flex flex-wrap gap-6 mt-12 px-4 md:px-8 lg:px-12">
        {lists?.map((list: any, key: any) => (
          <div
            key={key}
            className="bg-blue2 pb-4 w-full md:w-[28vw] lg:w-[22vw] rounded-md flex flex-col items-center"
          >
            <div
              className="bg-blue3 py-4 rounded-t-xl w-full text-white capitalize flex justify-center items-center cursor-pointer hover:text-blue1 duration-300"
              onClick={() => handleListClick(list.uuid, list.name)}
            >
              <h1>{list.name}</h1>
            </div>
            <div className="flex w-full justify-around mt-3">
              <div
                className="bg-blue3 px-3 py-1 rounded-md cursor-pointer hover:bg-blue1 duration-300"
                onClick={() => showDeleteModal(list)}
              >
                <DeleteOutlined />
              </div>
              <div className="bg-blue3 px-3 py-1 rounded-md cursor-pointer hover:bg-blue1 duration-300" onClick={() => showEditModal(list)}>
                <EditOutlined />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
