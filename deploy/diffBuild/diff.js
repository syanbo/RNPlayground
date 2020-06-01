#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const {execSync} = require('child_process');

const resolve = (dir = '') => path.join(__dirname, '..', dir);
const project = resolve('../');

diff();

function diff() {
  try {
    const buildDir = `${project}RNDiffBundle`;
    const fileDir = `${project}CodePush`;

    execSync(`rm -rf ${buildDir}`);

    console.log(process.cwd(), process.argv[2]);
    const branchName = process.argv[2];

    if (!branchName) {
      console.log('输入分支参数');
      return;
    }

    console.log('开始clone源RNDiffBundle文件');
    execSync(
      `git clone --single-branch --depth=1 -b ${branchName} git@github.com:syanbo/RNDiffBundle.git`,
    );
    console.log('clone 完成');

    const hashJsonStr = fs.readFileSync(`${buildDir}/hash.json`);

    const hashMap = JSON.parse(hashJsonStr);

    fileFind(fileDir, hashMap);

    execSync(`rm -rf ${buildDir}`);
  } catch (e) {
    console.log(e, '错误');
    process.exit(1);
  }
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param hashMap
 * @param tmpFileName
 */
function fileFind(filePath, hashMap, tmpFileName = '') {
  const files = fs.readdirSync(filePath);
  files.forEach(fileName => {
    // 获取当前文件的绝对路径
    const subDir = `${filePath}/${fileName}`;
    const name = `${tmpFileName}/${fileName}`;

    if (fileName === '.DS_Store') {
      console.log('[删除文件] %s', fileName);
      fs.unlinkSync(subDir);
      return;
    }

    if (fileName === 'index.android.bundle' || fileName === 'main.jsbundle') {
      return;
    }

    // 根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(subDir);
    const isFile = stats.isFile(); // 是文件
    const isDir = stats.isDirectory(); // 是文件夹
    if (isFile) {
      const data = fs.readFileSync(subDir);
      const hash = crypto
        .createHash('md5')
        .update(data)
        .digest('hex');

      const hashObj = hashMap[name];
      if (hashObj) {
        if (hashObj.hash !== hash) {
          console.log('[修改文件]', hashObj.hash, name, hash);
        } else {
          console.log('[删除文件] %s', subDir);
          fs.unlinkSync(subDir);
        }
      } else {
        console.log('[新增文件] %s', name);
      }
    }
    if (isDir) {
      fileFind(subDir, hashMap, name); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件

      try {
        fs.rmdirSync(subDir); // 删除空文件夹
        console.log('[删除空文件夹] %s', subDir);
      } catch (e) {
        console.log('[不是空文件夹] %s', subDir);
      }
    }
  });
}
