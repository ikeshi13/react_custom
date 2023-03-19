import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserCard } from './components/userCard';
import axios from "axios";
import { User } from './types/api/user';
import { userProfile } from './types/userProfile';
import userEvent from '@testing-library/user-event';

//テストデータ
const user = {
id :1,
name:"ゲスト1",
email:"12345@icloud.com",
address:"東京都立川"
};

function App() {
//userProfile型のstate
const [userProfiles, setUserProfiles] = useState<Array<userProfile>>([]);
//loadingフラグ
const [loading, setLoading] = useState(false);
//errorフラグ
const [error, setError] = useState(false);

//データ情報取得ボタン
const onClickFetchUser = () =>{
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

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      {error? (
        //エラーフラグがtureの場合
        <p style={{color:"red"}}>データの取得に失敗しました。</p>
      ) :loading?(
        //loadingフラグがtureの場合
        <p>Loading...</p>
      ) : (
        //正常にデータが取得できた場合、キー値をidとし、userに情報をセットする
        <>
      {userProfiles.map((user) => (
      <UserCard key= {user.id} user={user}/>
      ))}
        </>
      )}
    </div>
  );
}

export default App;
