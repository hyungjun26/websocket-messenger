<h1 align="center"> WEBSOCKET-MESSENGER </h1> <br>

## 목차
- [메신저를 만들게 된 이유?](#메신저를-만들게-된-이유)

- [웹소켓?](#웹소켓)

- [구현 상황](#구현-상황)

- [실행](#실행)

- [실행화면](#실행화면)

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
