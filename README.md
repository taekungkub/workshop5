# workshop5
npm install -g ionic@3.9.2

npm Angularfire2 

npm i rxjs@^6.0 rxjs-compat

ionic cordova resources --splash

ionic cordova resources --icon


ionic cordova build android

-----------------------------------------------------------
JAVA_HOME
C:\Program Files\Java\jdk1.8.0_211

ANDROID_HOME
C:\Users\tokim\AppData\Local\Android\Sdk

PATH
C:\Users\tokim\AppData\Local\Android\Sdk\tools


C:\Users\tokim\AppData\Local\Android\Sdk\platform-tools


ต้องใช้ ndk เวอร์ชั่น 17 ในการ build

-------------------------------------------------------------

How to release

ionic cordova build android --release

keytool -genkey -v -keystore yitho.keystore -alias yitho -keyalg RSA -keysize 2048 -validity 10000

// copy app-release-unsigned.apk > place to workshop5 folder
 
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore yitho.keystore app-release-unsigned.apk yitho

// The zipalign tool can be found in  /path/to/Android/sdk/build-tools/VERSION/

C:\Users\tokim\AppData\Local\Android\Sdk\build-tools\29.0.0

zipalign -v 4 D:\workshop5\app-release-unsigned.apk D:\workshop5\yitho.apk

------------------------------------------------------------------



[![54434788-641776196270940-7744427239915126784-n.png](https://i.postimg.cc/4yxq1rnV/54434788-641776196270940-7744427239915126784-n.png)](https://postimg.cc/34zt8fXx)

[![54517343-340176183164146-2858733079780917248-n.png](https://i.postimg.cc/hhF8GmFv/54517343-340176183164146-2858733079780917248-n.png)](https://postimg.cc/tn5nSY4G)
[![55604023-805383246475934-8944405814966222848-n.png](https://i.postimg.cc/28B2fkp3/55604023-805383246475934-8944405814966222848-n.png)](https://postimg.cc/1fspGZ3Z)
