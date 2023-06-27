import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";


function App() {
  let [title, setTitle] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState([false, false, false]);
  let [inputValue, setInputValue] = useState('');
  let [timer, setTimer] = useState(dayjs())
  timer.format();

  const Alert = (e) => {
    setInputValue(e.target.value);
  }

  const Submit = () => {
    if (inputValue.trim() === '') {
      alert('값이 비었습니다')
    } else {
      let copy = [...title];
      copy.unshift(inputValue);
      setTitle(copy);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(dayjs())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timer])

  return (
    <div className="App">
      <header className="header">
        <h4 >블로그 복습</h4>
      </header>

      {/* <button onClick={() => {
        let copyTitle = [...title];
        copyTitle[0] = '여자 코트 추천';
        setTitle(copyTitle);
        console.log(copyTitle)
      }}>
        수정 버튼
      </button> */}
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
              }}>{title[i]} <span onClick={(e) => {
                e.stopPropagation();
                let copyLike = [...like];
                copyLike[i] = copyLike[i] + 1;
                setLike(copyLike);
              }}> 👍🏻</span> {like[i]}
              </h4>
              {
                modal[i] === true ? <Modal setTitle={setTitle} title={title[i]} onClose={() => {
                  let copyModal = [...modal];
                  copyModal[i] = false;
                  setModal(copyModal)
                }} /> : null
              }
              <p>{timer.format("MM.DD HH:mm")} 발행</p>
              <button onClick={() => {
                let copy = [...title];
                copy.splice(i, 1);
                setTitle(copy)
              }}>삭제</button>
            </div>
          )
        })
      }
      <input value={inputValue} onChange={Alert} /><button onClick={Submit
      }>등록</button>

      {/* <div className="list">
        <h4>{title[2]}</h4>
        <p>발행 날짜</p>
      </div> */}

    </div >
  )
}

function Modal(props, i) {
  return (
    <>
      <div className='modal'>
        <h4>{props.title}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={() => {
          props.setTitle(
            // prevTitle => {
            //   let copyTitle = [...prevTitle];
            //   copyTitle[0] = '여자 코트 추천';
            //   return copyTitle
            // }
            ['여자코트 추천', '강남 우동맛집', '파이썬 독학']
          )
        }}>글 수정</button>
      </div>
      <div></div>
    </> // fragment 문법
  )
}
// props 전송은 부모 > 자식만 가능

export default App;
