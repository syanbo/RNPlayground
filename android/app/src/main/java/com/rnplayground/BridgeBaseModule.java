package com.rnplayground;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

/**
 * 基础桥接
 */
public class BridgeBaseModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "RNPBridgeBase";

    public BridgeBaseModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * 导出常量
     */
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("APP_ENV", BuildConfig.BUILD_TYPE);
        return constants;
    }
}
