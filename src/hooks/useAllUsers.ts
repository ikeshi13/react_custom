import axios from "axios";
import { useState } from "react";
import { User } from "../types/api/user";
import { userProfile } from "../types/userProfile";

export const useAllUsers = () => {
//userProfile型のstate
const [userProfiles, setUserProfiles] = useState<Array<userProfile>>([]);
//loadingフラグ
const [loading, setLoading] = useState(false);
//errorフラグ
const [error, setError] = useState(false);

const getUsers = () => {
  //loadingフラグの初期値をture
  setLoading(true);
  //errorフラグの初期値をfalse
  setError(false);
  //axiosを使用して該当のパラメータからデータを取得
 axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users").then((res) => {
  //取得したデータをuser型に編集
  const data =res.data.map((user) => ({
    id:user.id,
    name:`${user.name}(${user.username})`,
    email:user.email,
    address:`${user.address.city}${user.address.suite}${user.address.street}`
  }));
  //setUserProdileに編集したdataを格納
  setUserProfiles(data);
  //エラーの場合
 }).catch(() => {
  //エラーフラグture
  setError(true);
  //最後の処理
 }).finally(() => {
  //loadingフラグをfalse
  setLoading(false);
 });
}

return{getUsers,userProfiles,loading,error};

}