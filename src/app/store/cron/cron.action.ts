export namespace CronAction {
  export class ResetConfig {
    static readonly type = `重置配置`;
  }

  export class StartNotification {
    static readonly type = `启动定时提醒`;

    constructor(public data: any) {
    }
  }

  export class StopNotification {
    static readonly type = `关闭定时提醒`;

    constructor(public data: any) {
    }
  }

}
