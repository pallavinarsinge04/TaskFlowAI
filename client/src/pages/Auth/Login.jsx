const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await API.post(
      "/auth/login",
      form
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    alert("Login Successful");

    navigate("/dashboard");

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Login Failed"
    );

  }
};