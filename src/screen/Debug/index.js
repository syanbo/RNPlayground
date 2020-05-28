import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import CodePush from 'react-native-code-push';
import AssetsLoader from '~/utils/AssetsLoad';
import env from '~/constants/env';

const DebugScreen = () => {
  const [metaData, setMetaData] = useState({});
  const [checkData, setCheckData] = useState({status: -1});
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(-1);

  useEffect(() => {
    const getUpdateMetadata = async () => {
      const data = await CodePush.getUpdateMetadata();
      setMetaData(data);
    };

    const checkForUpdate = async () => {
      try {
        const data = await CodePush.checkForUpdate();
        if (data) {
          setCheckData({status: 1, ...data});
        } else {
          setCheckData({status: 0});
        }
        console.log(data);
      } catch (e) {
        setCheckData({status: 2});
      }
    };
    //
    // const listener = DeviceEventEmitter.addListener(
    //   CODE_PUSH_DOWNLOAD_PROGRESS,
    //   (progress = {}, status) => {
    //     if (progress) {
    //       const {totalBytes, receivedBytes} = progress || {};
    //       const per = (receivedBytes / totalBytes) * 100;
    //       setProgress(per.toFixed(0));
    //     }
    //     setStatus(status);
    //   },
    // );
    //
    getUpdateMetadata();
    checkForUpdate();
    //
    // return () => {
    //   console.log('销毁');
    //   listener?.remove?.();
    // };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text>
          当前资源路径:
          {AssetsLoader.getSourceCodeScriptURL()}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            CodePush.clearUpdates();
          }}>
          <Text style={{color: '#fff'}}>清除热更</Text>
        </TouchableOpacity>
      </View>
      <Text>{`当前App环境：${env.appEnv}`}</Text>
      {progress > 0 && <Text>{`下载进度：${progress}`}</Text>}
      {status !== -1 && <Text>{`当前状态：${status}`}</Text>}
      <MetaDataBox {...metaData} />
      <CheckUpDataBox {...checkData} />
    </ScrollView>
  );
};

export default DebugScreen;

const MetaDataBox = props => {
  const {
    downloadUrl,
    appVersion,
    isFirstRun,
    label,
    description,
    packageHash,
    packageSize,
  } = props || {};
  if (!appVersion) {
    return <Text>首次热更</Text>;
  }
  return (
    <View style={{marginTop: 10}}>
      <Text>--- 当前热更新数据 ---</Text>
      <Text>{`App版本：${appVersion}`}</Text>
      <Text>{`描述：${description}`}</Text>
      <Text>{`下载路径：${downloadUrl}`}</Text>
      <Text>{`热更版本：${label}`}</Text>
      <Text>{`更新安装后是否第一次运行：${isFirstRun}`}</Text>
      <Text style={{color: 'red'}}>
        {`包大小：${packageSize / 1024 / 1024}M`}
      </Text>
      <Text>{`hash：${packageHash}`}</Text>
    </View>
  );
};

const CheckUpDataBox = props => {
  const {
    appVersion,
    deploymentKey,
    description,
    downloadUrl,
    label,
    packageSize,
    packageHash,
    status,
  } = props || {};
  if (status === -1) {
    return <Text>检查更新数据中...</Text>;
  }
  if (status === 0) {
    return <Text>已经是最新了 没有热更</Text>;
  }
  if (status === 2) {
    return <Text>检查热更新异常</Text>;
  }
  return (
    <View style={{marginTop: 10}}>
      <Text>--- 检查更新数据 ---</Text>
      <Text>{`App版本：${appVersion}`}</Text>
      <Text>{`code key：${deploymentKey}`}</Text>
      <Text>{`描述：${description}`}</Text>
      <Text>{`下载路径：${downloadUrl}`}</Text>
      <Text>{`热更版本：${label}`}</Text>
      <Text style={{color: 'red'}}>
        {`包大小：${packageSize / 1024 / 1024}M`}
      </Text>
      <Text>{`hash：${packageHash}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    paddingBottom: 16,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 6,
  },
});
