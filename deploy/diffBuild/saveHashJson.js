#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const {execSync} = require('child_process');

const resolve = (dir = '') => path.join(__dirname, '..', dir);
const project = resolve('../');

let hashMap = {};

saveHashJson();

function saveHashJson() {
  try {
    const bundlePath = `${process.argv[2]}/`;
    const appBranchName = process.argv[3];
    const envLower = process.argv[4];
    const platform = process.argv[5];

    console.log(
      `参数 bundle路径：${bundlePath}, 分支名称：${appBranchName}, APP环境：${envLower}, 平台：${platform}`,
    );
    if (!bundlePath || !appBranchName || !envLower || !platform) {
      console.log('请检查参数');
      process.exit(1);
      return;
    }

    const fileDir = `${project}RNDiffBundle/`;
    if (fs.existsSync(fileDir)) {
      execSync(`rm -rf ${fileDir}`);
    }

    console.log('开始clone原始rnbuild');
    execSync('git clone --depth=1 git@github.com:syanbo/RNDiffBundle.git');
    console.log('clone 完成');

    const branchName = `${platform}_${envLower}_${appBranchName}`;

    try {
      console.log('删除远程分支 %s', branchName);
      // 删除远程分支
      execSync(`cd ${fileDir} && git push origin --delete ${branchName}`, {
        cwd: fileDir,
      });
    } catch (e) {}

    console.log('创建本地分支 %s', branchName);
    execSync(`git checkout -b ${branchName}`, {
      cwd: fileDir,
    });

    console.log('拷贝文件 %s 到 %s', bundlePath, fileDir);
    execSync(`cp -r ${bundlePath} ${fileDir}`);

    handleHashJson(bundlePath, fileDir);

    execSync('git add .', {
      cwd: fileDir,
    });

    execSync(`git commit -m "${branchName}分支build包"`, {
      cwd: fileDir,
    });

    console.log('push分支 %s 到远程', branchName);
    execSync(`git push origin ${branchName}`, {
      cwd: fileDir,
    });

    console.log('删除 %s 文件', fileDir);
    execSync(`rm -rf ${fileDir}`);
  } catch (e) {
    console.log(e, '错误');
    process.exit(1);
  }
}

/**
 * 生成hash json文件
 * @param bundlePath
 * @param fileDir
 */
function handleHashJson(bundlePath, fileDir) {
  fileFind(bundlePath);
  fs.writeFileSync(`${fileDir}/hash.json`, JSON.stringify(hashMap));
  hashMap = {};
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param tmpFileName
 */
function fileFind(filePath, tmpFileName = '') {
  const files = fs.readdirSync(filePath);
  files.forEach(fileName => {
    if (fileName === '.DS_Store') {
      return;
    }
    // 获取当前文件的绝对路径
    const subDir = `${filePath}/${fileName}`;
    const name = `${tmpFileName}/${fileName}`;
    // 根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(subDir);
    const isFile = stats.isFile(); // 是文件
    const isDir = stats.isDirectory(); // 是文件夹
    if (isFile) {
      const data = fs.readFileSync(subDir);
      // 生成文件hash
      const hash = crypto
        .createHash('md5')
        .update(data)
        .digest('hex');
      // 使用文件name作为key 存储文件hash json
      hashMap[name] = {
        hash,
      };
      console.log(hash, name);
    }
    if (isDir) {
      fileFind(subDir, name); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
}
