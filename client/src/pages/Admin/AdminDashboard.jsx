const AdminDashboard=()=>{

return(

<div className="p-8">

<h1 className="text-4xl font-bold">

👑 Admin Dashboard

</h1>

<div className="grid grid-cols-4 gap-5 mt-8">

<div className="bg-white shadow rounded-xl p-6">

<h2>Total Users</h2>

<h1 className="text-4xl font-bold">

124

</h1>

</div>

<div className="bg-white shadow rounded-xl p-6">

<h2>Projects</h2>

<h1 className="text-4xl font-bold">

38

</h1>

</div>

<div className="bg-white shadow rounded-xl p-6">

<h2>Tasks</h2>

<h1 className="text-4xl font-bold">

852

</h1>

</div>

<div className="bg-white shadow rounded-xl p-6">

<h2>Online</h2>

<h1 className="text-4xl font-bold">

15

</h1>

</div>

</div>

</div>

);

};

export default AdminDashboard;