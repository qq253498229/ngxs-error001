export namespace SystemAction {
  export class ResetConfig {
    static readonly type = `重置全局配置`;
  }

  export class UpdateSystemTime {
    static readonly type = `更新系统时间`;

    constructor(public data: any) {
    }
  }

  export class Copy {
    static readonly type = `复制文本`;

    constructor(public text: string) {
    }
  }

  export class SaveTempData {
    static readonly type = `保存临时数据`;

    constructor(public data: any) {
    }
  }
}
