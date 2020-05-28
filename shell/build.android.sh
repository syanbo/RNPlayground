#!/bin/bash
set -o errexit
# 2019-12-17

#   ••••• 热更新脚本注意事项 ••••••
#   用途：脚本包含打 Bundle 包
#

Platform="Android"
GitCommitHash=$(git rev-parse --short HEAD)

echo -e "\n••••••••••••••••••••••• 欢迎使用 安卓打包 脚本 •••••••••••••••••••••••\n"

echo -e "\033[33m\033[01m 请再次确认打包将在 【 ${Platform} 】平台 请输入 yes 确认执行，按其他键取消：\033[0m \n"

read Y
if [ "$Y" != 'yes' ]; then
    echo '运行终止：取消打包操作。'
    exit
fi

echo "------------------------ 安装 node_modules 依赖  ------------------------"
yarn
echo "------------------------ 清除旧 RN Bundle 资源 ------------------------"

# 因为每次打的 RN 包的 Assets 是替换之前，所以对于废弃的图片可能依然存在其中；
# 所以每次打 RN 包之前进行清除。
PUSH_DIR="./CodePush"
if [ -d "$PUSH_DIR" ];then
  rm -rf $PUSH_DIR
fi
mkdir $PUSH_DIR
find $PUSH_DIR -name .DS_Store | xargs rm -rf

echo "------------------------ 生成新 Android RN Bundle 资源 ------------------------"
npx react-native bundle --reset-cache --entry-file index.js --bundle-output $PUSH_DIR/index.android.bundle --platform android --assets-dest $PUSH_DIR --dev false

echo "------------------------ 开始生成 CodePushHash 文件 ------------------------"
PUSH_PWD="$(pwd)/CodePush"
node ./node_modules/@lyg-react-native/code-push/scripts/generateBundledResourcesHash.js "$PUSH_PWD" "$PUSH_PWD/index.android.bundle" "$PUSH_PWD"

if [ "$?"x != "0"x ]; then
    git clean -df
    git checkout .
    exit
fi

echo -e "\n•••••••••••••••••••••••• Android 执行完毕 ••••••••••••••••••••••••\n"
