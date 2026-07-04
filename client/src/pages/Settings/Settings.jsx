import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "./Settings.css";

function Settings() {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [profilePic,setProfilePic]=useState("https://i.pravatar.cc/150");
const [darkMode,setDarkMode]=useState(false);
const [emailNotif,setEmailNotif]=useState(true);
const [pushNotif,setPushNotif]=useState(true);
const [language,setLanguage]=useState("English");
const [newPassword,setNewPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

useEffect(()=>{(async()=>{
const {data:{user}}=await supabase.auth.getUser();
if(!user)return;
const {data}=await supabase.from("users").select("*").eq("id",user.id).single();
if(data){
setName(data.name||"");
setEmail(data.email||"");
if(data.profile_pic)setProfilePic(data.profile_pic);
}
})();},[]);

const handleProfileChange=async(e)=>{
const file=e.target.files[0];
if(!file)return;
const fileName=`${Date.now()}-${file.name}`;
const {error}=await supabase.storage.from("profile-images").upload(fileName,file);
if(error)return alert(error.message);
const {data}=supabase.storage.from("profile-images").getPublicUrl(fileName);
setProfilePic(data.publicUrl);
};

const saveProfile=async()=>{
const {data:{user}}=await supabase.auth.getUser();
const {error}=await supabase.from("users").update({name,email,profile_pic:profilePic}).eq("id",user.id);
if(error)return alert(error.message);
alert("Profile updated successfully");
};

const changePassword=async()=>{
if(newPassword!==confirmPassword)return alert("Passwords do not match");
const {error}=await supabase.auth.updateUser({password:newPassword});
if(error)return alert(error.message);
alert("Password updated");
};

return(<div className={`settings-page ${darkMode?"dark":""}`}>
<div className="settings-card"><h2>Profile</h2>
<img src={profilePic} alt="Profile" className="settings-profile-img"/>
<input type="file" accept="image/*" onChange={handleProfileChange}/>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
<button onClick={saveProfile}>Save Profile</button></div>
<div className="settings-card"><h2>Preferences</h2>
<label><input type="checkbox" checked={darkMode} onChange={()=>setDarkMode(!darkMode)}/>Dark Mode</label>
<label><input type="checkbox" checked={emailNotif} onChange={()=>setEmailNotif(!emailNotif)}/>Email Notifications</label>
<label><input type="checkbox" checked={pushNotif} onChange={()=>setPushNotif(!pushNotif)}/>Push Notifications</label>
<select value={language} onChange={e=>setLanguage(e.target.value)}><option>English</option><option>Hindi</option><option>Marathi</option></select>
</div>
<div className="settings-card"><h2>Security</h2>
<input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="New Password"/>
<input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
<button onClick={changePassword}>Update Password</button></div>
</div>);
}
export default Settings;