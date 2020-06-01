#!/bin/bash

DateName="$(date +%Y年%m月%d日%H:%M:%S)"
GitCommitHash=$(git rev-parse --short HEAD)
AppId="1003"
BranchName=$(git symbolic-ref --short -q HEAD)
CommitMessage=$(git log --pretty=format:[%cn]%s ${GitCommitHash} -1)

# 1=$Platform 2=$VERSION 3=$DESC 4=$manda 5=$ENVUpper 6=$diffBranchName 7=$RNBranchName
function startPush(){
  updateWay="静默更新"

  if [ $4 == "true" ]; then
      updateWay="强制更新"
  fi

  echo "参数 平台:【 $1 】版本:【 $2 】描述:【 $3 】更新方式:【 $4-${updateWay}】环境:【 $5 】diff分支:【 $6 】当前分支: 【 ${BranchName} 】githash: 【 ${GitCommitHash} 】"

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

  echo "------------------------ 开始热更 $1 ------------------------"

  echo "------------------------ 生成新 $1 RN Bundle 资源 ------------------------"
  if [ $1 == "Android" ]; then
    npx react-native bundle --reset-cache --entry-file index.js --bundle-output $PUSH_DIR/index.android.bundle --platform android --assets-dest $PUSH_DIR --dev false
  else
    npx react-native bundle --reset-cache --entry-file index.js --bundle-output $PUSH_DIR/main.jsbundle --platform ios --assets-dest $PUSH_DIR --dev false;
  fi

  if [ "$?"x != "0"x ]; then
    echo "打包 RN Bundle 资源失败" "请处理错误后重试"
    exit
  fi

  echo "------------------------ 开始$1差分diff热更包 diff源分支名称：$6------------------------"
  # 这里的第一个平台参数为小写
  node ./deploy/diffBuild/diff.js "${6}"

  if [ "$?"x != "0"x ]; then
    echo "差分diff 失败" "请处理错误后重试"
    exit
  fi

  echo "------------------------ 开始上传 ${1} RN 热更新数据 ------------------------"

  CodePushName="RNPiOS"

  if [ $1 == "Android" ]; then
    CodePushName="RNPAndroid"
  fi

  npx code-push release $CodePushName $PUSH_DIR "$2" --d "$5" --des "$3\n** ${DateName} **" --m "$4";

  if [ "$?" == "0" ]; then # 取 code-push 命令执行结果。
     echo "\n•••••••••••••••••••••••• 热更成功 ••••••••••••••••••••••••\n"
  else
     echo "\n•••••••••••••••••••••••• 热更失败 ••••••••••••••••••••••••\n"
     exit
  fi

  echo "\n•••••••••••••••••••••••• $1 执行完毕 ••••••••••••••••••••••••\n"
}

# 处理环境变量
function handleENVUpper() {
    case $1 in
      1) ENVUpper='Qa'
      ;;
      2) ENVUpper='Staging'
      ;;
      3) ENVUpper='Production'
      ;;
      *) echo '操作中断：非法选择项。【来源】'
         exit
      ;;
    esac
}

#Platform=$(echo $1 | tr '[A-Z]' '[a-z]')
DESC="$3"
DiffBranchName="$6"
RNBranchName="$7"
if [ -z "$3" ]; then
  DESC=${CommitMessage}
fi

if [ -z "$6" ]; then
  DiffBranchName=${BranchName}
fi

if [ -z "$7" ]; then
  RNBranchName=${BranchName}
fi

echo "------------------------  [$1] [$2] [$3] [$4] [$5] [$6] [$7]  ------------------------ "
# 1=$Platform 2=$VERSION 3=$DESC 4=$manda 5=$ENVNum 6=$DiffBranchName 7=$RNBranchName
if [ "$1" == "Android" ]; then
  echo "\n------------------------ 开始执行【Android】热更 ------------------------"
  handleENVUpper $5
  startPush "$1" "$2" "$DESC" "$4" "${ENVUpper}" "android_${ENVUpper}_${DiffBranchName}" "${RNBranchName}"
elif [ "$1" == "iOS" ]; then
  echo "\n------------------------ 开始执行【iOS】热更 ------------------------"
  handleENVUpper $5
  startPush "$1" "$2" "$DESC" "$4" "${ENVUpper}" "ios_${ENVUpper}_${DiffBranchName}" "${RNBranchName}"
else
  echo "\n------------------------ 开始执行【双端】热更 ------------------------"
  handleENVUpper $5
  startPush "Android" "$2" "$DESC" "$4" "${ENVUpper}" "android_${ENVUpper}_${DiffBranchName}" "${RNBranchName}"
  handleENVUpper $5
  startPush "iOS" "$2" "$DESC" "$4" "${ENVUpper}" "ios_${ENVUpper}_${DiffBranchName}" "${RNBranchName}"
fi
