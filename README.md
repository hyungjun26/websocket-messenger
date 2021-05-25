<h1 align="center"> WEBSOCKET-MESSENGER </h1> <br>

## 목차
- [메신저를 만들게 된 이유?](#메신저를-만들게-된-이유)

- [웹소켓?](#웹소켓)

- [구현 상황](#구현-상황)

- [실행](#실행)

- [실행화면](#실행화면)

- [향후 프로젝트 계획](#향후-프로젝트-계획)

## 메신저를 만들게 된 이유?
지금까지 해왔던 프로젝트의 대부분은 RESTful API를 만든 다음 클라이언트와 서버가 HTTP 통신을 통해 정보를 공유하는 프로젝트였다. 
그안에서 실시간 서비스를 구현해보려고 해봤지만, 기본적으로 HTTP는 클라이언트가 서버에 요청해야만 정보를 얻을 수 있는 단방향 통신이기 때문에 생각처럼 구현되지 않았던 경험이 있다. 
그래서 이번 기회에 양방향 통신을 하는 서비스를 만들어보고 싶었고 선택한 것이 1:1로 실시간 대화가 가능한 메신저이다.

## 웹소켓?
웹소켓은 TCP 연결을 통해 서버와 클라이언트가 양방향 통신을 가능하게 해주는 통신 프로토콜이다. 웹 클라이언트의 요청 시에만 서버의 정보를 받을 수 있는 HTTP 방식과는 다르게 클라이언트의 요청이 없어도 이벤트가 발생하면 서버가 내용을 전달할 수 있도록 해준다.

## 구현 상황
- 실시간 대화가 가능한 메신저를 구현.
- React로 웹 메신저 클라이언트를 구성하고 클라이언트에서 메시지를 전송하면
- Springboot의 웹소켓을 통해 상대방에게 메시지를 전달.
- Redis를 통해 사용자와 대화내용 저장.

## 기술스택
* Java, Springboot, Websocket, Redis, React

## 실행

📣Demo version🚀 : http://spurdev.s3-website.ap-northeast-2.amazonaws.com/

1. repo clone
```
git clone https://github.com/hyungjun26/websocket-messenger.git
```
2. build
```
cd websocket-messenger/server
./gradlew build
```
3. jar 실행
```
cd build/libs
java -jar store-0.0.1-SNAPSHOT.jar
```
## 실행화면
* 등록 & 로그인

![등록로그인](https://user-images.githubusercontent.com/53934834/119176350-f522c980-baa5-11eb-8224-f8126a028d0f.gif)

* 대화상대 추가

![대화상대추가](https://user-images.githubusercontent.com/53934834/119177520-62832a00-baa7-11eb-8586-d206ffcdbc45.gif)

* 실시간 대화

![실시간대화](https://user-images.githubusercontent.com/53934834/119217566-099eaa80-bb16-11eb-8668-76f72f1eb316.gif)

## 향후 프로젝트 계획
기본적인 기능은 구현했지만, 아직 부족한 부분이 많다. 서비스 로직만 구현되어 있기 때문에 예외상황에 대한 처리와 코드의 정리가 필요하다. 그리고 현재 메신저 대화는 문자만 가능하지만, 이후 파일과 동영상 공유도 가능하도록 확장해보고 싶다. 지속해서 프로젝트에 관심을 가지면서 관리할 필요가 있을 것 같다.

-   할일
    -   [ ]  프로젝트 구조, 코드 정리
    -   [ ]  이미지, 문서파일 전송
    -   [ ]  동영상 파일 전송
    -   [ ]  단체 채팅방 개설 
