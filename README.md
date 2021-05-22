<h1 align="center"> WEBSOCKET-MESSENGER </h1> <br>

## 목차

- [설명](#설명)

- [실행](#실행)

- [실행화면](#실행화면)

## 설명
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
