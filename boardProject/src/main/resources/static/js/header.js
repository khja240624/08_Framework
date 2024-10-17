/*  ***** SSE(Server-Sent Events) ***** 

서버(요청) -> 클라이언트 (응답)

- 서버가 클라이언트에게 실시간으로 
 데이터를 전송할 수 있는 기술

- HTTP 프로토콜 기반으로 동작

- 단방향 통신 (ex : 무전기)

 1) 클라이언트가 서버에 연결 요청
    -> 클라이언트가 서버로 부터 데이터 받기 위한 
       대기상태에 돌입
       (EventSource 객체 이용)

 2) 서버가 연결된 클라이언트에게 데이터를 전달
    (서버 -> 클라이언트 데이터 전달하라는
     요청을 또 AJAX를 이용해 비동기 요청)
*/

/** SSE 연결하는 함수 
 * -> 연결을 요청한 클라이언트가 
 *    서버로부터 데이터가 전달될 때 까지 대기 상태가됨
 *    (비동기)
*/
const connectSse = () => {

  /* 로그인이 되어있지 않은 경우 함수 종료 */
  if(notificationLoginCheck === false) return;

  console.log("connectSse() 호출")

  // 서버의 "/sse/connect" 주소로 연결 요청
  const eventSource = new EventSource("/sse/connect");

  // -------------------------------------------------------

  /* 서버로 부터 메시지가 왔을 경우(전달 받은 경우) */
  eventSource.addEventListener("message", e => {
    console.log(e.data); // e.data == 전달 받은 메시지 
                         // -> Spring HttpMessageConverter가
                         //    JSON으로 변환해서 응답해줌

    const obj = JSON.parse(e.data);
    console.log(obj);
  })
}


/** 알림 메시지 전송 함수
- 알림을 받을 특정 클라이언트의 id 필요
  (memberNo 또는 memberNo를 알아낼 수 있는 값)

[동작 원리] 
1) AJAX를 이용해 SseController에 요청

2) 연결된 클라이언트 대기 명단(emmiters)에서
   클라이언트 id가 일치하는 회원을 찾아
   메시지 전달하는 send() 메서드를 수행

3) 서버로부터 메시지를 전달 받은 클라이언트의
   eventSource.addEventListener()가 수행됨
*/
const sendNotification = (type, url, pkNo, content) => {

  // type : 댓글, 답글, 게시글 좋아요 등을 구분하는 값
  // url  : 알림 클릭 시 이동할 페이지 주소
  // pkNo : 알림 받는 회원 번호 또는 
  //        회원 번호를 찾을 수 있는 pk값
  // content : 알림 내용 


  /* 로그인이 되어있지 않은 경우 함수 종료 */
  if(notificationLoginCheck === false) return;

  /* 서버로 제출할 데이터를 JS 객체 형태로 저장 */
  const notification = {
    "notificationType"    : type,
    "notificationUrl"     : url,
    "pkNo"                : pkNo,
    "notificationContent" : content
  }

  fetch("/sse/send", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(notification)
  })
  .then(response => {
    if(!response.ok) { // 비동기 통신 실패
      throw new Error("알림 전송 실패");
    }
    console.log("알림 전송 성공");
  })
  .catch(err => console.error(err));

}