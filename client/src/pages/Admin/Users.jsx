import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            👥 Users Management
          </h1>

          {loading ? (
            <div className="text-center py-10">
              Loading Users...
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No Users Found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-blue-600 text-white">

                    <th className="p-3 text-left">
                      Name
                    </th>

                    <th className="p-3 text-left">
                      Email
                    </th>

                    <th className="p-3 text-left">
                      Role
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-100"
                    >

                      <td className="p-3">
                        {user.name}
                      </td>

                      <td className="p-3">
                        {user.email}
                      </td>

                      <td className="p-3">
                        {user.role || "User"}
                      </td>

                      <td className="p-3">

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                          Active

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Users;