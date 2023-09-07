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

  export class CreateCronDrawer {
    static readonly type = `打开创建任务抽屉组件`;
  }

  export class EditCronDrawer {
    static readonly type = `打开编辑任务抽屉组件`;

    constructor(public data: any) {
    }
  }

  export class CloseCronDrawer {
    static readonly type = `关闭任务抽屉组件`;
  }

  export class Save {
    static readonly type = `保存任务信息`;
  }

  export class Delete {
    static readonly type = `删除任务`;

    constructor(public data: any) {
    }
  }
}
