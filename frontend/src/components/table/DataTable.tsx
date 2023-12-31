import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import eu from "@assets/eu.jpg";

const TABLE_ROWS = [
  {
    img: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    name: "Antonio de Souza",
    email: "antoniodsouza@gmail.com",
    job: "Administrador",
    online: true,
    date: "04/12/2023",
  },
  {
    img: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small_2x/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    name: "Francielli Andreghetto",
    email: "francielliandreghetto@gmail.com",
    job: "Administrador",
    online: false,
    date: "04/12/2023",
  },
];

const TABLE_ROW_CLASSES = (isLast: boolean) =>
  isLast
    ? "p-4"
    : "p-4 border-b border-blue-gray-50"; // Updated background color for table rows

export default function DataTable() {
  return (
    <div className="h-full w-full rounded-lg p-7 shadow-md bg-[#ffffffaa]">
      <div className="flex flex-col">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <h5>
              Membros
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
          </div>
        </div>
      </div>
      <div className="overflow-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 p-4">
                <p className="font-normal leading-none opacity-70">Nome</p>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <p className="font-normal leading-none opacity-70">Perfil</p>
              </th>
              <th className="border-y border-blue-gray-100 p-4">
                <p className="font-normal leading-none opacity-70">Data</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((user, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = TABLE_ROW_CLASSES(isLast);

              return (
                <tr key={user.name} className={classes}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar src={user.img} alt={user.name} size="sm" />
                      <div className="flex flex-col">
                        <p className="font-normal"> {user.name}</p>
                        <p className="font-normal opacity-70"> {user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <p className="font-normal"> {user.job}</p>
                    </div>
                  </td>
                  <td>
                    <p className="font-normal">{user.date}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
