import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor() {
  }

  create(title: string, message: string) {
    if (window.nw) {
      // nwjs客户端下通过node调用系统通知
      (global as any).globalBus.showNotification(title, message);
    } else {
      this.showNotification(title, {body: message});
    }
  }

  showNotification(title: string, options?: NotificationOptions): void {
    if ('Notification' in window) {
      // 检查浏览器是否支持 Notification API
      if (Notification.permission === 'granted') {
        // 如果权限已经被授予，创建并显示通知
        new Notification(title, options);
      } else if (Notification.permission !== 'denied') {
        // 如果权限没有被拒绝，请求权限
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, options);
          }
        });
      }
    }
  }
}
