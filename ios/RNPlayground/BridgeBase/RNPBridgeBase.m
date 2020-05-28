//
//  RNPBridgeBase.m
//  RNPlayground
//
//  Created by 邓博 on 2020/5/28.
//

#import "RNPBridgeBase.h"

@implementation RNPBridgeBase

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
    return @{
        @"APP_ENV": @(APP_ENV)
    };
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
