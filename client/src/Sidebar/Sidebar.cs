.sidebar{
    width:260px;
    height:100vh;
    background:#0f172a;
    position:fixed;
    left:0;
    top:0;
    color:white;
    display:flex;
    flex-direction:column;
    box-shadow:5px 0 20px rgba(0,0,0,.15);
}

.logo{
    text-align:center;
    padding:25px 10px;
    border-bottom:1px solid rgba(255,255,255,.08);
}

.logo h2{
    color:#3b82f6;
    font-size:24px;
}

.sidebar nav{
    display:flex;
    flex-direction:column;
    margin-top:20px;
}

.sidebar nav a{
    text-decoration:none;
    color:#cbd5e1;
    padding:15px 25px;
    margin:4px 10px;
    border-radius:10px;
    transition:.3s;
    font-size:16px;
}

.sidebar nav a:hover{
    background:#2563eb;
    color:white;
}

.sidebar nav a.active{
    background:#2563eb;
    color:white;
}