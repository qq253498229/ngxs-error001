/**
 * 生成UUID
 */
export function uuid() {
  let temp_url = URL.createObjectURL(new Blob());
  let uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
}

/**
 * 从数组中间随机返回一个元素
 *
 * @param items 数组
 */
export function randomItem(items: any[]) {
  if (!items || items.length === 0) return null;
  if (items.length === 1) {
    return items[0];
  } else {
    return items[randomNumber(0, items.length - 1)];
  }
}

/**
 * 从两个数字范围中间随机获取一个数字
 *
 * @param min 范围的开始
 * @param max 范围的结束
 */
export function randomNumber(min: number, max: number) {
  min = Number(min);
  max = Number(max);
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

/**
 * 对数组进行排序，主要针对不可变数组
 *
 * @param list 数组
 * @param compareFn 排序逻辑
 */
export function sortImmutableList<T>(list: any[], compareFn?: (a: T, b: T) => number) {
  return [...list].sort(compareFn);
}

/**
 * 延迟执行函数
 * @param time 延迟事件，单位毫秒
 * @param fn 函数
 */
export function delay(time: number, fn: Function) {
  setTimeout(() => fn(), time);
}
