/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';
/*服务工作线程*/
// 已经发送数据给应用服务器 此时监听服务器返回数据的情况
var linkUrl = ''
self.addEventListener('push', function(event) {
  // console.log('[Service Worker] Push Received.');
  // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  // console.log('sw推送消息已经完成 推送回来的数据是',event.data.text())
  // console.log('检测数据类型',typeof(event.data.text()))
  var jsonData = JSON.parse(event.data.text())

  const title = jsonData.title;
  linkUrl = jsonData.url
  const options = {
    body: jsonData.message,
    icon: 'img/logo.png',
    badge: 'img/badge.png'
  };
//自定义推送内容 展示推送栏消息
  event.waitUntil(self.registration.showNotification(title, options));
  // self._hmt.push(['_trackEvent', '推送消息弹框', '消息', '', '展示推送弹框'])
  // 下面是简写
  // const notificationPromise = self.registration.showNotification(title, options);
  // event.waitUntil(notificationPromise);
});

// 点击推来的消息的某一条的监听
self.addEventListener('notificationclick', function(event) {
  // console.log('[Service Worker] Notification click Received.');
  // console.log('[Service Worker]点击其中一条推来的消息完成 关闭点过的通知 打开详情地址');
  event.notification.close();
  // 打开详情地址 
  linkUrl = linkUrl || 'https://plugin.csdn.net/' 
  event.waitUntil(
    clients.openWindow(linkUrl)
  );
  // event.waitUntil确保浏览器不会在显示新窗口前终止服务工作线程
});

var title = 'Get a message.';
var body = 'We have received a push message.';
var icon = '/images/icon-192x192.png';
var tag = 'simple-push-demo-notification-tag';

  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    tag: tag
  })

