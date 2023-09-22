import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";

interface Data {
  id: number;
  description: string;
  checked: boolean;
}

interface Prop {
  data: Data[];
  checked: any;
  deleteData: any;
}

function ListComp({ data, checked, deleteData }: Prop) {
  return (
    <table className="w-[30%] text-sm ">
      <tbody>
        {data.map((val: any, i: number) => (
          <tr className="text-2xl " key={i}>
            <td
              className="w-2 px-6 py-2 text-right "
              onClick={() => checked(val.id)}
            >
              {!val.checked ? (
                <CheckBoxOutlineBlankRoundedIcon />
              ) : (
                <CheckBoxRoundedIcon />
              )}
            </td>
            <td className="px-6 py-2 text-left" onClick={() => checked(val.id)}>
              {val.description}{" "}
            </td>
            <td
              onClick={() => deleteData(val.id)}
              className="px-6 py-2 text-left pointer"
            >
              <DeleteIcon />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [data, setData] = useState([
    { id: -1, description: "LOADING . . ", checked: true },
  ]);
  const [input, setInput] = useState("");

  const checked = (id: any) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const deleteData = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newData = { description: input, checked: false };
    setData([...data, newData]);
    setInput("");
  };

  return (
    <main className="flex flex-col items-center w-full h-screen py-20 bg-white">
      <h1 className="mb-10 font-bold text-7xl ">TO DO LIST</h1>
      <ListComp deleteData={deleteData} data={data} checked={checked} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder=" + Add Task . . ."
          className="  text-gray-900 text-2xl outline-none block w-[30vw] mt-8 p-2.5 "
          onChange={(e: any) => {
            setInput(e.target.value);
          }}
          value={input}
        />
      </form>
    </main>
  );
}

export default App;
