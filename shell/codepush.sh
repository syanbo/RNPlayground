#!/bin/bash
set -o errexit
#   ••••• 热更新脚本注意事项 ••••••
#   用途：CodePush热更
#   sh ./shell/codepush.sh iOS 第一个参数代表执行哪个平台 不输入默认 双端
#   feature分支发热更需要注意
#   第一个参数当前develop分支名称 develop_draw_somthing
#   双端   sh ./shell/codepush.sh develop_draw_somthing
#   单端  sh ./shell/codepush.sh iOS develop_draw_somthing
#   会进行diff 需要依赖git项目RNDiffBundle
#   原生打包时执行 ./deploy/diffBuild/saveHashJson.js 上传当前版本的原始bundle 和 hash.json
#   diff分支命名为 ios_test_develop_draw_somthing ios=平台 test=环境 develop_draw_somthing=当前rn分支名称

echo "••••••••••••••••••••••• 欢迎使用 CodePush 热更 脚本 •••••••••••••••••••••••\n"

# -------------------------------------- 开始 ----------------------------------------------
GitCommitHash=$(git rev-parse --short HEAD)
CommitMessage=$(git log --pretty=format:[%cn]%s${GitCommitHash} -1)

echo '请输入要针对热更新的版本号，如：[2.9.6, <=2.9.5, <2.9.5]'
read VERSION
if [ -z "$VERSION" ]; then
    echo '执行中断： 请输入热更新的版本号。'
    exit
fi

echo "\n热更新将在输入的版本：${VERSION} 执行，请输入更新描述：（默认最后一个commit message）"
read DESC
if [ -z "$DESC" ]; then
  DESC=${CommitMessage}
fi

echo "\n请选择发布热更新的目标环境： "
echo "1. Qa"
echo "2. Staging"
echo "3. Production"

read ENVNum

echo "\n是否要强制更新？输入 y 使用强制更新，否则使用静默更新，按回车键跳过："
read MANDATORY

manda="false"
if [ "$MANDATORY" == 'y' ]; then
    manda="true"
else
    manda="false"
fi

# diff分支名称
diffBranchName="$2"

echo -e "\033[33m\033[01m 请再次确认热更新将在 【 ${VERSION} 】版本，更新描述: 【 ${DESC}】【 $ENVNum 】环境生效，使用 【 $manda 】，请输入 yes 确认执行，按其他键取消：\033[0m \n"

read Y
if [ "$Y" != 'yes' ]; then
    echo '运行终止：取消热更新操作。'
    exit
fi

if [ "$1" == "Android" ]; then
  sh ./shell/jenkins.codepush.sh "Android" $VERSION "$DESC" $manda $ENVNum $diffBranchName
elif [ "$1" == "iOS" ]; then
  sh ./shell/jenkins.codepush.sh "iOS" $VERSION "$DESC" $manda $ENVNum $diffBranchName
else
  diffBranchName=$1
  sh ./shell/jenkins.codepush.sh "All" $VERSION "$DESC" $manda $ENVNum $diffBranchName
fi


