// Node.js 기본 promises API를 사용하여 파일 시스템 작업을 비동기로 수행합니다.
import { promises as fsPromises } from 'fs';
import path from 'path';

const { copyFile, mkdir, readdir } = fsPromises;

// 실제 애플리케이션의 public 폴더 경로
const sourceDir = path.resolve('packages/app/public');
// 복사해서 넣고자 하는 타겟의 public 폴더 경로
const targetDir = path.resolve('packages/test/public');

// 개별 파일을 복사하는 비동기 함수
const copyFileAsync = asnyc (source, target) => {
  await copyFile(source, target);
}

// 폴더를 재귀적으로 복사하는 비동기 함수
const copyFolderRecursiveAsync = async (source, target) => {
  // 대상 폴더를 생성합니다.
  await mkdir(target, { recursive: true });
  // 소스 폴더의 모든 항목을 읽습니다.
  const entries = await readdir(source, { withFileTypes: true });

  for (let entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      // 항목이 폴더일 경우 재귀적으로 복사합니다.
      await copyFolderRecursiveAsync(sourcePath, targetPath);
    } else {
      // 항목이 파일일 경우 복사합니다.
      await copyFileAsync(sourcePath, targetPath);
    }
  }
}

// public 폴더를 복사하는 메인 함수
const copyPublicFolder = async () => {
  try {
    await copyFolderRecursiveAsync(sourceDir, targetDir);
    console.log('Public folder copied successfully.');
  } catch (err) {
    console.error('Error copying public folder:', err);
  }
}

// 메인 함수를 실행합니다.
copyPublicFolder();
