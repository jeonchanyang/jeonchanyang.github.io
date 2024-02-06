/*eslint-disable*/ //터미널에 warning 기능 비활성화
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [list, setList] = useState(['남자 코트추천', '강남 우동맛집', '파이썬독학']);
  let [time, setTime] = useState(['2023-04-11', '2022-06-11', '2021-10-11']);
  //let 뒤에 [ ] = destructuring 문법
  //state는 변동사항이 생기면 state쓰는 html도 자동으로 재렌더링해줍니다
  //자주변경될 것 같은 데이터들은 state에 저장했다가 html에 {데이터바인딩}하자.
  //spread operator [arr],{obj} 왼쪽에붙여서 사용.(독립적인 사본 deep copy)
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [tit, setTit] = useState(0);
  let [ipt, setIpt] = useState('');
  let nowDate = new Date(); //현재시간
  let year = String(nowDate.getFullYear()).padStart(2, "0");
  let month = String(nowDate.getMonth() + 1).padStart(2, "0");
  let date = String(nowDate.getDate()).padStart(2, "0");
  let str = year + '-' + month + '-' + date;

  return ( // JSX
    <div className="App">
      <header className="black-nav">
        <h1 className="fl">개발 blog</h1>
        <div className="fr">
          <button onClick={()=>{
              let copy = [...list];
              copy.sort();
              console.log(copy);
              setList(copy);
          }}>정렬</button>
        </div>
      </header>
      <section>
        <h2 className="sr-only">컨텐츠영역</h2>
        <ul>
          {list.map(function(e, i){
              return (
                <li className="list" key={i} onClick={()=>{
                  setModal(!modal);
                  // 조건이 필요함.
                  setTit(i);
                }}>
                  <h4>
                    {list[i]}
                    <span role="button" className="cr-point" onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      let copy = [...like];
                      copy[i] = copy[i] + 1;
                      setLike(copy);
                    }}>👍</span>{like[i]}
                  </h4>
                  <p>
                    {time[i].split('-')[0]}년&nbsp;
                    {time[i].split('-')[1]}월
                    {time[i].split('-')[2]}일 발행
                  </p>
                  <button className="btn" onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    //e.currentTarget.parentElement.remove();
                    let copy = [...list];
                    copy.splice(i, 1);
                    console.log(copy, i)
                    setList(copy);
                  }}>삭제</button>
                </li>
              )
            })
          }
        </ul>
        <form className="list-form">
          <fieldset>
            <legend>리스트 추가입력 폼</legend>
            <div className="push">
              <label htmlFor="ipt-1">입력</label>
              <input type="text" id="ipt-1" onChange={(e)=>{setIpt(e.target.value)}} />
              <button onClick={(e)=>{
                e.preventDefault();
                if(e.currentTarget.previousSibling.value != ''){
                  let copy = [...list];
                  let copyLike = [...like];
                  let copyTime = [...time];
                  copy.unshift(ipt);
                  copyLike.unshift(0);
                  copyTime.unshift(str);
                  setList(copy);
                  setLike(copyLike);
                  setTime(copyTime);
                  //console.log(e.currentTarget.previousElementSibling.value) //글내용
                }else{
                  alert('내용을 입력하세요.');
                }
              }}>글발행</button>
            </div>
          </fieldset>
        </form>
      </section>
      {modal == true ? <Modal tit={tit} list={list} color={'skyblue'} setList={setList}></Modal> : null}
    </div>
  );
}

//component
const Modal = (props) =>{
  return(
    <div className='modal' style={ {background : props.color} }>
      <h4>{ props.list[props.tit] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        let copy = [...props.list];
        copy = ['여자 코트추천', '강남 우동맛집', '파이썬독학'];
        props.setList(copy);
      }}>글수정</button>
    </div>
  )
}




export default App;
