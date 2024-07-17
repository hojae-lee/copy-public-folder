# copy-public-folder

특정 구조에서 public 을 복사하고 싶은 경우, 사용!

## 사용방법

해당 mjs 파일을 프로젝트 루트에 넣습니다.

아래 스크립트를 추가합니다.
```
{
  "scripts": {
    "copy-public": "node copyPublicFile.mjs"
  }
}
```

이제 필요한 스크립트에 && 붙여서 사용할 수 있습니다.

