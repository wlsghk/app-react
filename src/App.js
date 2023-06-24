import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [title, setTitle] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState([false, false, false]);

  return (
    <div className="App">
      <header className="header">
        <h4 >블로그 복습</h4>
      </header>

      <button onClick={() => {
        let copyTitle = [...title];
        copyTitle[0] = '여자 코트 추천';
        setTitle(copyTitle);
      }}>
        수정 버튼
      </button>
      <button onClick={() => {
        let copyTitle = [...title];
        copyTitle.sort();
        setTitle(copyTitle);
      }}>
        가나다 순 정렬
      </button>

      {/* <div className="list">
        <h4 onClick={() => {
          setModal(!modal)
        }}>
          {title[0]}
          <span onClick={() => {
            setLike(like + 1);
          }}> 👍🏻</span> {like}
        </h4>
        {
          modal === true ? <Modal /> : null
        }
        <p>발행 날짜</p>
      </div> */}

      {
        title.map(function (item, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => {
                let copyModal = [...modal];
                copyModal[i] = !copyModal[i];
                setModal(copyModal);
              }}>{title[i]} <span onClick={() => {
                let copyLike = [...like];
                copyLike[i] = copyLike[i] + 1;
                setLike(copyLike);
              }}> 👍🏻</span> {like[i]}
              </h4>
              {
                modal[i] === true ? <Modal onClose={() => {
                  let copyModal = [...modal];
                  copyModal[i] = false;
                  setModal(copyModal)
                }} /> : null
              }
              <p>발행 날짜</p>
            </div>
          )
        })
      }

      {/* <div className="list">
        <h4>{title[2]}</h4>
        <p>발행 날짜</p>
      </div> */}

    </div >
  )
}

function Modal() {
  return (
    <>
      <div className='modal'>
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
      <div></div>
    </> // fragment 문법
  )
}

export default App;
