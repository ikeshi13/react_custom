import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UserCard } from './components/userCard';
import { useAllUsers } from './hooks/useAllUsers';
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
  const {getUsers,userProfiles,loading,error} = useAllUsers();
//データ情報取得ボタン
const onClickFetchUser = () => getUsers();

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
