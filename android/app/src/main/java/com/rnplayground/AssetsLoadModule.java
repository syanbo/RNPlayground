package com.rnplayground;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

import java.io.File;
import java.io.FileFilter;

/**
 * 资源加载 BridgeModule
 */
public class AssetsLoadModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "RNPAssetsLoad";

    public AssetsLoadModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * 判断当前图片资源文件是否存在
     * 注解参数 isBlockingSynchronousMethod = true 表示是同步方法
     * @param filePath 文件绝对路径
     * @return
     */
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isFileExit(String filePath) {

        if(filePath == null || filePath == "") {
            Log.e("isFileExit:", "filePath路径错误");
            return false;
        }
        File imageFile = new File(filePath.replace("file://",""));
        return imageFile.exists();
    }

    /**
     * 搜索JSBundle文件所在目录下的所有drawable资源文件
     * @param jsBundleFilePath
     * @param callback 回传RN所有drawable资源文件路径
     */
    @ReactMethod
    public void searchDrawableFile(String jsBundleFilePath, Callback callback) {
        if(jsBundleFilePath == null || jsBundleFilePath == "") {
            Log.e("searchDrawableFile:", "jsBundleFilePath路径错误");
            return;
        }

        WritableArray params = Arguments.createArray();
        // jsbundle 文件
        File bundleFile = new File(jsBundleFilePath);
        // jsbundle 文件所在目录
        File bundleFileDir = bundleFile.getParentFile();
        // bundleFileDir 是文件目录
        if(bundleFileDir.isDirectory()) {

            // 定义文件过滤器，只获取是文件目录，并且目录名称以 drawable 开头
            FileFilter fileFilter = new FileFilter() {
                @Override
                public boolean accept(File pathname) {
                    return pathname != null
                            && pathname.getName().startsWith("drawable")
                            && pathname.isDirectory();
                }
            };
            // 过滤出 JSBundle 文件目录下的所有 drawable 文件夹
            File[] drawableDirs = bundleFileDir.listFiles(fileFilter);
            if(drawableDirs != null) {
                // 遍历drawableDirs，取出 drawable 目录文件夹
                for(File dir: drawableDirs) {
                    // 获取drawable文件夹的绝对路径
                    String drawablePath = dir.getAbsolutePath();

                    // 拿到 drawable 目录下的所有文件名称
                    String[] files = dir.list();
                    for(String file: files) {
                        // 从rn图片加载源码中的drawableFolderInBundle方法，我们知道文件以 file:/// 开头
                        // E.g. 'file:///sdcard/bundle/assets/AwesomeModule/icon@2x.png'
                        params.pushString("file://" + drawablePath + File.separator + file);
                    }
                }
                callback.invoke(params);
            }
        }
    }
}
