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

    if (res.data.user.role === "Admin") {
      navigate("/admin");
    } else if (res.data.user.role === "Manager") {
      navigate("/manager");
    } else {
      navigate("/member");
    }

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Login Failed"
    );

  }
};