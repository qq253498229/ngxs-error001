export namespace CronAction {
  export class ChangeId {
    static readonly type = `修改id`;

    constructor(public id: number) {
    }
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
